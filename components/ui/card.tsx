// ─────────────────────────────────────────────────────────────────────────────
// Componente genérico de "Card" (al estilo shadcn/ui)
// Uso: envuelve contenido en una tarjeta consistente con tu tema
// Incluye: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
// Cada subcomponente solo aplica paddings y tipografía para mantener el diseño
// ─────────────────────────────────────────────────────────────────────────────

import * as React from 'react';
import { cn } from '@/lib/utils';

// ░░ Card ░░
// Contenedor base: fondo, borde/redondeado y sombra.
// Acepta className para extender estilos.
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg bg-card text-card-foreground shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

// ░░ CardHeader ░░
// Zona superior de la card: título, subtítulo, badges, etc.
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// ░░ CardTitle ░░
// Título principal dentro del header.
// Usa h3 por accesibilidad y tipografía consistente.
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// ░░ CardDescription ░░
// Texto descriptivo debajo del título, con color atenuado.
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

// ░░ CardContent ░░
// Cuerpo de la tarjeta: párrafos, formularios, listas, etc.
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// ░░ CardFooter ░░
// Zona inferior: botones de acción, links, totales, etc.
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
