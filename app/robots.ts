// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Dominio base del proyecto.
  // 👉 En producción deberías tener NEXT_PUBLIC_BASE_URL definida
  //    para no depender de un string hardcodeado.
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://l4zarus.dev';

  return {
    // ──────────────────────────────────────────────────────────────
    // Reglas para los bots (Googlebot, Bingbot, etc.)
    // ──────────────────────────────────────────────────────────────
    rules: {
      // Se aplica a todos los user-agents
      userAgent: '*',

      // Permitimos rastrear todo por defecto
      allow: '/',

      // Pero bloqueamos rutas que normalmente no se indexan:
      // - /api/   → endpoints internos
      // - /admin/ → panel de administración (si llega a existir)
      // - /drafts/→ contenido no público / en edición
      disallow: ['/api/', '/admin/', '/drafts/'],
    },

    // Indica al bot dónde está el sitemap público de la app
    sitemap: `${base}/sitemap.xml`,

    // Host preferido/canónico
    host: base,
  };
}
