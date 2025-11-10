'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  MegaphoneIcon,
  KeyIcon,
} from '@heroicons/react/24/solid';
import PackagesModal from './PackagesModal';

export interface Service {
  title: string;
  tagline: string;
  icon?: 'software' | 'web' | 'social' | 'licenses';
  bullets: Array<{
    heading: string;
    items: string[];
  }>;
  tags?: string[];
  // los botones de la card
  links?: Array<{
    title: string;
    url?: string;
    action?: 'packages'; // ← este es el que abre el modal
  }>;
  // info de paquetes (si el servicio la trae)
  packages?: {
    subtitle?: string;
    plans: Array<{
      name: string;
      price: string;
      highlights: string[];
      cta?: { title: string; url: string };
    }>;
  };
}

interface ServiceCardProps extends Service {
  // 👉 si el padre quiere controlar el modal (como en Services/index.tsx)
  onOpenPackages?: (service: Service) => void;
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
 * - muestra título, tag y secciones de bullets
 * - muestra tags
 * - los botones de `links` pueden:
 *    - ir a una URL (WhatsApp, landing…)
 *    - o abrir el popup de paquetes (`action: 'packages'`)
 *
 * Importante:
 * - si VIENE `onOpenPackages` → delega al padre
 * - si NO viene pero sí hay `packages` → abre su modal interno
 */
export default function ServiceCard({
  title,
  tagline,
  icon = 'software',
  bullets,
  tags = [],
  links = [],
  packages,
  onOpenPackages,
}: ServiceCardProps) {
  const Icon = iconMap[icon];

  // fallback de modal interno (sólo si NO hay onOpenPackages)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Maneja los botones de acción:
   * - action === 'packages'
   *    - si el padre me dio onOpenPackages → lo llamo
   *    - si no → abro mi modal interno
   * - url → navego
   */
  const handleLinkClick = (action?: 'packages', url?: string) => {
    if (action === 'packages') {
      // prioridad: que lo controle el padre
      if (onOpenPackages) {
        onOpenPackages({
          title,
          tagline,
          icon,
          bullets,
          tags,
          links,
          packages,
        });
        return;
      }

      // si no hay callback, pero sí hay paquetes, usamos el modal propio
      if (packages) {
        setOpen(true);
        return;
      }
    }

    // acción normal: ir a la URL
    if (url) {
      window.location.href = url;
    }
  };

  /**
   * (Opcional / futuro)
   * Checkout con Stripe directo desde la card.
   * Lo dejamos aquí por si más adelante quieres vender el plan
   * sin pasar por WhatsApp.
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
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-red-600 to-black">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70">{tagline}</p>
          </div>
        </div>

        {/* Bullets / secciones */}
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

        {/* Footer */}
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

          {/* Botones */}
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

        {/* borde glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition group-hover:ring-white/10" />
      </div>

      {/* Fallback: modal interno si NO hay callback del padre */}
      {packages && !onOpenPackages && (
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
