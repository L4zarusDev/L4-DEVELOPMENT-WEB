'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  MegaphoneIcon,
  KeyIcon,
} from '@heroicons/react/24/solid';
import PackagesModal, { PackagePlan } from './PackagesModal';

export interface Service {
  title: string;
  tagline: string;
  icon?: 'software' | 'web' | 'social' | 'licenses';
  bullets: Array<{
    heading: string;
    items: string[];
  }>;
  tags?: string[];
  links?: { title: string; url?: string; action?: 'packages' }[];
  packages?: {
    subtitle?: string;
    plans: PackagePlan[];
  };
}

// Mapa de iconos por tipo de servicio
const iconMap = {
  software: Cog6ToothIcon,
  web: GlobeAltIcon,
  social: MegaphoneIcon,
  licenses: KeyIcon,
};

/**
 * ServiceCard
 * ------------------------------------------------------------
 * Card de servicio reutilizable:
 * - muestra título, subtítulo y un icono según el tipo
 * - lista bullets agrupados (heading + items)
 * - muestra tags al final
 * - soporta links de acción (botones) que pueden:
 *    - abrir un modal de paquetes (`action: 'packages'`)
 *    - o ir a una URL (por ejemplo, WhatsApp o una landing)
 * - si el servicio tiene `packages`, renderiza un `PackagesModal` (headlessui)
 *
 * También hay una función `handleCheckout` (comentada aquí con Stripe) por si
 * quieres vender los planes directo; de momento la dejamos preparada.
 */
export default function ServiceCard({
  title,
  tagline,
  icon = 'software',
  bullets,
  tags = [],
  links = [],
  packages,
}: Service) {
  const Icon = iconMap[icon];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Maneja los botones de la card:
   * - si es action: 'packages' → abre modal
   * - si trae url → redirige
   */
  const handleLinkClick = (action?: 'packages', url?: string) => {
    if (action === 'packages' && packages) {
      setOpen(true);
      return;
    }
    if (url) window.location.href = url;
  };

  /**
   * (Opcional)
   * Ejemplo para hacer checkout con Stripe desde un plan:
   * NO se está usando en la UI de arriba, pero lo dejamos como referencia.
   */
  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error al crear la sesión de Stripe:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition hover:border-red-500/40 hover:bg-neutral-900/60">
        {/* Header de la card */}
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-red-600 to-black">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70">{tagline}</p>
          </div>
        </div>

        {/* Contenido: bullets por secciones */}
        <div className="flex flex-1 flex-col gap-5">
          {bullets.map((section, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/5 bg-white/5 p-4"
            >
              <h4 className="mb-2 text-sm font-semibold text-red-500">
                {section.heading}
              </h4>
              <ul className="space-y-1.5 text-sm text-white/85">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer: tags + botones */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => handleLinkClick(link.action, link.url)}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>

        {/* Glow / ring al hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition group-hover:ring-white/10" />
      </div>

      {/* Modal de paquetes, sólo si el servicio lo trae */}
      {packages && (
        <PackagesModal
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          subtitle={packages.subtitle}
          plans={packages.plans}
        />
      )}
    </>
  );
}
