import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CarouselProps {
  children?: React.ReactNode;
}

/**
 * Carousel
 * ------------------------------------------------------------
 * Carrusel horizontal muy simple:
 * - Acepta cualquier contenido como children (cards, imágenes, etc.)
 * - Hace loop duplicando los hijos (maps 2 veces)
 * - Auto-play cada 4s
 * - Soporta swipe en mobile
 * - Click en un item → lo lleva a foco
 *
 * Notas:
 * - Está pensado para mostrar 1 card a la vez ocupando ~90% del ancho,
 *   por eso se usa `w-[90%]` y se desplaza en pasos de `90%`.
 * - Si quieres 100% del width, cambia a `w-full` y `x: -${currentIndex * 100}%`.
 */
export default function Carousel({ children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalizamos los hijos a un array
  const items = React.Children.toArray(children);
  const total = items.length;

  /**
   * Auto-play
   * - cada 4s avanzamos 1
   * - hacemos mod sobre `total * 2` porque duplicamos los ítems
   */
  useEffect(() => {
    if (total === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (total * 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  /**
   * Click en un item → lo llevamos a su índice (dentro del loop de 2x)
   */
  const handleImageClick = (index: number) => {
    setCurrentIndex(index % (total * 2));
  };

  /**
   * Swipe en mobile
   * - Escuchamos touchstart en el contenedor
   * - Luego añadimos touchmove/touchend al window
   * - Si deltaX > 50px → consideramos swipe
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchStartX = e.touches[0]?.clientX ?? 0;

    const handleTouchMove = (ev: TouchEvent) => {
      const touchEndX = ev.touches[0]?.clientX ?? 0;
      const deltaX = touchStartX - touchEndX;

      // threshold
      if (Math.abs(deltaX) > 50) {
        setCurrentIndex(
          (prev) => (prev + (deltaX > 0 ? 1 : -1) + total * 2) % (total * 2),
        );
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener(
      'touchend',
      () => {
        window.removeEventListener('touchmove', handleTouchMove);
      },
      { once: true },
    );
  };

  return (
    <div
      className="group overflow-hidden rounded-xl"
      onTouchStart={handleTouchStart}
    >
      <motion.div
        ref={carouselRef}
        className="flex transition-transform duration-500"
        initial={{ x: 0 }}
        // nos movemos en pasos de 90% porque cada item mide 90% del ancho
        animate={{ x: `-${currentIndex * 90}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Duplicamos la lista para simular carrusel infinito */}
        {Array.from({ length: 2 }, (_, pass) =>
          items.map((item, index) => (
            <div
              key={`carousel-item-${pass}-${index}`}
              className="w-[90%] flex-shrink-0"
              onClick={() => handleImageClick(index + total * pass)}
            >
              {item}
            </div>
          )),
        ).flat()}
      </motion.div>
    </div>
  );
}
