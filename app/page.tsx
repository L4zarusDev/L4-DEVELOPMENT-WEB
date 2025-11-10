import { unstable_noStore as noStore } from 'next/cache';

// ─── Secciones principales de la página ───────────────────────────────────────
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/index';
import StackAndCerts from '@/components/Stack/StackAndCerts';
import TimelineComponent from '@/components/Timeline/Timeline';
import AboutMe from '@/components/about-me/AboutMe';
import FaqAndCTA from '@/components/FAQ/FaqAndCTA';
import ContactSection from '@/components/Contact/ContactSection';
import SecondQuote from '@/components/SecondQuote/SecondQuote';
import { Footer } from '@/components/footer';

// ─── UI / efectos / utilidades ────────────────────────────────────────────────
import ResponsiveGodRays from '@/components/ui/ResponsiveGodRays';
import DebugNoticeModal from '@/components/DebugNoticeModal';
// import Stats from '@/components/GlobalStats/Stats'; // 👈 ahora está comentado

// Indica a Next que esta página siempre se genere de forma dinámica
export const dynamic = 'force-dynamic';

// Revalidación cada 12h (aunque arriba forzamos dinámico, lo dejamos documentado)
export const revalidate = 43_200; // 12 horas

export default function Home() {
  // Evita que Next.js almacene en caché esta ruta, útil si hay datos dinámicos
  noStore();

  return (
    <main className="bg-transparent" role="main">
      {/* Aviso/ventana para entornos de debug o previews */}
      <DebugNoticeModal />

      {/* Fondo animado que vive “debajo” de todo el contenido */}
      <ResponsiveGodRays />

      {/* =======================================================================
          1) Hero
          -----------------------------------------------------------------------
          - Primer pantallazo de la web.
          - Aquí suele ir el “quién soy” corto + CTA + social proof corta.
        ======================================================================= */}
      <section id="hero" aria-label="Hero">
        <Hero />
      </section>

      {/* =======================================================================
          2) Prueba social / métricas rápidas
          -----------------------------------------------------------------------
          - La tienes desactivada por ahora.
          - Úsala cuando quieras mostrar números de clientes, proyectos, años, etc.
        ======================================================================= */}
      {/*
      <section
        id="stats"
        aria-label="Estadísticas globales"
        className="scroll-mt-24"
      >
        <Stats />
      </section>
      */}

      {/* =======================================================================
          3) Servicios
          -----------------------------------------------------------------------
          - Aquí estás montando tu carrusel de servicios (software, web, redes…)
          - El componente ya trae su propio layout interno.
        ======================================================================= */}
      <section id="services" aria-label="Servicios" className="scroll-mt-24">
        <Services />
      </section>

      {/* =======================================================================
          4) Stack & Certificaciones
          -----------------------------------------------------------------------
          - Muestra tecnologías dominadas y credenciales.
          - Refuerza autoridad después de mostrar los servicios.
        ======================================================================= */}
      <section
        id="stack"
        aria-label="Stack y certificaciones"
        className="scroll-mt-24"
      >
        <StackAndCerts />
      </section>

      {/* =======================================================================
          5) Línea de tiempo / trayectoria
          -----------------------------------------------------------------------
          - Buena para contar historia profesional o milestones.
          - Útil si trabajas con empresas que quieren ver “continuidad”.
        ======================================================================= */}
      <section
        id="timeline"
        aria-label="Mi trayectoria"
        className="scroll-mt-24"
      >
        <TimelineComponent />
      </section>

      {/* =======================================================================
          6) Sobre mí
          -----------------------------------------------------------------------
          - Sección humana/personal.
          - Aquí puedes enlazar a un CV, o hablar de tu forma de trabajo.
        ======================================================================= */}
      <section id="about" aria-label="Sobre mí" className="scroll-mt-24">
        <AboutMe />
      </section>

      {/* =======================================================================
          7) FAQ + CTA final
          -----------------------------------------------------------------------
          - Responde objeciones comunes SIN que el usuario tenga que escribirte.
          - El CTA al final refleja la acción que más te importa (contactar).
        ======================================================================= */}
      <section id="faq" aria-label="Preguntas frecuentes" className="scroll-mt-24">
        <FaqAndCTA />
      </section>

      {/* =======================================================================
          8) Contacto
          -----------------------------------------------------------------------
          - Sección de formulario / datos de contacto.
          - El id="contact" permite que enlaces internos lleguen aquí.
        ======================================================================= */}
      <section id="contact" aria-label="Contacto" className="scroll-mt-24">
        <ContactSection />
      </section>

      {/* =======================================================================
          9) Cita / cierre
          -----------------------------------------------------------------------
          - Pie de página “emocional” o de branding.
          - Útil para cerrar el scroll con una idea fuerte.
        ======================================================================= */}
      <section aria-label="Cita final" className="scroll-mt-24">
        <SecondQuote />
      </section>

      {/* =======================================================================
          10) Footer
          -----------------------------------------------------------------------
          - Navegación secundaria, redes, copy, legal.
        ======================================================================= */}
      <Footer />
    </main>
  );
}
