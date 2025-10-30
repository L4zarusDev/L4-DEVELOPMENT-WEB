'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  /** Valor de progreso que viene del contexto (0–100) */
  progress: number;
  /** Indica que ya terminamos de precargar TODO */
  isComplete: boolean;
  /** Callback para avisarle al padre que ya podemos desmontar esta pantalla */
  onComplete: () => void;
}

/**
 * LoadingScreen
 *
 * Pantalla de carga a pantalla completa:
 * - Bloquea el scroll mientras está visible.
 * - Muestra un porcentaje animado (suaviza el número para que no “salte”).
 * - Muestra una barra de progreso en la parte inferior.
 * - Cuando `isComplete` se vuelve true:
 *    1. corre una animación de salida con GSAP (slide up);
 *    2. dispara un evento `loadingScreenComplete` en window para que
 *       otros componentes (ej. shaders) puedan escucharlo;
 *    3. llama a `onComplete()` para que el gestor (`LoadingManager`) quite el loader.
 */
export default function LoadingScreen({
  progress,
  isComplete,
  onComplete,
}: LoadingScreenProps) {
  // refs para animar con GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  // estado que mostramos en pantalla (lo interpolamos con GSAP)
  const [displayProgress, setDisplayProgress] = useState(0);

  // 1. Bloquear el scroll mientras este overlay esté montado
  useEffect(() => {
    // deshabilita scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // al desmontar, reestablece
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 2. Animar el contador (%) — suaviza la transición del número
  useGSAP(
    () => {
      // objeto temporal para animar el valor
      gsap.to({ value: displayProgress }, {
        value: progress,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate() {
          
          // ts-expect-error targets es interno de gsap
          const val = this.targets()[0].value as number;
          setDisplayProgress(Math.round(val));
        },
      });
    },
    // se vuelve a ejecutar cada vez que cambia el progreso real
    [progress],
  );

  // 3. Animar la barra inferior
  useGSAP(
    () => {
      if (!progressBarRef.current) return;
      gsap.to(progressBarRef.current, {
        scaleY: progress / 100,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    [progress],
  );

  // 4. Cuando YA terminó la carga → animación de salida y aviso
  useGSAP(
    () => {
      if (!isComplete || !containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          // avisamos globalmente que la pantalla de carga terminó su animación
          // esto lo está escuchando, por ejemplo, tu componente de GodRays
          // para empezar a renderizar / animar
          window.dispatchEvent(new CustomEvent('loadingScreenComplete'));

          // avisamos al padre para desmontar este componente
          onComplete();
        },
      });

      // desliza toda la pantalla hacia arriba
      tl.to(containerRef.current, {
        y: '-100%',
        duration: 1,
        ease: 'power2.inOut',
      });
    },
    [isComplete, onComplete],
  );

  // No hacemos early return: dejamos que la salida la haga GSAP
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{ touchAction: 'none', overflow: 'hidden' }}
    >
      {/* Contador grande (centro) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={percentageRef}
          className="text-6xl font-bold text-white md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {displayProgress}%
        </span>
      </div>

      {/* Barra de progreso abajo (de 0 → 100%) */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-black/30">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-bottom bg-gradient-to-r from-red-500 via-rose-600 to-red-800 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* Texto secundario */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <p className="text-sm uppercase tracking-wider text-white/60">
          Cargando experiencia...
        </p>
      </div>
    </div>
  );
}
