import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Settings from '@/models/Settings'; // 👈 asegúrate de que sea export default

export const dynamic = 'force-dynamic';

// 🟢 GET → obtener configuración actual
export async function GET() {
  await connectDB();
  const settings = await Settings.findOne({});
  return NextResponse.json(settings || { maintenance: false, notification: '' });
}

// 🟡 POST → actualizar configuración
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  let settings = await Settings.findOne({});
  if (!settings) {
    settings = new Settings(data);
  } else {
    settings.maintenance = data.maintenance ?? settings.maintenance;
    settings.notification = data.notification ?? settings.notification;
    settings.updatedAt = new Date();
  }

  await settings.save();
  return NextResponse.json({ success: true, settings });
}
