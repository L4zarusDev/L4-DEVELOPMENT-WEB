import Image from 'next/image';
import HeroCircleSVGs from '../../public/images/svg/HeroCircles.svg';

/**
 * HeroCircles
 * ------------------------------------------------------------
 * Componente visual muy simple que renderiza el SVG decorativo del hero.
 * - Usa next/image para aprovechar optimización y lazy-loading
 * - Se puede posicionar con absolute desde el padre
 * - En mobile se ve más tenue (opacity-50), en desktop vuelve a 100%
 */
export default function HeroCircles() {
  return (
    <Image
      src={HeroCircleSVGs}
      alt="Círculos decorativos del hero"
      width={600}
      height={600}
      className="opacity-50 lg:opacity-100"
      priority
    />
  );
}
