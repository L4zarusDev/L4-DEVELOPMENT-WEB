// ============================================================================
// 🧩 componente extra
// ScrollingTestimonials
// - Lista de testimonios (comentarios tipo YouTube) que se mueven en bucle
// - Incluye animación de entrada con GSAP + ScrollTrigger
// - Mobile: 1 columna con marquee vertical
// - Desktop: 3 columnas con velocidades distintas para dar sensación de “vivo”
// - Usa <SectionHeading /> y el tipo CommentData que definiste antes
// ============================================================================

'use client';

import React from 'react';
import Image from 'next/image';
import { CommentData } from './CommentData';
import SectionHeading from '../SectionHeading';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Tarjeta individual de testimonio.
 * - Muestra avatar, nombre, handle y comentario.
 * - Si isYouTuber = true, dibuja el badge tipo YouTube.
 */
const TestimonialCard: React.FC<CommentData> = ({
  username,
  handle,
  avatarUrl,
  comment,
  isYouTuber,
}) => (
  <div className="mb-4 rounded-lg border-[1px] border-white/10 bg-gray-600/20 p-4">
    {/* Header con avatar + nombre + handle + badge opcional */}
    <div className="mb-2 flex items-center">
      <div className="flex min-w-0 flex-grow items-center">
        <Image
          src={avatarUrl}
          alt={`Avatar de ${username}`}
          width={40}
          height={40}
          className="mr-4 select-none rounded-full"
        />
        <div className="min-w-0 flex-shrink">
          <p className="truncate font-semibold text-white">{username}</p>
          <p className="truncate text-sm text-gray-400">{handle}</p>
        </div>
      </div>

      {/* Badge tipo “canal verificado / YouTuber” */}
      {isYouTuber && (
        <div className="ml-2 flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="YouTuber"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      )}
    </div>

    {/* Cuerpo del comentario */}
    <p className="text-white">{comment}</p>
  </div>
);

const ScrollingTestimonials: React.FC<{ testimonials: CommentData[] }> = ({
  testimonials,
}) => {
  /**
   * Separa el array de testimonios en 3 grupos del mismo tamaño (o casi),
   * para poder pintarlos en 3 columnas independientes.
   */
  const splitTestimonials = (testis: CommentData[]): CommentData[][] => {
    const third = Math.ceil(testis.length / 3);
    return [
      testis.slice(0, third),
      testis.slice(third, 2 * third),
      testis.slice(2 * third),
    ];
  };

  const [group1, group2, group3] = splitTestimonials(testimonials);

  // Animación de entrada cuando la sección entra al viewport
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Estado inicial (invisibles / desplazados)
    gsap.set('[data-gsap="testimonials-heading"]', { opacity: 0, y: 20 });
    gsap.set('[data-gsap="testimonials-subheading"]', { opacity: 0, y: 25 });
    gsap.set('[data-gsap="testimonials-grid"]', { opacity: 0, y: 30 });

    // Timeline con ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-gsap="testimonials-heading"]',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    });

    tl.to('[data-gsap="testimonials-heading"]', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      .to(
        '[data-gsap="testimonials-subheading"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3',
      )
      .to(
        '[data-gsap="testimonials-grid"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2',
      );
  });

  return (
    <div className="3xl:max-w-[1440px] mx-auto mt-32 overflow-hidden py-16 lg:max-w-[1100px]">
      {/* Encabezado de la sección */}
      <SectionHeading
        heading="Amado por miles de personas"
        subheading="Esto es lo que algunos de mis espectadores tienen que decir sobre L4 DEVELOPMENT"
        animationId="testimonials"
      />

      <div className="relative">
        {/* Grid principal que se anima con GSAP */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          data-gsap="testimonials-grid"
        >
          {/* ────────────────────────────────────────────
              MÓVIL: una sola columna con marquee infinito
             ──────────────────────────────────────────── */}
          <div
            className="marquee-slow h-[600px] overflow-hidden px-10 md:hidden"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            }}
          >
            <div className="animate-marquee">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} />
              ))}

              {/* Duplicamos para que el scroll sea continuo */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`dup-m-${i}`} {...testimonial} />
              ))}
            </div>
          </div>

          {/* ────────────────────────────────────────────
              DESKTOP: 3 columnas, cada una con su velocidad
             ──────────────────────────────────────────── */}
          {[group1, group2, group3].map((group, index) => (
            <div
              key={index}
              className={`hidden h-[600px] overflow-hidden md:block ${
                index === 1 ? 'marquee-slow' : 'marquee-fast'
              }`}
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              }}
            >
              <div className="animate-marquee">
                {group.map((testimonial, i) => (
                  <TestimonialCard key={i} {...testimonial} />
                ))}

                {/* Duplicado para loop infinito */}
                {group.map((testimonial, i) => (
                  <TestimonialCard key={`dup-d-${index}-${i}`} {...testimonial} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTA:
          - Las clases .marquee-slow, .marquee-fast y .animate-marquee
            deben existir en tu global.css con la animación vertical.
          - Ejemplo rápido:
              .animate-marquee {
                animation: marquee 18s linear infinite;
              }
              @keyframes marquee {
                0%   { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
      */}
    </div>
  );
};

export default ScrollingTestimonials;
