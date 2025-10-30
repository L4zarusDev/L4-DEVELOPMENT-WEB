import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * 🎛️ Configuración base de variantes para el botón.
 * Usamos `cva` (class-variance-authority) para definir:
 * - variantes visuales: default, destructive, outline, secondary, ghost, link
 * - tamaños: default, sm, lg, icon
 * Esto nos permite hacer: `<Button variant="outline" size="sm" />`
 */
const buttonVariants = cva(
  // estilos base comunes a TODOS los botones
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    // valores por defecto
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * `asChild` permite que el botón se “inyecte” en otro componente (por ej. un <Link>)
   * manteniendo los estilos del botón.
   * Ej:
   * <Button asChild><Link href="/about">Ir</Link></Button>
   */
  asChild?: boolean;
}

/**
 * 🟦 <Button />
 * Botón reutilizable al estilo shadcn/ui.
 * - Usa `buttonVariants` para estilos
 * - Soporta `asChild` para envolver otros componentes
 * - Pasa props nativos de <button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // si asChild = true → renderizamos <Slot> (Radix) en lugar de <button>
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
