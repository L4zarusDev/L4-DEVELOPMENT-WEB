'use client';

import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import HeroCTA from './HeroCTA';
import LogoCloud from '@/components/LogoCloud/LogoCloud';

/**
 * Hero
 * - Espera a que termine la pantalla de carga (evento "loadingScreenComplete")
 * - Cuando llega el evento, dispara las animaciones GSAP de todos los elementos
 * - Separa la vista (HeroCTA + LogoCloud) de la lógica de animación
 * - Usa data attributes para no acoplar GSAP a la estructura del JSX
 */
export default function Hero() {
  // Controla si ya podemos animar (hasta que la pantalla de loading avise)
  const [shouldAnimate, setShouldAnimate] = useState(false);

  /**
   * 1) Escuchar el evento global "loadingScreenComplete"
   *    - Esto permite que otro componente (LoadingManager, por ejemplo)
   *      controle cuándo el Hero entra
   */
  useEffect(() => {
    console.log('🎯 Hero: configurando listener para "loadingScreenComplete"');

    const handleLoadingComplete = () => {
      console.log('🎉 Hero: recibido "loadingScreenComplete", activando animaciones...');
      setShouldAnimate(true);
    };

    window.addEventListener('loadingScreenComplete', handleLoadingComplete);

    return () => {
      console.log('🧹 Hero: limpiando listener de "loadingScreenComplete"');
      window.removeEventListener('loadingScreenComplete', handleLoadingComplete);
    };
  }, []);

  /**
   * 2) Animaciones GSAP
   *    - Sólo corren cuando shouldAnimate === true
   *    - Usamos data-gsap para apuntar a cada elemento
   *    - Timeline con delays solapados (+= / -=) para dar ritmo
   */
  useGSAP(
    () => {
      if (!shouldAnimate) {
        console.log('⏳ Hero: aún no animamos (shouldAnimate = false)');
        return;
      }

      console.log('🎬 Hero: iniciando animaciones GSAP');

      const tl = gsap.timeline();

      // Estados iniciales (todos ocultos / fuera)
      gsap.set('[data-gsap="tech-badge"]', { opacity: 0, y: -20 });
      gsap.set('[data-gsap="hero-text"]', { opacity: 0, scale: 0.9 });
      gsap.set('[data-gsap="cta-view-projects"]', { opacity: 0, x: -30 });
      gsap.set('[data-gsap="cta-book-call"]', { opacity: 0, x: 30 });
      gsap.set('[data-gsap="tech-subtitle"]', { opacity: 0, y: -15 });
      gsap.set('[data-gsap="logo-cloud"]', { opacity: 0, scale: 0.95 });
      gsap.set('[data-gsap="curve-text"]', { opacity: 0, y: 20 });

      // Secuencia de entrada
      tl.to('[data-gsap="tech-badge"]', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(
          '[data-gsap="hero-text"]',
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4', // solapar con el anterior
        )
        .to(
          '[data-gsap="cta-view-projects"]',
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          '[data-gsap="cta-book-call"]',
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(
          '[data-gsap="tech-subtitle"]',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          '[data-gsap="logo-cloud"]',
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          '[data-gsap="curve-text"]',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        );
    },
    // dependencias: si cambia shouldAnimate, reintenta animar
    [shouldAnimate],
  );

  return (
    <div className="relative mt-32 flex min-h-[100dvh] flex-col px-2 md:mt-4 md:px-10 lg:justify-center">
      {/* CTA principal (ahí es donde deberían estar los data-gsap="..." ) */}
      <HeroCTA />

      {/* Logos de confianza, también animados */}
      <LogoCloud />
    </div>
  );
}
