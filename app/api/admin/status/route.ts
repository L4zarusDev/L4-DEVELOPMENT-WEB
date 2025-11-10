import { NextResponse } from 'next/server';

export async function GET() {
  const maintenance = process.env.MAINTENANCE_MODE === 'true';
  return NextResponse.json({ maintenance });
}
