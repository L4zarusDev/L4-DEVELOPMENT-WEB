import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PushSubscription from '@/models/PushSubscription';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) {
      return NextResponse.json({ success: false, message: 'Suscripción inválida' }, { status: 400 });
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint: body.endpoint },
      {
        endpoint: body.endpoint,
        expirationTime: body.expirationTime ?? null,
        keys: body.keys,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Error guardando suscripción:', e);
    return NextResponse.json({ success: false, message: e?.message || 'Error' }, { status: 500 });
  }
}
