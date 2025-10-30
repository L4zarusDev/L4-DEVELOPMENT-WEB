import React from 'react';
import Image from 'next/image';
import QuoteCircles from '../../public/images/svg/2nd-quote-circles.svg';
import QuoteBGBlur from '../../public/images/svg/2nd-quote-bg-blur.svg';

/**
 * SecondQuote
 * ------------------------------------------------------------
 * Bloque decorativo de cita para el cierre de la página.
 * - Centra una frase sobre un fondo de círculos y blur
 * - Usa imágenes en SVG para el efecto visual
 * - Está pensado para fondo oscuro
 *
 * Puedes cambiar la cita fácilmente o parametrizarla con props.
 */
export default function SecondQuote() {
  return (
    <div className="relative mt-20 lg:mt-40">
      <div className="flex flex-col items-center justify-center">
        {/* Cita encima de los círculos */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="bg-gradient-to-b from-white to-[#000000] bg-clip-text text-2xl font-medium text-transparent lg:text-6xl">
            La simplicidad es la máxima sofisticación.
          </div>
          <div className="mt-2 text-lg font-extralight text-white/50 lg:text-2xl">
            – Leonardo Da Vinci
          </div>
        </div>

        {/* Círculos decorativos */}
        <div className="relative z-5">
          <Image src={QuoteCircles} alt="Quote Circles" />
        </div>

        {/* Blur de fondo */}
        <div className="absolute z-[1]">
          <Image src={QuoteBGBlur} alt="Quote BG Blur" />
        </div>
      </div>
    </div>
  );
}
