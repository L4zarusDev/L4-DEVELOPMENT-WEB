// ============================================================================
// 🧩 componente extra
// YoutubeVideos
// - Sección completa con heading + grid animada de videos de YouTube
// - Usa framer-motion para hacer fade-in/slide-up cuando entra al viewport
// - Reutiliza <VideoGrid /> que ya trae los videos desde /api/youtube/videos
// - Ideal para poner en tu landing como “Contenido / YouTube / Streams”
// ============================================================================

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VideoGrid from './VideoGrid';
import SectionHeading from '../SectionHeading';

export default function YoutubeVideos() {
  // Ref del contenedor que queremos observar
  const gridRef = useRef<HTMLDivElement>(null);

  // Detecta cuando el grid entra a viewport
  const isInView = useInView(gridRef, {
    once: true, // solo la primera vez
    margin: '-20% 0px -20% 0px', // dispara un poco antes
  });

  // Variantes del contenedor: fade + slide
  const gridVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // similar a power2.out
      },
    },
  };

  return (
    <div id="videos" className="px-8">
      {/* Título y subtítulo reutilizando tu SectionHeading */}
      <SectionHeading
        heading="Visto por miles de personas"
        subheading="Transmisión en vivo semanal: WordPress, IA, Next.js, React, PHP, startups, flujos de trabajo de IA, Neovim"
        animationId="videos"
      />

      {/* Grid animado */}
      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={gridVariants}
      >
        <VideoGrid />
      </motion.div>
    </div>
  );
}
