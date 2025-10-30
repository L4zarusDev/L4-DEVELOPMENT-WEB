import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from '@radix-ui/react-icons';

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

/**
 * Configuración de las tarjetas del bento
 * - Cada objeto define una “feature” que se mostrará en la grid
 * - Puedes cambiar icono, texto, CTA y la posición en la grilla
 * - `background` es puro decorativo (blur + degradado)
 * - La propiedad `className` controla cómo se acomoda en pantallas grandes
 */
const features = [
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '/',
    cta: 'Learn more',
    background: (
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl opacity-60" />
    ),
    // ocupa de la fila 1 a la 3 en desktop (col 2)
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: InputIcon,
    name: 'Full text search',
    description: 'Search through all your files in one place.',
    href: '/',
    cta: 'Learn more',
    background: (
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 blur-3xl opacity-60" />
    ),
    // arriba a la izquierda
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: GlobeIcon,
    name: 'Multilingual',
    description: 'Supports 100+ languages and counting.',
    href: '/',
    cta: 'Learn more',
    background: (
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-3xl opacity-60" />
    ),
    // abajo a la izquierda
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: CalendarIcon,
    name: 'Calendar',
    description: 'Use the calendar to filter your files by date.',
    href: '/',
    cta: 'Learn more',
    background: (
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl opacity-60" />
    ),
    // arriba derecha
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BellIcon,
    name: 'Notifications',
    description:
      'Get notified when someone shares a file or mentions you in a comment.',
    href: '/',
    cta: 'Learn more',
    background: (
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-3xl opacity-60" />
    ),
    // debajo del calendario (misma col)
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

/**
 * <BentoDemo />
 * ----------------------------------------------------------------
 * Pequeño ejemplo de “bento layout” usando tu componente `BentoGrid`.
 * - En móvil las tarjetas se van una debajo de otra
 * - En desktop respetan las posiciones de `className` definidas arriba
 * - Puedes meter esto en cualquier sección de tu landing
 */
function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { BentoDemo };
