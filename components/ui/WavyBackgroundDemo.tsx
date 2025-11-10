'use client';

import React from 'react';
import { WavyBackground } from '../ui/wavy-background';

/**
 * Componente: WavyBackgroundDemo
 *
 * Qué hace:
 * - Renderiza el fondo animado de olas (WavyBackground) que ya construiste.
 * - Coloca encima una cita de Steve Jobs con gradiente y tipografía grande.
 * - Es un ejemplo/demo de cómo usar el componente base.
 *
 * Dónde usarlo:
 * - En una sección de landing (hero alterno, bloque de inspiración, testimonio bonito).
 * - Como separador visual entre secciones oscuras.
 */
export function WavyBackgroundDemo() {
  return (
    <WavyBackground
      // color de fondo del canvas
      backgroundFill="#08080e"
      // estilos del contenido que vive ENCIMA del canvas
      className="relative z-[999] mx-auto w-full py-20 pb-40"
    >
      {/* Texto principal con gradiente */}
      <p className="inter-var inline-block bg-gradient-to-r from-white to-[#B17DE8] bg-clip-text px-4 pb-2 text-center text-2xl text-transparent md:text-4xl lg:text-6xl xl:text-7xl">
        The smallest company in the world can look as large as the largest
        company on the web.
      </p>

      {/* Autor */}
      <p className="inter-var mt-4 text-center text-base font-light text-white/80 md:text-lg">
        – Steve Jobs
      </p>
    </WavyBackground>
  );
}
