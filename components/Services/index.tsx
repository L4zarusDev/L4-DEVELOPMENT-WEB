'use client';

import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import ServicesCarousel from './ServicesCarousel';
import ServiceCard, { Service } from './ServiceCard';
import PackageModal from './PackagesModal';

// 👇 Cambia este número por el tuyo
const WHATSAPP_NUMBER = '5533201442';
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/**
 * Data de servicios
 * - Algunos links tienen `action: 'packages'` → abren el modal
 * - Otros links tienen `url` → siguen enviando a WhatsApp
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
  // DESARROLLO WEB (con paquetes → se abre modal)
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
        // 👇 ESTE abre el modal
        title: 'Quiero ver los paquetes',
        action: 'packages',
      },
      {
        // este sigue siendo WA
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
  // IMPULSO REDES SOCIALES (con paquetes → modal)
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
        title: 'Ver planes',
        action: 'packages', // 👈 abrir modal
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
  // VENTA DE LICENCIAS (sin modal, puro WhatsApp)
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Venta de licencias (SaaS/Software)',
    tagline: 'Activación inmediata, pagos seguros y soporte humano.',
    icon: 'licenses',
    bullets: [
      {
        heading: 'Producto',
        items: [
          'Demo y video',
          'Features y comparativa de planes',
          'FAQ y reseñas',
        ],
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

export default function Services() {
  // estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // handler que se le pasa al carrusel / cards
  const handleOpenPackages = (service: Service) => {
    if (!service.packages) return;
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="mx-auto mt-56 max-w-7xl px-4 py-16">
      <SectionHeading
        heading="Servicios"
        subheading="Soluciones end-to-end: desde software y sitios web de alto rendimiento, hasta crecimiento en redes y comercialización de licencias."
      />

      {/* Carrusel en una sola línea con flechas */}
      <div className="mt-10">
        {/* IMPORTANTE:
            ServicesCarousel (y/o ServiceCard) deben invocar este callback cuando
            detecten un link con action === 'packages'
        */}
        <ServicesCarousel
          services={servicesData}
          onOpenPackages={handleOpenPackages}
        />
      </div>

      {/* Modal de paquetes */}
      {selectedService && selectedService.packages && (
        <PackageModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title={selectedService.title}
          subtitle={selectedService.packages.subtitle}
          plans={selectedService.packages.plans}
        />
      )}
    </section>
  );
}
