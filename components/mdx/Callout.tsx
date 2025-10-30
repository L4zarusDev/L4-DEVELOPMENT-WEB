import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CalloutProps {
  children?: ReactNode;
  type?: 'default' | 'warning' | 'danger';
}

/**
 * Callout
 * ------------------------------------------------------------
 * Bloque de aviso para MDX / páginas.
 * - `type="default"` → estilo base
 * - `type="warning"` → amarillo
 * - `type="danger"` → rojo
 *
 * Útil para resaltar notas, advertencias o recordatorios dentro del contenido.
 */
export function Callout({ children, type = 'default', ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        // estilos base
        'my-6 w-full items-start rounded-md border p-4 dark:max-w-none border-l-4',
        // variantes por tipo
        {
          'border-red-900 bg-red-50 dark:prose': type === 'danger',
          'border-yellow-900 bg-yellow-50 dark:prose': type === 'warning',
          // puedes agregar un color base aquí si quieres para "default"
        },
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}
