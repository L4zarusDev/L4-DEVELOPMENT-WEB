'use client';

import { useState, useEffect } from 'react';

/**
 * ScrollTracker
 *
 * Barra de progreso fija en la parte superior que muestra
 * qué porcentaje del documento has scrolleado.
 *
 * - Escucha el evento `scroll` del window
 * - Calcula: (scrollActual / scrollTotal) * 100
 * - Actualiza el ancho de un div fijo en el top
 *
 * Útil para blogs largos, docs o landing pages extensas.
 */
function ScrollTracker() {
  // porcentaje de scroll (0 → 100)
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // cuánto hemos scrolleado desde arriba
      const totalScroll = document.documentElement.scrollTop;

      // altura total scrollable = alto del documento - alto visible
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // convertir a porcentaje (evita NaN: cuando no hay scroll)
      const scrolled = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;

      setScroll(scrolled);
    };

    // escuchar scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // calcular una vez al montar (por si el usuario ya está abajo)
    handleScroll();

    // limpiar listener al desmontar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="animate-glow fixed left-0 top-0 z-20 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
      style={{ width: `${scroll}%` }}
      aria-label="Progreso de lectura"
      role="progressbar"
      aria-valuenow={Math.round(scroll)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default ScrollTracker;
