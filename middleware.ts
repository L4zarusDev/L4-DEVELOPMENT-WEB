import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/* ───────────────────────────────
   🔹 FUNCIÓN: Obtener IP real
──────────────────────────────── */
function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() ?? '127.0.0.1';
  const candidates = ['x-real-ip', 'cf-connecting-ip', 'x-vercel-forwarded-for'];
  for (const h of candidates) {
    const v = req.headers.get(h);
    if (v) return v;
  }
  return '127.0.0.1';
}

/* ───────────────────────────────
   🔹 CONFIG: Upstash Rate Limit
──────────────────────────────── */
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })
    : null;

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      analytics: true,
      prefix: 'ratelimit',
    })
  : null;

/* ───────────────────────────────
   🔹 FUNCIÓN: Obtener estado mantenimiento
──────────────────────────────── */
async function fetchMaintenance(origin: string): Promise<boolean> {
  try {
    const res = await fetch(`${origin}/api/admin/settings`, {
      cache: 'no-store',
      headers: { 'x-internal-fetch': '1' }, // evita bucles
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.maintenance;
  } catch (err) {
    console.error('Error al obtener mantenimiento:', err);
    return false;
  }
}

/* ───────────────────────────────
   🔹 MIDDLEWARE PRINCIPAL
──────────────────────────────── */
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Evitar bucles y proteger rutas internas
  if (
    path.startsWith('/api/admin') ||
    path.startsWith('/maintenance') ||
    path.startsWith('/admin') ||
    path.startsWith('/_next') ||
    path.startsWith('/favicon') ||
    path.startsWith('/images') ||
    path.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // 🔸 Modo mantenimiento (usa Mongo)
  const maintenance = await fetchMaintenance(url.origin);
  if (maintenance && !(path.startsWith('/admin') || path.includes('/admin'))) {
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // 🔸 Rate limit en /api/contact
  if (path.startsWith('/api/contact')) {
    if (!limiter) return NextResponse.next();

    const ip = getClientIp(req);
    const { success, limit, reset, remaining } = await limiter.limit(`contact:${ip}`);

    const res = success
      ? NextResponse.next()
      : NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

    res.headers.set('X-RateLimit-Limit', String(limit));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    res.headers.set('X-RateLimit-Reset', String(reset));
    return res;
  }

  return NextResponse.next();
}

/* ───────────────────────────────
   🔹 RUTAS A MONITOREAR
──────────────────────────────── */
export const config = {
  matcher: [
    '/api/contact', // aplica rate-limit
    '/((?!_next/static|_next/image|favicon.ico).*)', // aplica mantenimiento global
  ],
};
