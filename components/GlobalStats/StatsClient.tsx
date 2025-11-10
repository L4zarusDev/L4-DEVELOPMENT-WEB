/**
 * ============================================================
 * 🧩 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * StatsClient
 * - Recibe métricas ya calculadas desde el server (YouTube, GitHub…)
 * - Anima la aparición con framer-motion
 * - Cada valor se muestra con NumberTicker (contador animado)
 * - Muestra etiqueta “(Modo de depuración)” si viene isDebug=true
 * ============================================================
 */

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import NumberTicker from '../magicui/number-ticker';

interface Stat {
  value: number;
  label: string;
}

interface StatsClientProps {
  statsData: Stat[];
  isDebug?: boolean;
}

export default function StatsClient({
  statsData,
  isDebug = false,
}: StatsClientProps) {
  // Referencia para disparar la animación sólo cuando el bloque entra en viewport
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  // Contenedor que controla el stagger (aparición escalonada de hijos)
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4, // Deja que el título aparezca primero
      },
    },
  };

  // Animación del título
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Animación de cada estadística
  const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="mx-auto mb-20 max-w-[1440px] px-4 py-12 text-white lg:mb-32"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="mx-auto max-w-6xl">
        {/* Título de la sección */}
        <motion.h2
          className="mb-8 text-center text-base font-semibold lg:text-2xl"
          variants={titleVariants}
        >
          Estadísticas globales {isDebug ? '(Modo de depuración)' : ''}
        </motion.h2>

        {/* Lista de stats */}
        <motion.div
          className="flex flex-col items-center justify-center text-white md:flex-row"
          variants={containerVariants}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="mb-8 w-full px-6 text-center md:mb-0 md:w-1/3"
              variants={statItemVariants}
            >
              {/* Número animado */}
              <p className="mb-2 text-4xl font-bold lg:text-5xl">
                <NumberTicker value={stat.value} />
              </p>
              {/* Etiqueta */}
              <p className="text-sm text-gray-400 lg:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
