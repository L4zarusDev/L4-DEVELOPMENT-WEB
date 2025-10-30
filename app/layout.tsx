// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

// ✅ Estos componentes sí existen en tu repo según lo que compartiste
import ScrollTracker from "@/components/ScrollTracker";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { LoadingManager } from "@/components/LoadingManager";
import DebugNoticeModal from "@/components/DebugNoticeModal";

// -----------------------------------------------------------------------------
// Fallbacks inline para evitar "Module not found" mientras no existan los reales
// -----------------------------------------------------------------------------

// No-op ThemeProvider (si luego agregas "@/components/theme-provider", reemplázalo)
function ThemeProvider({
  children,
}: {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}) {
  return <>{children}</>;
}

// No-op ResponsiveGodRays (si luego agregas "@/components/ResponsiveGodRays", reemplázalo)
function ResponsiveGodRays() {
  return null;
}

// No-op NoiseTexture (si luego agregas "@/components/NoiseTexture", reemplázalo)
function NoiseTexture() {
  return null;
}

// JsonLd inline: cumple con el requerimiento de `id` y `data`
function JsonLd({ id, data }: { id: string; data: Record<string, any> }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Importante: JSON limpio y seguro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// -----------------------------------------------------------------------------
// Metadata básica
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
// Datos estructurados (con id para el validador de tipos)
// -----------------------------------------------------------------------------
const orgJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "L4 DEVELOPMENT",
  url: "https://l4zarus.dev",
  logo: "https://l4zarus.dev/logo.png",
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
      <body className="min-h-screen bg-black text-white antialiased">
        <LoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {/* Barra de progreso de scroll */}
            <ScrollTracker />

            {/* Efecto de rayos (no-op de momento) */}
            <ResponsiveGodRays />

            {/* Textura de ruido (no-op de momento) */}
            <NoiseTexture />

            {/* Modal de aviso de demo/debug según env */}
            <DebugNoticeModal />

            {/* Pantalla de carga controlada por contexto */}
            <LoadingManager />

            <main className="relative z-[1]">{children}</main>

            {/* JSON-LD con id (corrige el error de tipos) */}
            <JsonLd id="org" data={orgJson} />
            <JsonLd id="website" data={siteJson} />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
