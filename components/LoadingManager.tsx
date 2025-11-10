'use client';

import { useState } from 'react';
import { useLoading } from '@/lib/context/LoadingContext';
import { useAssetPreloader } from '@/lib/hooks/useAssetPreloader';
import LoadingScreen from './LoadingScreen';

/**
 * LoadingManager
 *
 * - Es el orquestador del estado de carga global.
 * - Escucha el contexto de carga (`useLoading`) para saber:
 *    - `progress`: porcentaje actual de carga.
 *    - `isComplete`: si ya terminamos de cargar todos los assets registrados.
 * - Llama a `useAssetPreloader()` para iniciar el preloading de imágenes, shaders,
 *   fuentes, etc. (lo que tú hayas configurado en ese hook).
 * - Muestra <LoadingScreen /> hasta que:
 *    1. el contexto dice que está completo
 *    2. y el propio LoadingScreen hace su animación de salida
 *    3. y nos avisa con `onComplete`
 *
 * Así no desmontamos el loader demasiado pronto y evitamos flashes feos.
 */
export function LoadingManager() {
  // 1. Estado global de carga (viene del provider LoadingContext)
  const { progress, isComplete } = useLoading();

  // 2. Estado local para controlar cuándo ya mostramos el contenido real
  //    (esto permite que el loader haga su animación de salida aunque
  //     el contexto ya diga que terminó)
  const [showContent, setShowContent] = useState(false);

  // 3. Disparar el preloader de assets (custom hook)
  //    Aquí normalmente se registran imágenes, fuentes o shaders
  useAssetPreloader();

  // 4. Cuando el LoadingScreen termine su animación → mostramos el contenido
  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {/* Mientras NO digamos "ok, ya", seguimos mostrando la pantalla de carga */}
      {!showContent && (
        <LoadingScreen
          progress={progress}     // % de carga → para la barra o el contador
          isComplete={isComplete} // el contexto ya terminó
          onComplete={handleLoadingComplete} // el loader nos avisa cuando su anim terminó
        />
      )}

      {/* Aquí abajo normalmente iría tu layout / children / página real */}
      {/* {showContent && <>{children}</>} */}
    </>
  );
}
