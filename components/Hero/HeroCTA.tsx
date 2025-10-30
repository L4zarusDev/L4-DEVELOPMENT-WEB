import HeroCircles from './HeroCircles';

/**
 * HeroCTA
 * ------------------------------------------------------------
 * Bloque principal del hero:
 * - Título enorme con degradado (usa clase global .hero-gradient-text)
 * - Subtítulo corto con la propuesta de valor
 * - Dos CTAs: ir a servicios y agendar
 * - Fondo decorativo de círculos detrás
 *
 * Importante: los elementos tienen data-gsap="..." porque el componente
 * <Hero /> los anima con GSAP cuando termina la pantalla de carga.
 */
export default function HeroCTA() {
  return (
    <div className="relative z-40 my-4 flex w-full flex-col items-center justify-center gap-12 px-4 xl:mx-auto xl:max-w-[1800px]">
      {/* Título + subtítulo */}
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Título gigante con degradado, oculto inicialmente para GSAP */}
        <div
          data-gsap="hero-text"
          className="hero-gradient-text -mt-1 text-center text-4xl font-bold leading-tight opacity-0 sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          L4 DEVELOPMENT
        </div>

        {/* Subtítulo con propuesta de valor */}
        <p
          data-gsap="tech-subtitle"
          className="mx-auto max-w-3xl text-center text-base text-white/80 opacity-0 sm:text-lg md:text-xl"
        >
          Creamos software y marcas digitales que venden. Haz despegar tu producto en 30 días.
        </p>
      </div>

      {/* CTAs */}
      <div className="grid w-full max-w-md grid-cols-2 items-center justify-center gap-3">
        {/* CTA 1: ir a servicios */}
        <a
          data-gsap="cta-view-projects"
          href="#services"
          className="grid place-items-center rounded-full py-3 text-center text-base text-white opacity-0 shadow-alt-cta transition-all hover:bg-white hover:text-black hover:shadow-cta lg:px-8 lg:py-3 xl:px-10 xl:py-4 xl:text-lg"
        >
          Servicios
        </a>

        {/* CTA 2: agendar (puedes cambiar por WhatsApp si ya migraste) */}
        <a
          data-gsap="cta-book-call"
          href="https://cal.com/l4zarusdev"
          className="grid place-items-center rounded-full bg-white py-3 text-center text-base text-black opacity-0 shadow-cta transition-all hover:bg-transparent hover:text-white hover:shadow-alt-cta lg:px-8 lg:py-3 xl:px-10 xl:py-4 xl:text-lg"
        >
          Reservar llamada
        </a>
      </div>

      {/* Fondo decorativo (círculos) */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center">
        <HeroCircles />
      </div>
    </div>
  );
}
