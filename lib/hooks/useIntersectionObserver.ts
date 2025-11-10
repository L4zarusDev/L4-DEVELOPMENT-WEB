// lib/hooks/useIntersectionObserver.ts
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Options = Omit<IntersectionObserverInit, 'root'> & {
  /**
   * Nodo raíz para el observer.
   * Si no se pasa, usa el viewport (null).
   */
  root?: Element | Document | null;
};

/**
 * useIntersectionObserver
 *
 * Hook reutilizable para saber cuándo **un elemento entra o sale del viewport** (o de otro contenedor).
 * Muy útil para:
 * - disparar animaciones on-scroll (Framer Motion, GSAP, etc.)
 * - lazy-load de imágenes o componentes pesados
 * - counters que arrancan al hacerse visibles
 *
 * ✅ Devuelve:
 * - `ref`: lo pones en el elemento que quieres observar
 * - `entry`: la última IntersectionObserverEntry
 * - `isIntersecting`: booleano directo para no pelearte con entry
 *
 * 🛟 freezeOnceVisible:
 * - si lo pones en `true`, en cuanto el elemento se vea una vez
 *   deja de observar (ideal para animaciones que solo deben correr 1 vez).
 */
export function useIntersectionObserver(
  {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  }: Options & { freezeOnceVisible?: boolean } = {},
) {
  // Última entry recibida del observer
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  // Booleano cómodo para el componente
  const [isIntersecting, setIsIntersecting] = useState(false);

  /**
   * Ref que el usuario pondrá en el elemento a observar.
   * 👇 lo inicializamos en `null` y lo tipamos a Element | null
   */
  const elementRef = useRef<Element | null>(null);

  /**
   * Si ya se intersectó y queremos “congelar”, no seguimos observando.
   */
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  /**
   * Actualiza el estado con la nueva entry.
   * Lo memorizamos para que el efecto no se vuelva a crear sin necesidad.
   */
  const updateEntry = useCallback((e: IntersectionObserverEntry) => {
    setEntry(e);
    setIsIntersecting(e.isIntersecting);
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    // Si no hay nodo aún o ya congelamos, no creamos observer
    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      (entries) => updateEntry(entries[0]),
      {
        threshold,
        // root puede ser Element | Document | null
        root: (root as Element | Document | null) ?? null,
        rootMargin,
      },
    );

    observer.observe(node);

    // Limpieza
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, frozen, updateEntry]);

  return { ref: elementRef, entry, isIntersecting };
}
