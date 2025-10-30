// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dominio base del sitio.
  // 👉 Usa la env en producción, y si no existe cae en el dominio público.
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://l4zarus.dev';

  // ────────────────────────────────────────────────────────────────
  // 1) Rutas dinámicas simuladas (ej. servicios)
  //    En un caso real esto podría venir de:
  //    - una BD
  //    - un CMS (Sanity, Strapi, Contentful…)
  //    - el filesystem (leer /content/services/*.md)
  // ────────────────────────────────────────────────────────────────
  const serviceSlugs = [
    'desarrollo-web',
    'desarrollo-software',
    'impulso-redes',
    'venta-licencias',
  ];

  const services: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    // 👇 hoy; si lo sacas de una BD pon aquí su fecha real de update
    lastModified: new Date(),
    // servicios suelen cambiar con menos frecuencia que el home
    changeFrequency: 'monthly',
    // 0.7 = importante pero no tanto como el home o /services general
    priority: 0.7,
  }));

  // ────────────────────────────────────────────────────────────────
  // 2) Rutas estáticas principales
  //    Aquí pones todo lo que sabes que existe siempre.
  // ────────────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // ────────────────────────────────────────────────────────────────
  // 3) Combinar todo y devolverlo
  // ────────────────────────────────────────────────────────────────
  return [...staticRoutes, ...services];
}
