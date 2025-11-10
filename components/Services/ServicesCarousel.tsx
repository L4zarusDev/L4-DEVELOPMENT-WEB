'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ServiceCard, { Service } from './ServiceCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const GAP_PX = 32;

interface ServicesCarouselProps {
  services: Service[];
  // 👉 el padre lo usa para abrir el modal de paquetes
  onOpenPackages?: (service: Service) => void;
}

export default function ServicesCarousel({
  services,
  onOpenPackages,
}: ServicesCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  // triplicamos el array para el loop
  const tripled = useMemo(
    () => [...services, ...services, ...services],
    [services],
  );
  const baseLen = services.length;
  const stepSlides = 1;

  const getSlideWidth = useCallback(() => {
    const node = slideRef.current;
    if (!node) return 0;
    return Math.round(node.getBoundingClientRect().width + GAP_PX);
  }, []);

  const jumpToMiddleStart = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    el.scrollTo({ left: baseLen * w, behavior: 'auto' });
  }, [baseLen, getSlideWidth]);

  const normalizeIfNeeded = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const currentIndexFloat = el.scrollLeft / w;
    let currentIndex = Math.round(currentIndexFloat);

    if (currentIndex < baseLen - 4) {
      currentIndex += baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    } else if (currentIndex >= 2 * baseLen + 4) {
      currentIndex -= baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    }
  }, [baseLen, getSlideWidth]);

  const updateButtons = useCallback(() => {
    setCanPrev(true);
    setCanNext(true);
  }, []);

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

  const scrollBySlides = (dir: 'left' | 'right', slides = stepSlides) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const delta = dir === 'left' ? -w * slides : w * slides;
    el.scrollBy({ left: delta, behavior: 'smooth' });

    window.setTimeout(() => {
      normalizeIfNeeded();
    }, 380);
  };

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
      {/* fades laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-black to-transparent" />

      {/* flecha izquierda */}
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

      {/* flecha derecha */}
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

      {/* track */}
      <div
        ref={scrollerRef}
        className="no-scrollbar relative z-10 flex justify-center gap-8 overflow-x-auto scroll-px-6 px-12 py-2 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {tripled.map((svc, idx) => (
          <div
            key={`${svc.title}-${idx}`}
            className="w-[88vw] shrink-0 snap-start sm:w-[540px] md:w-[calc(50%-16px)] lg:w-[calc(50%-16px)]"
            ref={idx === baseLen ? slideRef : undefined}
          >
            {/* 👇 aquí va el fix: props “planchadas” + callback */}
            <ServiceCard {...svc} onOpenPackages={onOpenPackages} />
          </div>
        ))}
      </div>
    </div>
  );
}
