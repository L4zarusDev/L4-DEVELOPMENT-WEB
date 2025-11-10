import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // opcional
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image({ params }: { params: { slug: string } }) {
  const title = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#0b0b0b,#7f1d1d)',
          color: '#fff',
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
    ),
    size
  );
}
