'use client';

import SectionHeading from '../SectionHeading';
import ServicesCarousel from './ServicesCarousel';
import type { Service } from './ServiceCard';

// 👇 Cambia este número por el tuyo (formato internacional sin +)
const WHATSAPP_NUMBER = '55333201442';

// Helper para construir links de WhatsApp con mensaje precargado
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/**
 * servicesData
 * ------------------------------------------------------------
 * Aquí definimos TODO el contenido de los servicios:
 * - título, descripción corta, icono
 * - bullets (para mostrarlos dentro de la card)
 * - tags (para filtros o badges)
 * - links: AHORA todos van a WhatsApp con un mensaje contextual
 * - algunos tienen `packages` para mostrar planes y CTA de WhatsApp en cada uno
 *
 * La idea es que desde el carrusel el usuario NO salga a cal.com
 * sino que te escriba directo y tú cierras por WhatsApp.
 */
export const servicesData: Service[] = [
  {
    title: 'Desarrollo de software',
    tagline: 'Soluciones a medida con foco en resultados de negocio.',
    icon: 'software',
    bullets: [
      {
        heading: 'Problema → Solución',
        items: [
          'Traducción a lenguaje negocio para priorizar ROI',
          'Roadmap por hitos con KPIs medibles',
        ],
      },
      {
        heading: 'Entregables',
        items: [
          'Arquitectura, backend (API), frontend',
          'CI/CD, pruebas, documentación, monitoreo',
        ],
      },
      {
        heading: 'Modelos',
        items: ['Proyecto fijo', 'Time & materials', 'Mantenimiento'],
      },
      {
        heading: 'Tech',
        items: ['TypeScript, Node, Nest, Prisma', 'PostgreSQL, AWS/GCP, Docker'],
      },
      {
        heading: 'SLA y soporte',
        items: ['Tiempos de respuesta pactados', 'Canales de soporte claros'],
      },
    ],
    tags: ['API', 'Escalabilidad', 'Observabilidad'],
    links: [
      {
        title: 'Escribir por WhatsApp',
        url: wa(
          'Hola 👋, vi el servicio de *Desarrollo de software* y quiero agendar una llamada para revisar mi caso y presupuesto.',
        ),
      },
      {
        title: 'Pedir cotización',
        url: wa(
          'Hola 👋, necesito una *cotización de desarrollo de software*. Te comparto contexto:',
        ),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // DESARROLLO WEB (con paquetes)
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Desarrollo web',
    tagline: 'Sitios rápidos, SEO-friendly y optimizados para conversión.',
    icon: 'web',
    bullets: [
      { heading: 'Objetivos', items: ['Velocidad', 'SEO', 'Conversión'] },
      {
        heading: 'Entregables',
        items: [
          'UI/UX, copy, desarrollo',
          'CMS (Headless/WordPress), analítica, performance (CWV), accesibilidad AA',
        ],
      },
      {
        heading: 'Extras',
        items: ['A/B testing', 'Automations (correo, CRM)', 'i18n'],
      },
      {
        heading: 'Check técnico',
        items: [
          'Lighthouse 90+',
          'schema.org, sitemap, redirecciones',
          'Seguridad (CSP), backups',
        ],
      },
    ],
    tags: ['Next.js', 'SEO', 'Accesibilidad'],
    links: [
      {
        // antes era action: 'packages' para abrir modal → ahora WA
        title: 'Quiero ver los paquetes',
        url: wa(
          'Hola 👋, me interesa el servicio de *Desarrollo web* y quiero que me compartas los *paquetes y precios* que aparecen en la web.',
        ),
      },
      {
        title: 'Agendar por WhatsApp',
        url: wa(
          'Hola 👋, quiero una web (Next.js/WordPress) y me gustaría agendar una llamada para definir alcance y presupuesto.',
        ),
      },
    ],
    packages: {
      subtitle: 'Paquetes orientados a resultados. Precios de referencia.',
      plans: [
        {
          name: 'Web Start',
          price: '$550 MXN',
          cadence: '/proyecto',
          highlights: [
            'Landing 1 sección + contacto',
            'UI/UX base + copy simple',
            'SEO técnico básico + Analytics',
            'Deploy y dominio conectado',
          ],
          cta: {
            title: 'Pedir este por WhatsApp',
            url: wa(
              'Hola 👋, quiero el paquete *Web Start* ($550 MXN) y necesito que me digas qué información te paso.',
            ),
          },
        },
        {
          name: 'Web Growth',
          price: '$3,490 MXN',
          cadence: '/proyecto',
          popular: true,
          highlights: [
            'Sitio multipágina + Blog',
            'CMS (Headless o WP)',
            'Core Web Vitals 90+',
            'Automations (email/CRM) + A/B testing',
          ],
          cta: {
            title: 'Pedir este por WhatsApp',
            url: wa(
              'Hola 👋, me interesa el paquete *Web Growth* ($3,490 MXN). ¿Podemos afinar el alcance y ver tiempos?',
            ),
          },
        },
        {
          name: 'Web Performance+',
          price: '$4,500 MXN o Mas',
          cadence: '/proyecto',
          highlights: [
            'Arquitectura Next.js avanzada',
            'i18n + Accesibilidad AA',
            'SEO técnico completo + schema.org',
            'Soporte 30 días + optimizaciones',
          ],
          cta: {
            title: 'Hablar por WhatsApp',
            url: wa(
              'Hola 👋, quiero el plan *Web Performance+* (4,500 MXN o más) y necesito una propuesta según mi proyecto.',
            ),
          },
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // IMPULSO REDES SOCIALES (con paquetes)
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Impulso de redes sociales',
    tagline: 'Contenido + Ads cumpliendo políticas. Nada de atajos.',
    icon: 'social',
    bullets: [
      { heading: 'Paquetes', items: ['Starter', 'Growth', 'Pro'] },
      {
        heading: 'Incluye',
        items: [
          'Calendario (x posts/semana)',
          'Creatividades (estáticos + video corto)',
          'Gestión de comentarios/DMs',
          'UGC y colaboraciones',
        ],
      },
      {
        heading: 'Ads',
        items: [
          'Meta / TikTok / LinkedIn (presupuesto aparte)',
          'Reporte mensual: alcance, ER, CPL/CPA',
        ],
      },
      {
        heading: 'Disclaimer TOS',
        items: [
          'Crecimiento orgánico/ads cumpliendo políticas',
          'Sin prácticas prohibidas',
        ],
      },
    ],
    tags: ['Content', 'Ads', 'Analytics'],
    links: [
      {
        title: 'Ver planes por WhatsApp',
        url: wa(
          'Hola 👋, vi el servicio de *Impulso de redes sociales* y quiero que me mandes los *planes mensuales* (Starter / Growth / Pro).',
        ),
      },
      {
        title: 'Reservar por WhatsApp',
        url: wa(
          'Hola 👋, quiero impulsar mis redes (contenido + ads) y me gustaría que me ayudes a elegir el plan correcto.',
        ),
      },
    ],
    packages: {
      subtitle: 'Planes mensuales. Creatividad + datos = crecimiento real.',
      plans: [
        {
          name: 'Starter',
          price: '$550 MXN',
          cadence: '/mes',
          highlights: [
            '12 posts/mes (estáticos y 4 reels)',
            'Calendario editorial',
            'Gestión básica de comentarios',
            'Reporte mensual de métricas',
          ],
          cta: {
            title: 'Quiero este (WhatsApp)',
            url: wa(
              'Hola 👋, quiero contratar el plan *Starter* de redes sociales ($550 MXN/mes). ¿Qué datos necesitas?',
            ),
          },
        },
        {
          name: 'Growth',
          price: '$750 MXN',
          cadence: '/mes',
          popular: true,
          highlights: [
            '20 posts/mes (8 reels)',
            'UGC ligero + colaboraciones',
            'Gestión de DMs prioritaria',
            'Ads básicos (setup + optimización)*',
          ],
          cta: {
            title: 'Quiero este (WhatsApp)',
            url: wa(
              'Hola 👋, me interesa el plan *Growth* ($750 MXN/mes) para redes. Quiero saber fechas de arranque y forma de pago.',
            ),
          },
        },
        {
          name: 'Pro',
          price: '$1,200 MXN',
          cadence: '/mes',
          highlights: [
            '30 posts/mes (12 reels)',
            'Producción de creatividades premium',
            'Gestión integral de comunidad',
            'Ads avanzados + pruebas A/B*',
          ],
          cta: {
            title: 'Hablar por WhatsApp',
            url: wa(
              'Hola 👋, quiero el plan *Pro* de redes ($1,200 MXN/mes). Necesito que lo adaptemos a mi industria.',
            ),
          },
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // VENTA DE LICENCIAS
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Venta de licencias (SaaS/Software)',
    tagline: 'Activación inmediata, pagos seguros y soporte humano.',
    icon: 'licenses',
    bullets: [
      {
        heading: 'Producto',
        items: ['Demo y video', 'Features y comparativa de planes', 'FAQ y reseñas'],
      },
      { heading: 'Checkout', items: ['Stripe / Paddle / Lemon Squeezy'] },
      {
        heading: 'Gestión de licencias',
        items: [
          'Alta automática, claves, activación',
          'Dispositivos/asientos, renovaciones',
          'Recordatorios y área de cliente',
        ],
      },
      { heading: 'Legal', items: ['EULA, reembolsos', 'Uso aceptable, privacidad'] },
      { heading: 'Soporte', items: ['Help center, status page', 'SLA de respuesta'] },
    ],
    tags: ['SaaS', 'Licensing', 'Payments'],
    links: [
      {
        title: 'Contactar ventas (WhatsApp)',
        url: wa(
          'Hola 👋, me interesa la *venta de licencias (SaaS/Software)*. Quiero saber precios, activación y métodos de pago.',
        ),
      },
      {
        title: 'Ver demo por WhatsApp',
        url: wa(
          'Hola 👋, ¿me puedes enviar la *demo del software* y la comparativa de planes/licencias?',
        ),
      },
    ],
  },
];

/**
 * Services (UI)
 * ------------------------------------------------------------
 * Sección que muestra:
 * - título y subtítulo
 * - carrusel con las cards de arriba
 *
 * Esto es lo que estás usando en la home.
 */
export default function Services() {
  return (
    <section id="services" className="mx-auto mt-56 max-w-7xl px-4 py-16">
      <SectionHeading
        heading="Servicios"
        subheading="Soluciones end-to-end: desde software y sitios web de alto rendimiento, hasta crecimiento en redes y comercialización de licencias."
      />

      {/* Carrusel en una sola línea con flechas */}
      <div className="mt-10">
        <ServicesCarousel services={servicesData} />
      </div>
    </section>
  );
}
