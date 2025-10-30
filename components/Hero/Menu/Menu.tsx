'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import SVGGradientBg from '../SVGGradientBg';
import GithubLogo from '../../../public/images/svg/Github-Logo.svg';
import InstagramLogo from '../../../public/images/svg/Instagram-Logo.svg';
import LinkedinLogo from '../../../public/images/svg/LinkedIn-Logo.svg';
import TiktokLogo from '../../../public/images/svg/Tiktok-Logo.svg';
import TwitterLogo from '../../../public/images/svg/X-Twitter-Logo.svg';
import YouTubeLogo from '../../../public/images/svg/Youtube-Logo.svg';
import clsx from 'clsx';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  isActive: boolean;
}

/**
 * Menú principal
 * - Header superior con logo + botón GitHub
 * - Nav sticky centrado que se oculta al hacer scroll down y aparece al hacer scroll up
 * - Menú mobile con panel deslizante (Headless UI)
 * - Incluye links sociales en el menú mobile
 */
export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // visibilidad del nav centrado
  const [lastScrollY, setLastScrollY] = useState(0);

  // menú desktop inicial
  const [navMenu, setNavMenu] = useState<NavItem[]>([
    { name: 'Inicio', href: '/', isActive: true },
    { name: 'Servicios', href: '/#services', isActive: false },
    { name: 'Info', href: '/#about', isActive: false },
    { name: 'Contacto', href: '/#contact', isActive: false },
    // { name: 'Blog', href: '/posts', isActive: false },
  ]);

  // Marca un item como activo
  const setActiveNavItem = (selectedName: string) => {
    setNavMenu((prev) =>
      prev.map((item) => ({
        ...item,
        isActive: item.name === selectedName,
      })),
    );
  };

  // Mostrar/ocultar barra sticky según scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar si sube o está cerca del top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Ocultar si baja y ya pasó cierto umbral
        setIsVisible(false);
        setMobileMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Header superior (logo + botón) */}
      <header className="absolute inset-x-0 top-0 z-40">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link className="flex items-center gap-2" href="/">
              <Image src="/images/png/L4.png" alt="Logo" width={25} height={25} />
              <div className="text-lg font-semibold text-white">L4.Dev</div>
            </Link>
          </div>

          {/* Botón de menú mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Abrir menú principal</span>
              <Bars3Icon aria-hidden="true" className="h-10 w-10 text-white" />
            </button>
          </div>

          {/* Acción principal en desktop (GitHub) */}
          <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end">
            <a
              href="https://github.com/L4zarusDev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full px-6 py-3 text-center text-sm text-white shadow-alt-cta transition-all hover:bg-white hover:text-black hover:shadow-cta xl:px-8 xl:py-3 xl:text-base"
            >
              <Image
                src={GithubLogo}
                alt="GitHub Logo"
                width={20}
                height={20}
                className="transition-all group-hover:brightness-0"
              />
              GitHub
            </a>
          </div>
        </nav>
      </header>

      {/* Menú sticky centrado (sólo desktop) */}
      <div
        className={`
          fixed inset-x-0 top-3 z-50 mx-auto hidden max-w-2xl lg:flex lg:items-center lg:justify-center
          transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-16 scale-95 opacity-0 pointer-events-none'}
        `}
        style={{
          transitionProperty: 'transform, opacity, scale',
          transitionTimingFunction: isVisible
            ? 'cubic-bezier(0.16, 1, 0.3, 1)'
            : 'cubic-bezier(0.7, 0, 0.84, 0)',
        }}
      >
        <nav
          className="relative flex justify-center space-x-8 rounded-full border border-white/20 bg-white/10 px-10 py-4 shadow-lg backdrop-blur-md"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {navMenu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveNavItem(item.name)}
              className={clsx(
                'px-4 py-2 text-white/90 transition-all duration-200 hover:text-white',
                item.isActive
                  ? 'rounded-full bg-white/20 text-white font-medium'
                  : 'hover:bg-white/10',
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Menú mobile (slide-in) */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        {/* overlay clickeable */}
        <div className="fixed inset-0 z-50" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bg-default px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="relative z-50">
            {/* header del panel mobile */}
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">L4.Dev</span>
                <div className="flex items-center gap-2">
                  <Image src="/images/png/L4.png" alt="Logo" width={25} height={25} />
                  <div className="text-lg font-semibold text-white">L4.Dev</div>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon aria-hidden="true" className="h-10 w-10 text-white" />
              </button>
            </div>

            {/* links del panel mobile */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* navegación principal */}
                <div className="space-y-2 py-6 text-center">
                  {navMenu.map((item) => (
                    <a
                      key={item.name + 1}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-3xl leading-7 text-white transition-all hover:bg-gray-50/20"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* separador */}
                <div className="flex flex-1 items-center justify-center">
                  <div className="h-[2px] w-[70vw] bg-white/100" />
                </div>

                {/* enlaces sociales */}
                <div className="mt-10 grid gap-10">
                  <div className="flex flex-1 items-center justify-center gap-10">
                    <a href="https://twitter.com/L4_Dev1" target="_blank" rel="noopener noreferrer">
                      <Image src={TwitterLogo} alt="X/Twitter Logo" width={50} height={50} />
                    </a>
                    <a
                      className="grid items-center"
                      href="https://www.youtube.com/@"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={YouTubeLogo} alt="YouTube Logo" width={50} height={50} />
                    </a>
                    <a href="https://github.com/L4zarusDev" target="_blank" rel="noopener noreferrer">
                      <Image src={GithubLogo} alt="Github Logo" width={50} height={50} />
                    </a>
                  </div>

                  <div className="flex justify-center gap-10">
                    <a
                      href="https://www.instagram.com/l4.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid items-center"
                    >
                      <Image src={InstagramLogo} alt="Instagram Logo" width={50} height={50} />
                    </a>
                    <a href="https://www.tiktok.com/@" target="_blank" rel="noopener noreferrer">
                      <Image src={TiktokLogo} alt="TikTok Logo" width={50} height={50} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid items-center"
                    >
                      <Image src={LinkedinLogo} alt="Linkedin Logo" width={50} height={50} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fondo SVG decorativo */}
          <SVGGradientBg />
        </DialogPanel>
      </Dialog>
    </div>
  );
}
