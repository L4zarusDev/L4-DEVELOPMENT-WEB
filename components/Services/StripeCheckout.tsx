'use client';

import React, { useState } from 'react';

/**
 * StripeCheckout (placeholder)
 * ------------------------------------------------------------
 * - Antes: dependía de @stripe/react-stripe-js → rompía el build.
 * - Ahora: es un componente “tonto” que solo dispara un fetch a tu API
 *   `/api/checkout` (si la tienes) o muestra un warning.
 * - Objetivo: que el build de Next.js pase sin instalar nada extra.
 *
 * Si más adelante quieres el flujo completo de Stripe con Elements,
 * solo vuelves a este archivo y restauras la versión con
 * `@stripe/react-stripe-js`.
 */

interface StripeCheckoutProps {
  amount: number;
  description?: string;
}

export default function StripeCheckout({ amount, description }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setMsg(null);

    try {
      // Aquí asumimos que tienes un endpoint API en /api/checkout
      // Si NO lo tienes, simplemente cambia el mensaje de éxito.
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ amount, description }),
      });

      if (!res.ok) {
        throw new Error('Error al crear sesión de pago');
      }

      // En un caso real, aquí redirigirías a Stripe
      setMsg('✅ Checkout iniciado (placeholder). Configura Stripe para redirigir.');
    } catch (err: any) {
      console.error(err);
      setMsg('❌ No se pudo iniciar el pago. Revisa la API o usa WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white">
      <p className="mb-2 text-white/80">
        Pago estimado: <strong>${amount}</strong>
      </p>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-500/50"
      >
        {loading ? 'Creando sesión…' : 'Pagar (demo)'}
      </button>

      {msg && <p className="mt-3 text-xs text-white/70">{msg}</p>}

      <p className="mt-3 text-[11px] text-white/40">
        ⚠️ Esto es un placeholder porque no está instalada <code>@stripe/react-stripe-js</code>.
      </p>
    </div>
  );
}
