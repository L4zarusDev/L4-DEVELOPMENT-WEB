import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { connectDB } from '@/lib/mongodb';
import { NotificationSub } from '@/models/NotificationSub';

webpush.setVapidDetails(
  'mailto:admin@l4zarus.dev',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  await connectDB();
  const { title, message, url } = await req.json();

  const subs = await NotificationSub.find({});
  const payload = JSON.stringify({ title, message, url });

  const results = await Promise.allSettled(
    subs.map((sub) => webpush.sendNotification(sub, payload))
  );

  return NextResponse.json({
    success: true,
    sent: results.filter((r) => r.status === 'fulfilled').length,
    failed: results.filter((r) => r.status === 'rejected').length,
  });
}
