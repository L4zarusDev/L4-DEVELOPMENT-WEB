'use client';

import { GodRays } from '@paper-design/shaders-react';
import { useViewport } from '@/lib/hooks/useViewport';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useLoading } from '@/lib/context/LoadingContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Capa visual decorativa con "rayos de luz" (God Rays) responsivos.
 *
 * 🔧 Qué hace:
 * - Solo monta el shader cuando:
 *   1) el viewport ya está listo,
 *   2) la sección es visible en pantalla (intersection observer),
 *   3) y el loading screen ya terminó.
 * - Esto evita render pesado cuando el usuario no lo ve.
 *
 * 🧠 Dónde usarlo:
 * - Encima del hero, detrás del contenido (tiene `pointer-events-none` y z negativo).
 * - Se puede poner en layout para páginas con fondo dramático.
 */
export default function ResponsiveGodRays() {
  // 1) Tamaño actual del viewport para que el shader escale bien
  const { width, height } = useViewport();

  // 2) Loading global: no queremos animar hasta que la pantalla de carga diga “ok”
  const { isComplete: loadingComplete, setAssetLoaded } = useLoading();

  // 3) Flag local: “ya puedo animar”
  const [canAnimate, setCanAnimate] = useState(false);

  // 4) Saber si ESTE bloque está en viewport (optimización)
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  // ⏱️ Marcamos el shader como “cargado” con un tiempo realista
  //    Esto ayuda a que la pantalla de loading no se vaya antes de tiempo.
  useEffect(() => {
    const shaderLoadTimer = setTimeout(() => {
      // Le avisamos al loader global que este asset ya está
      setAssetLoaded('god-rays-shader');
    }, 800);

    return () => clearTimeout(shaderLoadTimer);
  }, [setAssetLoaded]);

  // 👂 Escuchamos el evento global que dispara el layout cuando ya terminó el loading inicial
  useEffect(() => {
    const handleLoadingComplete = () => {
      setCanAnimate(true);
    };

    window.addEventListener('loadingScreenComplete', handleLoadingComplete);

    // Si al montar ya estaba completo, activamos directo
    if (loadingComplete) {
      setCanAnimate(true);
    }

    return () => {
      window.removeEventListener('loadingScreenComplete', handleLoadingComplete);
    };
  }, [loadingComplete]);

  // ✅ Solo renderizamos el shader cuando:
  // - el loader terminó
  // - y la sección es visible
  const shouldRenderShader = canAnimate && isIntersecting;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="pointer-events-none absolute left-0 top-0 -z-10 h-[100dvh] w-full overflow-hidden"
      style={{
        // Suaviza el corte de los rayos hacia abajo
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
      }}
    >
      <AnimatePresence mode="wait">
        {shouldRenderShader && (
          <motion.div
            key="god-rays-shader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            {/* 
              🎨 Ajuste de paleta:
              - tonos rojos y negros para que combine con tu UI
              - bloom bajo para no quemar el texto
              - speed suave (0.75) para que no distraiga
            */}
            <GodRays
              width={width}
              height={height}
              colors={[
                '#7f1d1d99', // capa lejana rojiza y translúcida
                '#b91c1cdd', // rojo principal
                '#ffffffff', // highlight de los rayos
                '#ef4444cc', // toque coral / rojo vivo
              ]}
              colorBack="#000000ff" // fondo base negro
              colorBloom="#7f1d1d" // bloom rojizo oscuro
              bloom={0.35}
              intensity={0.75}
              density={0.3}
              spotty={0.28}
              midSize={0.2}
              midIntensity={0.4}
              speed={0.75}
              offsetY={-0.55}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
