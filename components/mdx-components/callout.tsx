import { cn } from '@/lib/utils';

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger' | 'info' | 'alert';
}

/**
 * Callout
 * ------------------------------------------------------------
 * Versión extendida con icono y más variantes.
 *
 * Props:
 * - `type`:
 *    - default → borde normal
 *    - danger  → rojo
 *    - warning → naranja
 *    - info    → azul
 *    - alert   → amarillo
 * - `icon`: string con emoji o caracter (💡, ⚠️, ❗, ℹ️…)
 *
 * Ejemplo:
 * <Callout type="info" icon="ℹ️">Recuerda actualizar tu token.</Callout>
 */
export function Callout({
  children,
  icon,
  type = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-2 flex items-start rounded-md p-3',
        {
          'border-l-4 border-l-red-600 bg-red-800/5': type === 'danger',
          'border-l-4 border-l-orange-600 bg-orange-800/5': type === 'warning',
          'border-l-4 border-l-blue-600 bg-blue-800/5': type === 'info',
          'border-l-4 border-l-yellow-600 bg-yellow-800/5': type === 'alert',
          border: type === 'default',
        },
      )}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl leading-none">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}
