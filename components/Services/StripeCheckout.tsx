'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

interface StripeCheckoutProps {
  priceId: string; // ID del precio en Stripe (price_xxx)
}

/**
 * StripeCheckout
 * ------------------------------------------------------------
 * Botón simple que:
 * 1. llama a tu endpoint `/api/checkout`
 * 2. le pasa el `priceId`
 * 3. recibe una URL de Checkout
 * 4. redirige al usuario a Stripe
 *
 * Notas importantes:
 * - Esto asume que YA envolviste tu app con <Elements stripe={...}> en un nivel superior
 * - Aquí no estamos usando directamente <CardElement />, porque delegamos el pago
 *   al Checkout de Stripe (hosted). Si quisieras pago embebido, ahí sí usas CardElement.
 * - Asegúrate de que tu endpoint `/api/checkout` devuelva { url: string }
 */
const StripeCheckout = ({ priceId }: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    // Stripe todavía no cargó
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId }),
      });

      const { url } = await res.json();

      // Redirige al usuario a la página de Checkout de Stripe
      if (url) {
        window.location.href = url;
      } else {
        // Podrías mostrar un toast de error aquí
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Error iniciando checkout de Stripe:', err);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="rounded-full bg-red-600 px-6 py-3 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isProcessing}
    >
      {isProcessing ? 'Procesando…' : 'Pagar ahora'}
    </button>
  );
};

export default StripeCheckout;
