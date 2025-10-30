'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

/**
 * Estado interno que mantiene el provider:
 * - progress: 0 → 100
 * - isLoading: si la pantalla de loading debería seguir visible
 * - isComplete: si ya terminamos todo el preloading
 * - loadedAssets: set con los nombres de assets que ya se marcaron como cargados
 */
interface LoadingState {
  progress: number;
  isLoading: boolean;
  isComplete: boolean;
  loadedAssets: Set<string>;
}

/**
 * API que exponemos desde el contexto:
 * - setAssetLoaded: marcas un recurso como cargado y recalculamos el progreso
 * - setProgress: forzar un progreso concreto (por si hay progreso externo)
 * - setLoadingComplete: marca ya todo como terminado y cierra loading
 */
interface LoadingContextType extends LoadingState {
  setAssetLoaded: (assetName: string) => void;
  setProgress: (progress: number) => void;
  setLoadingComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

/**
 * Lista de assets "críticos" que deben cargarse antes de quitar el loading.
 * Puedes adaptarla según tu proyecto.
 */
const REQUIRED_ASSETS = [
  'god-rays-shader',
  'fonts',
  'hero-components',
  'critical-images',
];

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    progress: 0,
    isLoading: true,
    isComplete: false,
    loadedAssets: new Set(),
  });

  /**
   * Marca un asset como cargado.
   * - Lo agregamos al Set
   * - Recalculamos el % en base a REQUIRED_ASSETS
   */
  const setAssetLoaded = (assetName: string) => {
    setLoadingState((prev) => {
      const newLoadedAssets = new Set(prev.loadedAssets);
      newLoadedAssets.add(assetName);

      const progress = Math.min(
        100,
        (newLoadedAssets.size / REQUIRED_ASSETS.length) * 100,
      );

      return {
        ...prev,
        loadedAssets: newLoadedAssets,
        progress,
      };
    });
  };

  /**
   * Permite establecer un progreso manual (por ejemplo, por una carga de red).
   * Se normaliza entre 0 y 100.
   */
  const setProgress = (progress: number) => {
    setLoadingState((prev) => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress)),
    }));
  };

  /**
   * Marca de forma explícita que ya terminamos de cargar.
   * Esto suele llamarse cuando la pantalla de loading hizo sus animaciones.
   */
  const setLoadingComplete = () => {
    setLoadingState((prev) => ({
      ...prev,
      progress: 100,
      isComplete: true,
      isLoading: false,
    }));
  };

  /**
   * Efecto: si ya cargamos TODOS los assets requeridos
   * y todavía no marcamos como completo, esperamos un poquito
   * y luego llamamos a setLoadingComplete().
   *
   * Ese delay (1.2s) es para que no se “parpadee” el loader si se carga
   * todo demasiado rápido.
   */
  useEffect(() => {
    const allLoaded =
      loadingState.loadedAssets.size >= REQUIRED_ASSETS.length;

    if (allLoaded && !loadingState.isComplete) {
      const timer = setTimeout(() => {
        setLoadingComplete();
      }, 1200); // antes 500ms; 1200ms da una UX más suave

      return () => clearTimeout(timer);
    }
  }, [loadingState.loadedAssets.size, loadingState.isComplete]);

  // Valor del contexto expuesto al árbol
  const contextValue: LoadingContextType = {
    ...loadingState,
    setAssetLoaded,
    setProgress,
    setLoadingComplete,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Hook de conveniencia para consumir el contexto.
 * Lanza un error si lo usas fuera del <LoadingProvider />
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
