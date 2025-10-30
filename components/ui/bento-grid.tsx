import { ReactNode } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * 🧱 <BentoGrid />
 * Contenedor base de la cuadrícula tipo “bento”.
 * - Por defecto: 3 columnas, alto automático de 22rem
 * - Puedes sobreescribir el layout pasando `className`
 *   (ejemplo: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
 */
const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // layout base
        'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
        // clases adicionales
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * 🃏 <BentoCard />
 * Tarjeta individual del bento.
 * - `background`: capa decorativa (blurs, degradados, etc.)
 * - `Icon`: icono grande arriba
 * - `image`: opcional, como overlay con baja opacidad
 * - Al hacer hover: sube el contenido y aparece el CTA
 */
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  image,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
  image?: string;
}) => (
  <div
    key={name}
    className={cn(
      // ocupa las 3 columnas por defecto (mobile-first)
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      // dark mode / estilo base
      'bg-zinc-900/90 border border-zinc-700/50 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      'transform-gpu',
      className,
    )}
  >
    {/* capa decorativa que recibe el componente que le pasemos */}
    <div>{background}</div>

    {/* imagen opcional de fondo, con poca opacidad */}
    {image && (
      <div className="absolute inset-0 opacity-20">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    )}

    {/* contenido principal (icono + título + descripción) */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-200 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-100">{name}</h3>
      <p className="max-w-lg text-neutral-300">{description}</p>
    </div>

    {/* CTA que aparece solo en hover */}
    <div
      className={cn(
        'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto text-neutral-200 hover:bg-zinc-800/50"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>

    {/* overlay sutil en hover */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-zinc-800/20" />
  </div>
);

export { BentoCard, BentoGrid };
