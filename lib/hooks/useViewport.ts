// lib/hooks/useViewport.ts
'use client';

import { useEffect, useState } from 'react';

interface ViewportDimensions {
  width: number;
  height: number;
}

/**
 * useViewport
 *
 * Hook muy simple para tener **un tamaño de viewport “controlado”**.
 * No devuelve exactamente `window.innerWidth/innerHeight`,
 * sino una versión “discretizada” pensada para shaders / canvas / fondos,
 * donde conviene **no redibujar en cada píxel**.
 *
 * 🎯 Qué hace:
 * - Escucha el `resize`
 * - Si es mobile (< 768): fuerza 390x844 (como iPhone-ish)
 * - Si es tablet (<= 1024): fuerza 1024x720
 * - Si es desktop: fuerza 1920x1080
 *
 * Esto ayuda a:
 * - evitar re-renders inútiles
 * - estabilizar animaciones WebGL / canvases
 * - mantener la misma proporción aunque el usuario cambie un poco el tamaño
 */
export function useViewport() {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // 📏 “Cuantizamos” los tamaños según breakpoints
      setDimensions({
        width: width <= 768 ? 390 : width <= 1024 ? 1024 : 1920,
        // altura: si es muy chica, subimos un mínimo para que los efectos se vean
        height: width <= 768 ? 844 : height <= 720 ? 720 : 1080,
      });
    };

    // correr una vez al montar
    updateDimensions();

    // escuchar cambios
    window.addEventListener('resize', updateDimensions);

    // limpiar
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}
