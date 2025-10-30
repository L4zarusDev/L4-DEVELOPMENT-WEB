'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface PackagePlan {
  name: string;
  price: string;
  highlights: string[];
  cta?: { title: string; url: string };
}

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  plans: PackagePlan[];
}

/**
 * Número de WhatsApp centralizado.
 * Cámbialo aquí y se actualiza en todos los botones.
 */
const WHATSAPP_NUMBER = '55333201442';

/**
 * Helper para armar el mensaje de WhatsApp
 */
function buildWhatsAppUrl(serviceTitle: string, planName: string) {
  const msg = `Hola 👋, vi los paquetes de *${serviceTitle}* y me interesa el plan *${planName}*. ¿Me compartes detalles y forma de pago?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * PackageModal
 * ------------------------------------------------------------
 * Muestra una lista de paquetes/planes y cada botón lleva a WhatsApp.
 * - Si el plan trae su propio CTA con URL → usamos esa
 * - Si NO trae CTA → construimos una a WhatsApp con el nombre del plan
 */
export default function PackageModal({
  open,
  onClose,
  title,
  subtitle,
  plans,
}: PackageModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[100]">
        {/* Overlay oscuro */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-200"
              enterFrom="translate-y-2 scale-95 opacity-0"
              enterTo="translate-y-0 scale-100 opacity-100"
              leave="transition-all duration-150"
              leaveFrom="translate-y-0 scale-100 opacity-100"
              leaveTo="translate-y-2 scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs text-white/70">
                      Paquetes &amp; Precios
                    </span>
                  </div>
                  <Dialog.Title className="mt-3 bg-gradient-to-r from-red-400 to-white bg-clip-text text-2xl font-semibold text-transparent">
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <p className="mt-1 text-sm text-white/70">{subtitle}</p>
                  )}
                </div>

                {/* Grid de planes */}
                <div className="grid gap-4 md:grid-cols-3">
                  {plans.map((plan, i) => {
                    // si el plan trae su CTA, la usamos, si no, generamos WA
                    const href =
                      plan.cta?.url || buildWhatsAppUrl(title, plan.name);
                    const btnText = plan.cta?.title || 'Hablar por WhatsApp';

                    return (
                      <div
                        key={i}
                        className="relative flex h-full flex-col rounded-xl border bg-neutral-900/40 p-5"
                      >
                        <h4 className="text-base font-semibold text-white">
                          {plan.name}
                        </h4>
                        <div className="mt-1 text-2xl font-bold text-white">
                          {plan.price}
                        </div>

                        <ul className="mt-4 space-y-2 text-sm text-white/85">
                          {plan.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
                        >
                          {btnText}
                        </a>
                      </div>
                    );
                  })}
                </div>

                {/* Footer / botón cerrar */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/10"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
