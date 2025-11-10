import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PushSubscription from '@/models/PushSubscription';
import webpush from 'web-push';

export const dynamic = 'force-dynamic';

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';

// Configurar webpush una sola vez
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC!, VAPID_PRIVATE!);

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, body, url } = await req.json();

    const payload = JSON.stringify({
      title: title || 'Notificación',
      body: body || 'Tienes un nuevo aviso',
      url: url || '/',
      icon: '/L4.png', // asegúrate de que exista en /public
      badge: '/L4.png',
    });

    const subs = await PushSubscription.find({});
    let sent = 0;
    let removed = 0;

    // Enviar en paralelo con manejo de errores y limpieza de endpoints inválidos
    await Promise.all(
      subs.map(async (s) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: s.endpoint,
              expirationTime: s.expirationTime,
              keys: s.keys,
            } as any,
            payload
          );
          sent++;
        } catch (err: any) {
          // si el endpoint ya no es válido -> eliminar
          const status = err?.statusCode || err?.status;
          if (status === 404 || status === 410) {
            await PushSubscription.deleteOne({ endpoint: s.endpoint });
            removed++;
          } else {
            // loguear otros errores
            console.error('Error enviando push:', status, err?.body || err?.message);
          }
        }
      })
    );

    return NextResponse.json({ success: true, sent, removed });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || 'Error' }, { status: 500 });
  }
}
