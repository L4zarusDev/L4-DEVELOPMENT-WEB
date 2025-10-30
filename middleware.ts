// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Helper: obtiene la IP del cliente desde encabezados comunes
function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const candidates = [
    'x-real-ip',                // Nginx / proxies
    'cf-connecting-ip',         // Cloudflare
    'x-vercel-forwarded-for',   // Vercel
    'fastly-client-ip',         // Fastly
    'true-client-ip',           // Cloudflare Enterprise/Akamai
  ];
  for (const h of candidates) {
    const v = req.headers.get(h);
    if (v) return v;
  }
  return '127.0.0.1';
}

// Inicializa Upstash Redis solo si hay credenciales
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
      limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 req/min por IP
      analytics: true,
      prefix: 'ratelimit',
    })
  : null;

export async function middleware(req: NextRequest) {
  // Solo aplicamos rate-limit a /api/contact (el matcher también lo restringe)
  if (!limiter) return NextResponse.next();

  const ip = getClientIp(req);
  const { success, limit, reset, remaining } = await limiter.limit(`contact:${ip}`);

  const res = success
    ? NextResponse.next()
    : NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  // Exponemos cabeceras informativas
  res.headers.set('X-RateLimit-Limit', String(limit));
  res.headers.set('X-RateLimit-Remaining', String(remaining));
  res.headers.set('X-RateLimit-Reset', String(reset));
  return res;
}

// Limita el middleware a la ruta del API de contacto
export const config = {
  matcher: ['/api/contact'],
};
