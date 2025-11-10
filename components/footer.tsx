import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 🔗 Iconos de redes (importados como SVG locales)
import GithubLogo from '@/public/images/svg/Github-Logo.svg';
import InstagramLogo from '@/public/images/svg/Instagram-Logo.svg';
import LinkedinLogo from '@/public/images/svg/LinkedIn-Logo.svg';
import TiktokLogo from '@/public/images/svg/Tiktok-Logo.svg';
import TwitterLogo from '@/public/images/svg/X-Twitter-Logo.svg';
import YouTubeLogo from '@/public/images/svg/Youtube-Logo.svg';

/**
 * Footer
 * - Muestra navegación inferior (links internos como "Contactar", "Tienda", etc.)
 * - Muestra iconos de redes sociales con sus enlaces
 * - Año dinámico con copyright
 *
 * Notas:
 * - Puedes pasar tus @ reales en los href de las redes.
 * - El fondo usa `bg-bg-default`: asegúrate de tener esa clase en tu tema Tailwind,
 *   si no existe, cámbiala por `bg-black` o `bg-neutral-950`.
 */
export function Footer() {
  // Año dinámico — así no lo tienes que cambiar cada año
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-bg-default px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        {/* ▸ Navegación secundaria / enlaces rápidos */}
        <nav className="mb-8 flex justify-center space-x-6 text-sm md:text-base">
          <Link
            href="/discord"
            className="transition-colors hover:text-gray-300"
          >
            Discord
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-gray-300"
          >
            Contactar
          </Link>
          <Link
            href="/hire"
            className="transition-colors hover:text-gray-300"
          >
            Contrátame
          </Link>
          <Link
            href="/shop"
            className="transition-colors hover:text-gray-300"
          >
            Tienda
          </Link>
        </nav>

        {/* ▸ Redes sociales */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-6">
            {/* X / Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="X / Twitter"
            >
              <Image
                src={TwitterLogo}
                alt="X / Twitter Logo"
                width={40}
                height={40}
              />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="YouTube"
            >
              <Image
                src={YouTubeLogo}
                alt="YouTube Logo"
                width={40}
                height={40}
              />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="GitHub"
            >
              <Image
                src={GithubLogo}
                alt="GitHub Logo"
                width={40}
                height={40}
              />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="Instagram"
            >
              <Image
                src={InstagramLogo}
                alt="Instagram Logo"
                width={40}
                height={40}
              />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="TikTok"
            >
              <Image
                src={TiktokLogo}
                alt="TikTok Logo"
                width={40}
                height={40}
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center transition hover:scale-105"
              aria-label="LinkedIn"
            >
              <Image
                src={LinkedinLogo}
                alt="LinkedIn Logo"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>

        {/* ▸ Copyright */}
        <p className="mt-8 text-center text-sm text-white/70">
          © {currentYear} L4 DEV. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
