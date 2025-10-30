import type { ReactNode } from 'react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import confetti from 'canvas-confetti';
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from 'canvas-confetti';

/**
 * Tipos públicos
 * ------------------------------------------------------------
 * - Api: lo que exponemos vía ref/context (ahora solo `fire`)
 * - ConfettiRef: ref que se puede pasar desde fuera para disparar el confetti
 */
type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<'canvas'> & {
  /**
   * Opciones por defecto para cada disparo.
   * Se mezclan con las que pases a `fire(...)`.
   */
  options?: ConfettiOptions;

  /**
   * Opciones globales de la instancia de canvas-confetti
   * (resize, worker, etc.)
   */
  globalOptions?: ConfettiGlobalOptions;

  /**
   * Si es true, NO dispara el confetti al montar.
   * Lo tendrás que disparar manualmente con `ref.current?.fire(...)`.
   */
  manualstart?: boolean;

  children?: ReactNode;
};

export type ConfettiRef = Api | null;

/**
 * Context para niños dentro del mismo árbol (por si quieres hacer
 * un botón que lance confetti sin pasar props por 3 niveles)
 */
const ConfettiContext = createContext<Api>({} as Api);

/**
 * Confetti
 * ------------------------------------------------------------
 * Componente que:
 * 1. Renderiza un <canvas>
 * 2. Crea una instancia de canvas-confetti sobre ese canvas
 * 3. Expone un método `fire(...)` vía ref y vía contexto
 * 4. Puede disparar automáticamente al montar (manualstart = false)
 *
 * Uso básico:
 *   const ref = useRef<ConfettiRef>(null);
 *   <Confetti ref={ref} />
 *   // luego:
 *   ref.current?.fire({ particleCount: 100 });
 */
const Confetti = forwardRef<ConfettiRef, Props>(function Confetti(
  { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, children, ...rest },
  ref,
) {
  // Aquí guardamos la instancia real de canvas-confetti
  const instanceRef = useRef<ConfettiInstance | null>(null);

  /**
   * Ref callback para el <canvas>
   * - Cuando el canvas se monta, creamos la instancia de confetti
   * - Cuando se desmonta, la reseteamos
   */
  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node !== null) {
        // canvas está montado
        if (instanceRef.current) return; // ya lo teníamos

        // creamos instancia
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true, // aseguramos resize
        });
      } else {
        // canvas se desmontó
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions],
  );

  /**
   * fire()
   * - dispara el confetti con las opciones pasadas
   * - mezcla las opciones por defecto (props.options) con las del disparo
   */
  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      return instanceRef.current?.({
        ...options,
        ...opts,
      });
    },
    [options],
  );

  // api que exponemos
  const api = useMemo<Api>(
    () => ({
      fire,
    }),
    [fire],
  );

  // permitimos que el padre haga ref.current.fire(...)
  useImperativeHandle(ref, () => api, [api]);

  /**
   * Disparo automático al montar
   * - si manualstart === false, se dispara una vez
   */
  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

export default Confetti;
