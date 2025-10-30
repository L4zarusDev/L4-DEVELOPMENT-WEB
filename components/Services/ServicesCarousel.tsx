'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ServiceCard, { Service } from './ServiceCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const GAP_PX = 32; // tailwind gap-8 = 2rem ≈ 32px

/**
 * ServicesCarousel
 * ------------------------------------------------------------
 * Carrusel horizontal infinito (fake-loop) para las cards de servicio.
 *
 * ¿Cómo funciona el loop?
 * - Triplicamos el array: [A B C | A B C | A B C]
 * - Te colocamos en el bloque del medio
 * - Cuando te acercas demasiado a la izquierda o a la derecha
 *   te "saltamos" silenciosamente al bloque central para que parezca infinito
 *
 * Características:
 * - Soporta teclado (← →)
 * - Flechas a los lados
 * - Responsive: 1 card en mobile, 2 en md+
 * - Hide scrollbar (opcional, ver comentario de abajo)
 */
export default function ServicesCarousel({ services }: { services: Service[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null); // medimos una sola card para saber el ancho real
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  // Triplicamos para tener margen de loop
  const tripled = useMemo(
    () => [...services, ...services, ...services],
    [services],
  );
  const baseLen = services.length;

  // Cuántos slides avanza cada click
  const stepSlides = 1;

  // Obtiene el ancho de una slide + gap
  const getSlideWidth = useCallback(() => {
    const node = slideRef.current;
    if (!node) return 0;
    return Math.round(node.getBoundingClientRect().width + GAP_PX);
  }, []);

  // Mover el scroll al inicio del bloque central (posición baseLen)
  const jumpToMiddleStart = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    el.scrollTo({ left: baseLen * w, behavior: 'auto' });
  }, [baseLen, getSlideWidth]);

  /**
   * Normaliza posición si nos salimos mucho por izq/der.
   * Esto es lo que mantiene la ilusión del carrusel infinito.
   */
  const normalizeIfNeeded = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const currentIndexFloat = el.scrollLeft / w;
    let currentIndex = Math.round(currentIndexFloat);

    // si estamos demasiado a la izquierda → saltamos al centro
    if (currentIndex < baseLen - 4) {
      currentIndex += baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    }
    // si estamos demasiado a la derecha → saltamos al centro
    else if (currentIndex >= 2 * baseLen + 4) {
      currentIndex -= baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    }
  }, [baseLen, getSlideWidth]);

  // En loop siempre hay prev/next
  const updateButtons = useCallback(() => {
    setCanPrev(true);
    setCanNext(true);
  }, []);

  // Setup inicial + listeners
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const init = () => {
      jumpToMiddleStart();
      updateButtons();
    };

    init();

    const onScroll = () => {
      normalizeIfNeeded();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
    };
  }, [jumpToMiddleStart, normalizeIfNeeded, updateButtons]);

  // Scroll programático por N slides
  const scrollBySlides = (dir: 'left' | 'right', slides = stepSlides) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const delta = dir === 'left' ? -w * slides : w * slides;
    el.scrollBy({ left: delta, behavior: 'smooth' });

    // después del smooth, re-normalizamos
    window.setTimeout(() => {
      normalizeIfNeeded();
    }, 380);
  };

  // soporte teclado
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scrollBySlides('left');
    if (e.key === 'ArrowRight') scrollBySlides('right');
  };

  return (
    <div
      className="relative mx-auto max-w-7xl"
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Carrusel de servicios"
    >
      {/* Degradados laterales para “fade” */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-black to-transparent" />

      {/* Flecha izquierda */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex items-center pl-2">
        <button
          type="button"
          aria-label="Anterior"
          disabled={!canPrev}
          onClick={() => scrollBySlides('left')}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow transition hover:bg-transparent hover:text-white hover:shadow-alt-cta disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Flecha derecha */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center pr-2">
        <button
          type="button"
          aria-label="Siguiente"
          disabled={!canNext}
          onClick={() => scrollBySlides('right')}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow transition hover:bg-transparent hover:text-white hover:shadow-alt-cta disabled:opacity-40"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Track / lista de cards */}
      <div
        ref={scrollerRef}
        className="no-scrollbar relative z-10 flex justify-center gap-8 overflow-x-auto scroll-px-6 px-12 py-2 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {tripled.map((svc, idx) => (
          <div
            key={`${svc.title}-${idx}`}
            className="snap-start w-[88vw] shrink-0 sm:w-[540px] md:w-[calc(50%-16px)] lg:w-[calc(50%-16px)]"
            // medimos sólo el primer slide del bloque medio
            ref={idx === baseLen ? slideRef : undefined}
          >
            <ServiceCard {...svc} />
          </div>
        ))}
      </div>
    </div>
  );
}

/*
CSS opcional para ocultar la barra de scroll (pónlo en globals.css):

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/
