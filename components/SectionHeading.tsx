import React from 'react';

interface SectionHeadingProps {
  /** Título principal de la sección */
  heading: string;
  /** Texto descriptivo que aparece debajo del título */
  subheading?: string;
  /**
   * ID base para animaciones con GSAP.
   * Si lo pasas, se agregan data-attributes:
   *  - data-gsap="<animationId>-heading"
   *  - data-gsap="<animationId>-subheading"
   * para que puedas animarlos en el componente padre.
   */
  animationId?: string;
}

/**
 * SectionHeading
 *
 * Encabezado reutilizable para secciones.
 * - Centrado
 * - Título + subtítulo
 * - Soporte para GSAP a través de data-attributes
 *
 * Úsalo en todas tus secciones para mantener consistencia.
 */
export default function SectionHeading({
  heading,
  subheading,
  animationId,
}: SectionHeadingProps) {
  return (
    <div className="mb-5 text-white lg:mb-10">
      {/* Título */}
      <h2
        className="mb-2 text-center text-1xl font-bold text-white lg:text-3xl"
        // si viene animationId, agregamos el data-gsap
        {...(animationId && { 'data-gsap': `${animationId}-heading` })}
      >
        {heading}
      </h2>

      {/* Subtítulo opcional */}
      {subheading && (
        <p
          className="mx-auto mb-8 w-[90%] text-center text-sm text-gray-300/75 lg:text-lg"
          {...(animationId && { 'data-gsap': `${animationId}-subheading` })}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
