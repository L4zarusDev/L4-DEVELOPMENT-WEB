'use client';

import React, { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResponsiveYouTubeProps {
  /** URL o ID de YouTube. Acepta: https://youtube.com/watch?v=ID, https://youtu.be/ID, /embed/ID o solo el ID */
  video: string;
  /** Título accesible para el iframe (recomendado) */
  title?: string;
  /** Si es true, usa el dominio youtube-nocookie.com */
  noCookie?: boolean;
  /** Tiempo de inicio en segundos */
  start?: number;
  /** Autoplay al cargar el iframe (puede ser bloqueado por el navegador) */
  autoplay?: boolean;
  /** Mostrar controles del video (por defecto true) */
  controls?: boolean;
  /** Lazy-load: muestra thumbnail y carga el iframe hasta que el usuario haga click (por defecto true) */
  lazy?: boolean;
  /** Clases extra para el wrapper externo */
  className?: string;
  /** Permitir pantalla completa (por defecto true) */
  allowFullScreen?: boolean;
  /** Clase de max width opcional, ej: "max-w-3xl" */
  maxWidthClass?: string;
}

/**
 * 🎥 ResponsiveYouTube
 *
 * Componente embed de YouTube optimizado:
 * - hace parsing de casi cualquier formato de URL de YouTube
 * - por defecto NO inyecta el iframe (lazy) → muestra thumbnail + botón play
 * - mantiene la relación 16:9 con `aspect-video`
 * - accesible (title + aria-label)
 * - opción de usar `youtube-nocookie.com`
 *
 * Útil cuando quieres meter videos en páginas de marketing, blogs o portfolios
 * sin matar el LCP/FCP.
 */
export default function ResponsiveYouTube({
  video,
  title = 'YouTube video player',
  noCookie = false,
  start,
  autoplay = false,
  controls = true,
  lazy = true,
  className = '',
  allowFullScreen = true,
  maxWidthClass = '',
}: ResponsiveYouTubeProps) {
  // Si lazy = true → empezamos SIN iframe
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [hasError, setHasError] = useState(false);

  /**
   * 1. Normalizamos el ID del video.
   * Aceptamos:
   * - https://youtu.be/ID
   * - https://www.youtube.com/watch?v=ID
   * - https://www.youtube.com/embed/ID
   * - https://www.youtube.com/v/ID
   * - ID plano (abc123)
   */
  const videoId = useMemo(() => {
    if (!video) return '';

    const patterns = [
      /(?:youtu\.be\/)([A-Za-z0-9_-]{6,})/, // youtu.be/ID
      /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{6,})/, // youtube.com/watch?v=ID
      /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/, // youtube.com/embed/ID
      /(?:youtube\.com\/v\/)([A-Za-z0-9_-]{6,})/, // youtube.com/v/ID
      /^([A-Za-z0-9_-]{6,})$/, // ID directo
    ];

    for (const pattern of patterns) {
      const match = video.match(pattern);
      if (match && match[1]) return match[1];
    }

    // fallback: intentar leer ?v= del query
    try {
      const url = new URL(video);
      return url.searchParams.get('v') || '';
    } catch {
      return '';
    }
  }, [video]);

  const embedDomain = noCookie ? 'www.youtube-nocookie.com' : 'www.youtube.com';

  /**
   * 2. Construimos la URL del iframe con los query params limpios
   */
  const iframeSrc = useMemo(() => {
    if (!videoId) return '';

    const params = new URLSearchParams();
    params.set('rel', '0'); // no mostrar videos relacionados de otros canales
    params.set('playsinline', '1');
    params.set('controls', controls ? '1' : '0');
    if (autoplay) params.set('autoplay', '1');
    if (start && Number.isFinite(start)) {
      params.set('start', String(Math.floor(start)));
    }
    params.set('modestbranding', '1');
    params.set('enablejsapi', '1');

    return `https://${embedDomain}/embed/${videoId}?${params.toString()}`;
  }, [videoId, embedDomain, autoplay, controls, start]);

  /**
   * 3. Thumbnail de YouTube
   * - intentamos maxresdefault
   * - si truena (algunos videos no la tienen) → hqdefault
   */
  const thumbnailSrc = useMemo(() => {
    if (!videoId) return '';
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }, [videoId]);

  // Cuando el usuario hace click en el thumbnail → cargamos el iframe
  const onActivate = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Si el thumbnail de alta resolución falla, intentamos hqdefault
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (!img.src.includes('hqdefault.jpg')) {
        img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      } else {
        setHasError(true);
      }
    },
    [videoId],
  );

  // Si no pudimos extraer el ID, mostramos un “estado de error”
  if (!videoId) {
    return (
      <div className={cn('w-full', maxWidthClass, className)}>
        <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
          Invalid YouTube video
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', maxWidthClass, className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {isLoaded ? (
          // === IFRAME REAL ===
          <iframe
            title={title}
            src={iframeSrc}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={allowFullScreen}
            className="absolute inset-0 h-full w-full border-0"
            aria-label={title}
          />
        ) : (
          // === THUMBNAIL + BOTÓN DE PLAY ===
          <>
            {!hasError ? (
              <Image
                src={thumbnailSrc}
                alt={`Thumbnail for video ${videoId}`}
                fill
                className="object-cover"
                onError={handleImageError}
                loading="lazy"
                // no lo optimizamos porque YT ya entrega imagen estática
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Thumbnail unavailable</p>
              </div>
            )}

            <button
              type="button"
              aria-label="Play video"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-transparent"
              onClick={onActivate}
            >
              {/* Play button tipo YouTube con gradiente rojo */}
              <span className="relative flex items-center justify-center transition-all group-hover:scale-110">
                <svg
                  className="h-16 w-16 transition-all group-hover:scale-105"
                  viewBox="0 0 1024 721"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <linearGradient
                      id="youtubeGradient"
                      x1="512.5"
                      y1="1.3"
                      x2="512.5"
                      y2="719.8"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#E52D27" />
                      <stop offset="1" stopColor="#BF171D" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#youtubeGradient)"
                    d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3h-0.4
                      c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5
                      C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3
                      s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5
                      C1023.2,238.9,1013,156.3,1013,156.3z M407,493V206l276,144L407,493z"
                  />
                  <path fill="#FFFFFF" d="M407,493l276-143L407,206V493z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
