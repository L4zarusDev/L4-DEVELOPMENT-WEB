'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '@/lib/context/LoadingContext';

/**
 * useAssetPreloader
 *
 * Hook que simula y coordina la precarga de “assets críticos” de tu landing/app
 * para que el LoadingScreen pueda mostrar una barra y porcentaje reales.
 *
 * Qué hace:
 * 1. Simula un progreso incremental (0 → ~85%) para que el usuario vea movimiento.
 * 2. Marca como cargados los assets que te interesan (fonts, imágenes críticas, shader, hero).
 * 3. Se asegura de que el loading dure al menos X ms (2.5s) para evitar parpadeos.
 * 4. Al final pone el progreso en 100%.
 *
 * Se ejecuta **solo una vez** por montaje gracias a hasRunRef.
 */
export function useAssetPreloader() {
  const { setAssetLoaded, setProgress } = useLoading();
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Evitar que el hook se ejecute dos veces (React strict mode / re-renders)
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    let progressInterval: NodeJS.Timeout;
    let currentProgress = 0;

    /**
     * 1) Simulación de progreso
     * Cada 200ms subimos el progreso un poquito hasta aprox 85%.
     * El resto lo completamos cuando los assets reales terminen.
     */
    const simulateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15; // entre 0 y 15 aprox
        if (currentProgress < 85) {
          setProgress(currentProgress);
        } else {
          // No queremos pasar de 85 aquí, paramos
          clearInterval(progressInterval);
        }
      }, 200);
    };

    /**
     * 2) “Precarga” de assets
     * Aquí marcas concretamente qué consideras como asset crítico.
     * En este ejemplo son:
     *   - fuentes
     *   - imágenes críticas
     *   - shader
     *   - componentes del hero
     */
    const preloadAssets = async () => {
      try {
        const loadingStartTime = Date.now();

        // Empezamos con la simulación
        simulateProgress();

        await Promise.all([
          // 2.1 Fuentes
          new Promise<void>((resolve) => {
            if (document.fonts) {
              document.fonts.ready.then(() => {
                setAssetLoaded('fonts');
                resolve();
              });
            } else {
              // fallback si el navegador no soporta document.fonts
              setTimeout(() => {
                setAssetLoaded('fonts');
                resolve();
              }, 1000);
            }
          }),

          // 2.2 Imágenes críticas (aquí lo dejamos inmediato, pero puedes precargar con Image)
          new Promise<void>((resolve) => {
            setAssetLoaded('critical-images');
            resolve();
          }),

          // 2.3 Shader (simulado con timeout)
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setAssetLoaded('god-rays-shader');
              resolve();
            }, 2000);
          }),

          // 2.4 Componentes del hero (simulado con timeout)
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setAssetLoaded('hero-components');
              resolve();
            }, 500);
          }),
        ]);

        // Ya terminaron las “cargas” → detenemos la simulación
        clearInterval(progressInterval);

        // 3) Asegurar duración mínima de la pantalla de carga
        const minLoadingTime = 2500; // 2.5s mínimo
        const elapsed = Date.now() - loadingStartTime;

        if (elapsed < minLoadingTime) {
          setTimeout(() => {
            setProgress(100);
          }, minLoadingTime - elapsed);
        } else {
          setProgress(100);
        }
      } catch (error) {
        console.error('Asset preloading failed:', error);
        // Si algo falla, no bloqueamos la UI:
        clearInterval(progressInterval);
        setProgress(100);
      }
    };

    preloadAssets();

    // Limpieza por si el componente se desmonta en medio
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [setAssetLoaded, setProgress]);
}
