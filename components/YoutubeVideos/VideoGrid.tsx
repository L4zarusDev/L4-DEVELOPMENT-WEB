// ============================================================================
// 🧩 componente extra
// VideoGrid
// - Obtiene los últimos videos desde tu endpoint `/api/youtube/videos`
// - Mapea cada video a una tarjeta responsiva con imagen, título y vistas
// - Usa GSAP + ScrollTrigger para animar la entrada de las tarjetas al hacer
//   scroll (staggered / una por una)
// - Incluye un skeleton mientras se cargan los videos
// - Pensado para colocarlo dentro de una sección de “Contenido / YouTube”
// ============================================================================

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VideoItem {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  viewCount: number;
  publishedAt: string;
}

/**
 * Formatea un número de vistas a algo más legible:
 * 1,234 → 1.2K, 1,200,000 → 1.2M
 */
const formatViewCount = (views: number): string => {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }
  return views.toString();
};

/**
 * Tarjeta individual de video
 * - Recibe los datos del video
 * - Muestra thumbnail + título + vistas
 * - Abre el video en YouTube en una nueva pestaña
 * - Tiene un overlay y scale on hover
 */
const VideoCard: React.FC<VideoItem> = ({
  title,
  imageUrl,
  videoUrl,
  viewCount,
}) => (
  <Link
    href={videoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group/bento relative w-full overflow-hidden rounded-lg"
    data-gsap="video-card"
  >
    {/* capa oscura al hacer hover */}
    <div className="absolute inset-0 h-full w-full rounded-lg bg-black opacity-0 transition-all duration-200 group-hover/bento:opacity-30" />

    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all duration-200 group-hover/bento:scale-105"
      />

      {/* degradado para que el texto se lea mejor */}
      <div className="absolute inset-x-0 bottom-0 h-2/4 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 flex-1 text-sm font-medium text-white">
            {title}
          </h3>
          <span className="mt-0.5 whitespace-nowrap text-xs text-gray-300">
            {formatViewCount(viewCount)} views
          </span>
        </div>
      </div>
    </div>
  </Link>
);

/**
 * Función que llama a tu API interna.
 * - Devuelve un array de VideoItem
 * - Si falla, devuelve un array vacío para no romper el render
 */
async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const response = await fetch('/api/youtube/videos');
    if (!response.ok) throw new Error('Failed to fetch videos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default function VideoGrid() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1) Traer videos al montar
  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, []);

  // 2) Animaciones GSAP cuando ya hay videos
  useGSAP(
    () => {
      if (loading || videos.length === 0) return;

      // Registrar plugin
      gsap.registerPlugin(ScrollTrigger);

      // Estado inicial de las cards
      gsap.set('[data-gsap="video-card"]', { opacity: 0, y: 40 });

      // Animación en cascada (stagger)
      gsap.to('[data-gsap="video-card"]', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.3, // 0.3s entre cada card
        scrollTrigger: {
          trigger: '[data-gsap="video-card"]',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });
    },
    // Re-ejecuta si cambia el estado de carga o el listado de videos
    [loading, videos],
  );

  // 3) Skeleton simple mientras carga
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video w-full animate-pulse rounded-lg bg-gray-800"
          />
        ))}
      </div>
    );
  }

  // 4) Grid final con máximo 9 videos
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.slice(0, 9).map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
