'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DownloadResumeCTA() {
  // 📌 Referencia al contenedor para disparar la animación
  const containerRef = useRef<HTMLDivElement>(null);

  // 👀 Detecta cuando el CTA entra al viewport
  const isInView = useInView(containerRef, {
    once: true, // solo una vez
    margin: '-20% 0px -20% 0px', // empieza un poco antes
  });

  // 🎬 Variantes para el contenedor (entrada suave + escalado)
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1, // va mostrando hijos en cascada
        delayChildren: 0.2,
      },
    },
  };

  // 🔖 Badge (RESUMEN)
  const badgeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // 📝 Título principal
  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // 📄 Descripción
  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // 🔘 Botón (un poco de “pop”)
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        // back.out-ish
        ease: [0.68, -0.55, 0.265, 1.55],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="mx-2 mt-60 flex max-w-5xl flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#ef4444cc] to-[#7f1d1d99] p-10 py-16 text-center font-sans text-white md:mx-auto md:w-full"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Etiqueta superior */}
      <motion.div
        className="flex flex-wrap items-center justify-center rounded-full border border-black bg-red-500/10 p-1 text-sm backdrop-blur"
        variants={badgeVariants}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">💼</span>
          <span className="mr-2 text-lg">🚀</span>
          <span className="text-lg">📈</span>
        </div>
        <p className="ml-2 font-medium">RESUMEN</p>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="mt-5 max-w-xl bg-gradient-to-r from-white to-[#000000] bg-clip-text text-4xl font-semibold text-transparent md:text-5xl md:leading-[60px]"
        variants={titleVariants}
      >
        Vea mis credenciales y experiencia
      </motion.h1>

      {/* Descripción */}
      <motion.p
        className="mt-4 max-w-md text-white/80"
        variants={descriptionVariants}
      >
        Descargue mi currículum para conocer más sobre mi experiencia, habilidades y cómo puedo
        ayudarle a darle vida a su próximo proyecto.
      </motion.p>

      {/* Botón de descarga */}
      <motion.a
        href="/L4.docx"
        download
        className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-sm uppercase text-white transition-all hover:bg-black/80"
        variants={buttonVariants}
      >
        Descargar resumen
      </motion.a>
    </motion.div>
  );
}
