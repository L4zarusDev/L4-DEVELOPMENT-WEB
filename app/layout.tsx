// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import {
  Inter as FontSans,
  La_Belle_Aurore as FontHandwriting,
} from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import { cn } from '@/lib/utils';

import Menu from '@/components/Hero/Menu/Menu';
import { ThemeProvider } from 'next-themes';
import { LoadingProvider } from '@/lib/context/LoadingContext';
import { LoadingManager } from '@/components/LoadingManager';

// SEO / JSON-LD
import JsonLd from '@/components/SEO/JsonLd';
import { buildOrganization, buildWebsite } from '@/components/SEO/builders';

/* ─────────────────────────────────────────────────────────────
   BASE URL
   - Se intenta usar la env pública
   - Si no, se cae en prod o en localhost
   - Úsala en OG, JSON-LD, sitemap, etc.
   ───────────────────────────────────────────────────────────── */
const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://l4zarus.dev'
    : 'http://localhost:3000');

/* ─────────────────────────────────────────────────────────────
   METADATA
   - Title por defecto + template
   - OG / Twitter cards
   - Alternates (multi idioma)
   - Robots
   ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // Base para construir URLs absolutas
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://l4zarus.dev',
  ),

  title: {
    default: 'L4 DEVELOPMENT — Software, Web & Growth',
    template: '%s | L4 DEVELOPMENT',
  },

  description:
    'Creamos software y marcas digitales que venden. Webs ultra rápidas (SEO/Conversión), desarrollo a medida y crecimiento en redes. Haz despegar tu producto en 30 días.',

  icons: {
    icon: [
      { url: '/L4.png', sizes: '16x16', type: 'image/png' },
      { url: '/L4.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },

  manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'L4 DEVELOPMENT',
  },

  formatDetection: {
    telephone: false,
  },

  // Canonical + versiones por idioma
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/es-MX',
      en: '/en',
    },
  },

  // Reglas para bots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (para Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    url: 'https://l4zarus.dev',
    siteName: 'L4 DEVELOPMENT',
    title: 'L4 DEVELOPMENT — Software, Web & Growth',
    description:
      'Creamos software y marcas digitales que venden. Webs ultra rápidas (SEO/Conversión), desarrollo a medida y crecimiento en redes.',
    images: [
      {
        url: '/images/png/portfolio-preview.png',
        width: 1200,
        height: 630,
        alt: 'L4 DEVELOPMENT — Portfolio & Servicios',
      },
    ],
    locale: 'es_MX',
  },

  // Twitter / X cards
  twitter: {
    card: 'summary_large_image',
    site: '@L4_Dev1', // 👈 cámbialo cuando tengas el usuario real
    creator: '@L4_Dev1',
    title: 'L4 DEVELOPMENT — Software, Web & Growth',
    description:
      'Creamos software y marcas digitales que venden. Webs ultra rápidas (SEO/Conversión), desarrollo a medida y crecimiento en redes.',
    images: ['/images/png/L4 DEVELOPMENT.png'],
  },

  // Verificación de Search Console (opcional)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

/* ─────────────────────────────────────────────────────────────
   JSON-LD (datos estructurados)
   - Organización
   - Sitio web
   ───────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────
   VIEWPORT
   - Tema por defecto blanco (Safari, iOS)
   ───────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

/* ─────────────────────────────────────────────────────────────
   FUENTES
   - Sans para el texto
   - Handwriting para detalles
   - Local (MonoLisa) para código o toques especiales
   ───────────────────────────────────────────────────────────── */
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHandwriting = FontHandwriting({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-handwriting',
});

const MonaLisa = localFont({
  src: '../public/fonts/monolisa/MonoLisa-Regular.ttf',
  variable: '--font-monalisa',
});

/* ─────────────────────────────────────────────────────────────
   ROOT LAYOUT
   - Aquí van los providers globales
   - Menu fijo
   - Contenedor principal
   - Inyección de JSON-LD
   ───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-bg-default font-sans antialiased',
          fontSans.variable,
          fontHandwriting.variable,
          MonaLisa.variable,
        )}
      >
        {/* Contexto global de “estoy cargando” */}
        <LoadingProvider>
          {/* Overlay / barra / indicador de carga */}
          <LoadingManager />

          {/* ThemeProvider permite alternar light/dark vía class en <html> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Menú global superior */}
            <Menu />

            {/* Contenedor principal de la página */}
            <div className="mx-auto max-w-[1440px] bg-transparent px-4 sm:px-6 lg:px-8">
              {children}
            </div>

            {/* Inyección de datos estructurados para SEO */}

          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
