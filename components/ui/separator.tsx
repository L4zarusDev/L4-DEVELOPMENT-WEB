'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

/**
 * Separador accesible basado en Radix UI.
 *
 * ✅ Sirve para dividir contenido horizontal o verticalmente.
 * ✅ Usa el prop `orientation` para cambiar la dirección.
 * ✅ `decorative` en true indica que es puramente visual (no se anuncia al lector de pantalla).
 *
 * Ejemplos:
 * - `<Separator className="my-6" />` → línea horizontal
 * - `<Separator orientation="vertical" className="mx-4" />` → línea vertical
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(function Separator(
  { className, orientation = 'horizontal', decorative = true, ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      // estilos base + orientación
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  );
});

export { Separator };
