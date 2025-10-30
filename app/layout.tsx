// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

// Providers / context que ya tienes
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { LoadingManager } from "@/components/LoadingManager";

// UI globales tuyas
import ScrollTracker from "@/components/ScrollTracker";
import ResponsiveGodRays from "@/components/ResponsiveGodRays";
import DebugNoticeModal from "@/components/DebugNoticeModal";
import NoiseTexture from "@/components/NoiseTexture";

// si tienes un ThemeProvider tipo shadcn
import { ThemeProvider } from "@/components/theme-provider";

// tu componente de JSON-LD (asumo esta ruta)
import { JsonLd } from "@/components/JsonLd";

// fuentes (si las usas, ajústalo a tu proyecto)
// import { inter } from "@/lib/fonts";

// -----------------------------------------------------------------------------
// Metadata básica del sitio
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "L4 DEVELOPMENT | l4zarus.dev",
  description:
    "Desarrollo web moderno, IA aplicada y productos digitales. Next.js, React, TypeScript, WordPress, integraciones, dashboards y más.",
  metadataBase: new URL("https://l4zarus.dev"),
  openGraph: {
    title: "L4 DEVELOPMENT",
    description: "Desarrollo web moderno e IA aplicada.",
    url: "https://l4zarus.dev",
    siteName: "L4 DEVELOPMENT",
    images: [
      {
        url: "https://l4zarus.dev/og.png",
        width: 1200,
        height: 630,
        alt: "L4 DEVELOPMENT",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L4 DEVELOPMENT",
    description: "Desarrollo web moderno e IA aplicada.",
    images: ["https://l4zarus.dev/og.png"],
  },
};

// -----------------------------------------------------------------------------
// Datos estructurados que estabas inyectando
// IMPORTANTE: ahora les ponemos `id` para que cumplan con el tipo JsonLdProps
// -----------------------------------------------------------------------------
const orgJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "L4 DEVELOPMENT",
  url: "https://l4zarus.dev",
  logo: "https://l4zarus.dev/logo.png", // cámbialo por el real
  sameAs: [
    "https://twitter.com/",
    "https://www.youtube.com/@",
    "https://www.instagram.com/",
    "https://github.com/",
  ],
};

const siteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "L4 DEVELOPMENT",
  url: "https://l4zarus.dev",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://l4zarus.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// -----------------------------------------------------------------------------
// RootLayout
// -----------------------------------------------------------------------------
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="bg-black">
      <body
        // className={inter.className} // si usas fuente
        className="min-h-screen bg-black text-white antialiased"
      >
        {/* Proveedor global de carga (contexto) */}
        <LoadingProvider>
          {/* ThemeProvider de shadcn / next-themes */}
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {/* Barra de progreso de scroll arriba */}
            <ScrollTracker />

            {/* Fondo reactivo con rays */}
            <ResponsiveGodRays />

            {/* Ruido sutil encima de todo */}
            <NoiseTexture />

            {/* Aviso de versión demo / depuración */}
            <DebugNoticeModal />

            {/* Pantalla de carga que se cierra cuando el contexto dice "listo" */}
            <LoadingManager />

            {/* Contenido de la app */}
            <main className="relative z-[1]">{children}</main>

            {/* JSON-LD CORREGIDO */}
            <JsonLd id="org" data={orgJson} />
            <JsonLd id="website" data={siteJson} />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
