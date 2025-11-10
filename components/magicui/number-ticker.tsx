'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number; // en segundos
  className?: string;
}

/**
 * NumberTicker
 * ------------------------------------------------------------
 * Contador animado que:
 * - empieza en 0 (o en `value` si direction="down")
 * - cuando entra al viewport, anima hasta el número final
 * - usa framer-motion (motionValue + spring) para que la animación sea suave
 * - escribe el valor en el DOM formateado con Intl.NumberFormat
 *
 * Ideal para: estadísticas, views, revenue, etc.
 */
export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // valor crudo que vamos a animar
  const motionValue = useMotionValue(direction === 'down' ? value : 0);

  // spring para que no sea una animación lineal fea
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  // dispara la animación sólo cuando entra en viewport
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // cuando entra en vista, movemos el motionValue hacia el destino
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction]);

  // sincronizamos el DOM (textContent) con el valor del spring
  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(
          Number(latest.toFixed(0)),
        );
      }
    });
  }, [springValue]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block tracking-wider tabular-nums text-white dark:text-white',
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}
