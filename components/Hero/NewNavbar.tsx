'use client';

import React, { useState, useEffect } from 'react';
import { HoveredLink, Menu, MenuItem } from '../ui/navbar-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * NewNavbar
 * ------------------------------------------------------------
 * Wrapper sencillo para el navbar sticky centrado.
 * Lo separamos por si quieres usarlo condicionalmente en páginas.
 */
export function NewNavbar() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

/**
 * Navbar
 * ------------------------------------------------------------
 * - Fijo y centrado (tipo “floating nav”)
 * - Se oculta al hacer scroll hacia abajo y aparece al subir
 * - Usa un menú compuesto (Menu, MenuItem, HoveredLink)
 * - Cierra dropdowns cuando se oculta por scroll
 */
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null); // qué item está abierto
  const [isVisible, setIsVisible] = useState(true); // mostrar/ocultar barra
  const [lastScrollY, setLastScrollY] = useState(0); // posición anterior

  // Mostrar / ocultar según scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // subiendo o cerca del top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // bajando y ya pasamos 100px
        setIsVisible(false);
        setActive(null); // cierra dropdown si estaba abierto
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        // base
        'fixed inset-x-0 top-10 z-50 mx-auto hidden max-w-2xl transition-all duration-500 ease-out md:block',
        // visible / oculto
        isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : '-translate-y-16 scale-95 opacity-0 pointer-events-none',
        className,
      )}
      style={{
        transitionProperty: 'transform, opacity, scale',
        transitionTimingFunction: isVisible
          ? 'cubic-bezier(0.16, 1, 0.3, 1)'
          : 'cubic-bezier(0.7, 0, 0.84, 0)',
      }}
    >
      <Menu setActive={setActive}>
        {/* Link directo */}
        <Link
          href="/"
          className="cursor-pointer rounded-full px-4 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          Inicio
        </Link>

        {/* Dropdown “About” */}
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex min-w-[120px] flex-col space-y-3 text-sm">
            <HoveredLink href="/#about">Info</HoveredLink>
          </div>
        </MenuItem>

        {/* Dropdown “Projects” → lo usamos para servicios + github */}
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="flex min-w-[120px] flex-col space-y-3 text-sm">
            <HoveredLink href="/#services">Servicios</HoveredLink>
            <HoveredLink href="https://github.com/L4zarusDev">
              GitHub
            </HoveredLink>
          </div>
        </MenuItem>

        {/* Dropdown “Blog” */}
        <MenuItem setActive={setActive} active={active} item="Blog">
          <div className="flex min-w-[100px] flex-col space-y-3 text-sm">
            <HoveredLink href="/posts">Todas las publicaciones</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
