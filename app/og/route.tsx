// app/og/route.ts
import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // o 'nodejs'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#111,#7f1d1d)',
          color: '#fff',
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        L4 DEVELOPMENT
      </div>
    ),
    { width: 1200, height: 630 } // <-- tamaño aquí
  );
}
