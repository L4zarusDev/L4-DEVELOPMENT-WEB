'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

interface TurnstileProps {
  onToken: (token: string) => void;
  /**
   * Si no lo pasas, toma NEXT_PUBLIC_TURNSTILE_SITE_KEY
   */
  siteKey?: string;
}

/**
 * Turnstile (Cloudflare)
 * ------------------------------------------------------------
 * Componente cliente que:
 * - Carga el script de Cloudflare Turnstile
 * - Renderiza el widget en un <div> por ref
 * - Cuando el challenge se completa, llama a `onToken(token)`
 * - Si expira / hay error / timeout → manda token vacío
 *
 * Notas:
 * - Usa `appearance: 'interaction-only'` y `theme: 'dark'`
 * - Está pensado para usarse en formularios de Next (contacto, etc.)
 */
export default function Turnstile({
  onToken,
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
}: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // usamos un alias para window porque TS no sabe de turnstile
    const w = window as any;

    function render() {
      if (!ref.current || !w.turnstile || !siteKey) return;

      w.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: onToken,
        theme: 'dark',
        appearance: 'interaction-only',
        'error-callback': () => onToken(''),
        'expired-callback': () => onToken(''),
        'timeout-callback': () => onToken(''),
      });
    }

    // si ya cargó el script, renderizamos de una
    if (w.turnstile) {
      render();
    } else {
      // si no, dejamos el callback global que Turnstile espera
      w.onTurnstileLoad = render;
    }
  }, [onToken, siteKey]);

  return (
    <>
      {/* Carga del script de Cloudflare */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
        strategy="afterInteractive"
      />
      {/* Contenedor donde Turnstile va a pintar el widget */}
      <div ref={ref} className="cf-turnstile" />
    </>
  );
}
