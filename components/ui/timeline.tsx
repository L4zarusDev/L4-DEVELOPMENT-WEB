'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  TimelineItem                                             ║
 * ║  - Renderiza UN evento/año del timeline                   ║
 * ║  - Anima cuando entra al viewport                         ║
 * ║  - Muestra el punto rojo + el año + el contenido          ║
 * ╚══════════════════════════════════════════════════════════╝
 */
const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // Detectamos cuando el item es visible para disparar las animaciones
  const isInView = useInView(itemRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  // Contenedor que hace el stagger de los hijos
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.15,
      },
    },
  };

  // Punto central (el "dot" rojo)
  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55], // back.out(1.7)
      },
    },
  };

  // Año / título (lado izq en desktop)
  const yearVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Contenido a la derecha
  const contentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={itemRef}
      className="flex justify-start pt-10 md:gap-10 md:pt-40"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Columna izquierda: punto + año (sticky para efecto "timeline") */}
      <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
        {/* Punto sólido */}
        <motion.div
          className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-900 md:left-3"
          variants={dotVariants}
        >
          <div className="h-4 w-4 rounded-full border border-red-400 bg-red-500" />
        </motion.div>

        {/* Año en desktop */}
        <motion.h3
          className="hidden text-xl font-bold text-red-400 md:block md:pl-20 md:text-5xl"
          variants={yearVariants}
        >
          {item.title}
        </motion.h3>
      </div>

      {/* Columna derecha: contenido */}
      <div className="relative w-full pl-20 pr-4 md:pl-4">
        {/* Año en mobile */}
        <motion.h3
          className="mb-4 block text-left text-2xl font-bold text-red-400 md:hidden"
          variants={yearVariants}
        >
          {item.title}
        </motion.h3>

        <motion.div variants={contentVariants}>{item.content}</motion.div>
      </div>
    </motion.div>
  );
};

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  Timeline                                                ║
 * ║  - Recibe un array de "entries"                          ║
 * ║  - Dibuja la línea central con progreso al hacer scroll  ║
 * ║  - Cada ítem se anima al entrar en viewport              ║
 * ╚══════════════════════════════════════════════════════════╝
 */
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Medimos la altura real del contenedor donde están los items
  // para poder usarla como referencia del "track" del timeline
  useLayoutEffect(() => {
    function measure() {
      if (!innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Progreso de scroll SOLO sobre el bloque del timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // se puede afinar para que el progreso empiece / termine un poco antes
    offset: ['start 10%', 'end 90%'],
  });

  // Transformamos el 0→1 del scroll en altura y opacidad
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-transparent font-sans md:px-10"
    >
      {/* Wrapper con padding lateral */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10" />

      <div ref={innerRef} className="relative mx-auto max-w-7xl pb-20">
        {/* Lista de eventos */}
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Línea base (gris) detrás de los puntos */}
        <div
          className="pointer-events-none absolute left-8 top-0 z-10 w-[2px] overflow-hidden rounded md:left-8"
          style={{
            height: `${height}px`,
            backgroundColor: 'rgba(55,65,81,0.35)', // gray-700/35
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          {/* Línea de progreso (la que “crece” al hacer scroll) */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 w-[2px] rounded-full"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              // gradiente que me pediste: rojo → highlight → rojo → negro
              background: `
                linear-gradient(
                  to top,
                  rgba(127,29,29,0.60) 0%,
                  rgba(185,28,28,0.85) 16%,
                  #ffffff 38%,
                  rgba(239,68,68,0.80) 62%,
                  rgba(0,0,0,0.00) 100%
                )
              `,
              boxShadow: '0 0 16px rgba(239,68,68,0.35)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
