'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import { createNoise3D } from 'simplex-noise';
import { cn } from '@/lib/utils';

interface WavyBackgroundProps extends PropsWithChildren {
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  /** blur aplicado al canvas (default 10) */
  blur?: number;
  /** velocidad de animación de las olas */
  speed?: 'slow' | 'fast';
  /** opacidad general de las olas/fondo */
  waveOpacity?: number;
  [key: string]: any;
}

/**
 * Componente: WavyBackground
 *
 * Qué hace:
 * - Dibuja un fondo animado con olas "orgánicas" usando simplex-noise en un <canvas>.
 * - Las olas se redibujan en cada frame (requestAnimationFrame).
 * - Permite colocar contenido encima (children) dentro de un contenedor posicionado.
 *
 * Uso típico:
 * <WavyBackground>
 *   <h1>Hero</h1>
 * </WavyBackground>
 *
 * Notas:
 * - El canvas ocupa toda la pantalla (h-screen).
 * - Se aplica un mask para degradar los lados.
 * - Incluye un pequeño patch para Safari (Safari no siempre respeta el filter del canvas).
 */
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  // Generador de ruido 3D (x, y, t) → usamos x y la capa para variar
  const noise = createNoise3D();

  // Refs de canvas/contexto
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Para Safari aplicamos estilo extra
  const [isSafari, setIsSafari] = useState(false);

  // =========================================================
  // 1. Función para mapear velocidad de la prop → valor numérico
  // =========================================================
  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };

  // =========================================================
  // 2. Colores de las olas por defecto (puedes pasar tu array)
  // =========================================================
  const waveColors = colors ?? [
    '#38bdf8',
    '#818cf8',
    '#c084fc',
    '#e879f9',
    '#22d3ee',
  ];

  // Estas variables las usaremos dentro de init/render
  let w: number;
  let h: number;
  let nt: number; // "tiempo" para el ruido
  let ctx: CanvasRenderingContext2D | null;
  let animationId: number;

  // =========================================================
  // 3. Dibuja N olas
  // =========================================================
  const drawWave = (n: number) => {
    if (!ctx) return;

    // avanzamos el "tiempo" del ruido
    nt += getSpeed();

    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];

      // Dibujamos la línea de izquierda a derecha
      for (let x = 0; x < w; x += 5) {
        // ruido: cuanto más grande el divisor, más suave la ola
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        // centramos en vertical (h * 0.5)
        ctx.lineTo(x, y + h * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    }
  };

  // =========================================================
  // 4. Loop principal de dibujo
  // =========================================================
  const render = () => {
    if (!ctx) return;

    // fondo
    ctx.fillStyle = backgroundFill || 'black';
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);

    // dibujar varias olas
    drawWave(5);

    // siguiente frame
    animationId = requestAnimationFrame(render);
  };

  // =========================================================
  // 5. Inicializa canvas, tamaño y arranca animación
  // =========================================================
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    // setear tamaño a viewport
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;

    // desenfoque de las olas
    ctx.filter = `blur(${blur}px)`;

    // tiempo inicial
    nt = 0;

    // cuando se hace resize, actualizamos tamaño y blur
    window.onresize = () => {
      if (!ctx) return;
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    // comenzamos el loop
    render();
  }, [blur]);

  // =========================================================
  // 6. Montaje / desmontaje
  // =========================================================
  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  // =========================================================
  // 7. Detección sencilla de Safari
  // =========================================================
  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'),
    );
  }, []);

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col items-center justify-center overflow-y-hidden',
        containerClassName,
      )}
    >
      {/* Canvas de fondo animado */}
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute inset-0 z-10 max-w-full"
        style={{
          // degradado lateral para que no se vea "cortado"
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          // Safari no siempre respeta el filter del contexto → fallback
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />

      {/* Contenido encima de las olas */}
      <div className={cn('relative z-30', className)} {...props}>
        {children}
      </div>
    </div>
  );
};
