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
import { connectDB } from '@/lib/mongodb';
import Settings from '@/models/Settings';

import PushInit from '@/components/PushInit';
// ─────────────────────────────────────────────────────────────
// BASE URL
// ─────────────────────────────────────────────────────────────
const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://l4zarus.dev'
    : 'http://localhost:3000');

// ─────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://l4zarus.dev'),
  title: {
    default: 'L4 DEVELOPMENT — Software, Web & Growth',
    template: '%s | L4 DEVELOPMENT',
  },
  description:
    'Creamos software y marcas digitales que venden. Webs ultra rápidas, desarrollo a medida y crecimiento en redes.',
  icons: {
    icon: [
      { url: '/L4.png', sizes: '16x16', type: 'image/png' },
      { url: '/L4.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'L4 DEVELOPMENT',
  },
  formatDetection: { telephone: false },
  alternates: {
    canonical: '/',
    languages: { 'es-MX': '/es-MX', en: '/en' },
  },
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
  twitter: {
    card: 'summary_large_image',
    site: '@L4_Dev1',
    creator: '@L4_Dev1',
    title: 'L4 DEVELOPMENT — Software, Web & Growth',
    description:
      'Creamos software y marcas digitales que venden. Webs ultra rápidas, desarrollo a medida y crecimiento en redes.',
    images: ['/images/png/L4 DEVELOPMENT.png'],
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: '#000000' };

// ─────────────────────────────────────────────────────────────
// FUENTES
// ─────────────────────────────────────────────────────────────
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontHandwriting = FontHandwriting({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-handwriting',
});
const MonaLisa = localFont({
  src: '../public/fonts/monolisa/MonoLisa-Regular.ttf',
  variable: '--font-monalisa',
});


// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Carga DB (para modo mantenimiento o configuraciones globales)
  await connectDB();
  const settings = await Settings.findOne({});

  // Hook cliente: activa las notificaciones push


  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-bg-default font-sans antialiased',
          fontSans.variable,
          fontHandwriting.variable,
          MonaLisa.variable
        )}
      >
        <LoadingProvider>
          <LoadingManager />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

              <PushInit />
            <Menu />

            {/* Contenedor principal */}
            <div className="mx-auto max-w-[1440px] bg-transparent px-4 sm:px-6 lg:px-8 mt-12">
              {children}
            </div>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
