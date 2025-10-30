'use client';

import { useRef } from 'react';

import type { ConfettiRef } from './magicui/confetti';
import Confetti from './magicui/confetti';

/**
 * TheEnd
 *
 * Sección final con un gran “THE END” y confeti.
 * - Renderiza un canvas de confeti sobre toda la sección
 * - Dispara el confeti cuando pasas el mouse por encima
 * - Usa forwardRef del componente Confetti para poder llamar fire()
 */
export default function TheEnd() {
  // ref que apunta a la API pública del componente de confeti
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div
      className="
        relative z-[99] mt-40
        flex h-[500px] w-full flex-col items-center justify-center
        overflow-hidden bg-bg-default
        md:shadow-xl
      "
    >
      {/* Texto grande con degradado */}
      <span
        className="
          pointer-events-none whitespace-pre-wrap
          bg-gradient-to-b from-black to-gray-300/80
          bg-clip-text px-4 text-center text-8xl font-semibold leading-none text-transparent
          dark:from-white dark:to-slate-900/10
        "
      >
        THE END
      </span>

      {/* Capa de confeti: ocupa todo el contenedor */}
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        // cuando el usuario pasa el mouse, se dispara el confeti
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
}
