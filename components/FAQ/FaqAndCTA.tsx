'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

type QA = { q: string; a: string };

// FAQ de negocio: tiempos, modelos, SEO, integraciones, soporte
const faqs: QA[] = [
  {
    q: '¿En cuánto tiempo pueden lanzar?',
    a: 'Para sitios web de conversión, entre 2 y 4 semanas. Un MVP de software suele ir de 4 a 8 semanas según alcance.',
  },
  {
    q: '¿Trabajan con contratos fijos o por horas?',
    a: 'Ambos: precio cerrado por entregables o modalidad time & materials. También ofrecemos mantenimiento mensual.',
  },
  {
    q: '¿Incluyen SEO técnico y performance?',
    a: 'Sí. Implementamos Core Web Vitals, Lighthouse 90+, schema.org, metas OG/Twitter, sitemap y seguridad (CSP).',
  },
  {
    q: '¿Pueden integrar pasarelas de pago o licencias?',
    a: 'Claro: Stripe, Lemon Squeezy, Paddle, y gestión de licencias/planes, activación y renovaciones.',
  },
  {
    q: '¿Cómo es el soporte post-lanzamiento?',
    a: 'Definimos un SLA con tiempos de respuesta, canales (email, WhatsApp, ticketing) y monitoreo básico.',
  },
];

// Animación base para el heading
const container = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * FAQ + CTA
 *
 * - Renderiza un FAQ simple con <details> para no meter dependencias.
 * - Genera JSON-LD (FAQPage) para SEO, basado en el array `faqs`.
 * - Incluye dos CTAs: cal.com y WhatsApp, ambas traqueadas en GA4 / Meta.
 */
export default function FaqAndCTA() {
  // Genera el JSON-LD una sola vez
  const faqJsonLd = useMemo(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
        },
      })),
    };
    return JSON.stringify(schema);
  }, []);

  // Links de salida
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const calLink = 'https://cal.com/l4zarusdev';

  // 👇 cámbialo por tu número real en formato internacional sin "+" ni "00"
  // ejemplo MX: 5215512345678
  const WHATS_NUMBER = '525533201442';
  const waText = encodeURIComponent(
    `Hola, vengo desde ${BASE}. Me interesa cotizar (web/software/redes/licencias). ¿Podemos agendar?`,
  );
  const waLink = `https://wa.me/${WHATS_NUMBER}?text=${waText}`;

  // Track de CTAs
  const handleCta = (type: 'cal' | 'whatsapp') => {
    // GA4
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({ event: 'cta_click', cta: type });

    // Meta Pixel
    // @ts-ignore
    if (typeof window.fbq === 'function') {
      // @ts-ignore
      window.fbq('trackCustom', 'CTA_Click', { cta: type });
    }
  };

  return (
    <section id="faq" className="relative mx-auto mt-32 max-w-5xl px-4">
      {/* Glow de fondo sutil rojo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 0%, rgba(185,28,28,0.18) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Encabezado */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        className="text-center"
      >
        <p className="mx-auto inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-wider text-red-300">
          FAQ
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Respuestas rápidas sobre tiempos, alcance, SEO y soporte. Si necesitas algo específico,
          hablemos.
        </p>
      </motion.div>

      {/* Lista de preguntas estilo acordeón */}
      <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            className="group"
            // Abrimos el primero por UX
            {...(idx === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-left text-white/90 hover:bg-white/5">
              <span className="text-base font-medium">{item.q}</span>
              <span className="shrink-0 rounded-full border border-white/10 bg-black/50 p-1.5 transition group-open:rotate-45">
                {/* ícono + */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-white/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 pt-1 text-white/75">{item.a}</div>
          </details>
        ))}
      </div>

      {/* CTA final (2 acciones principales) */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={calLink}
          onClick={() => handleCta('cal')}
          className="grid place-items-center rounded-full bg-white px-6 py-3 text-center text-base text-black shadow-cta transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
        >
          Agendar en Cal.com
        </a>
        <a
          href={waLink}
          target="_blank"
          onClick={() => handleCta('whatsapp')}
          className="grid place-items-center rounded-full border border-white/10 px-6 py-3 text-center text-base text-white shadow-alt-cta transition hover:border-red-500/40 hover:bg-red-500/10"
          rel="noreferrer"
        >
          Hablar por WhatsApp
        </a>
      </div>

      {/* JSON-LD FAQ para SEO */}
      <script
        type="application/ld+json"
        // ✅ Esto es seguro porque controlamos el contenido
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
    </section>
  );
}
