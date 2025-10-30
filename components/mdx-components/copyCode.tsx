'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

/**
 * CodeBlockWithCopy
 * ------------------------------------------------------------
 * Wrapper para bloques de código que agrega un botoncito de “copiar”.
 *
 * Cómo funciona:
 * - Renderiza un botón absoluto arriba a la derecha.
 * - Al hacer click, busca el PRIMER <pre><code>...</code></pre> del DOM
 *   (esto es lo único “meh”: si tienes varios code blocks en la misma página
 *   deberías refinarlo para que copie SOLO el que envuelve este componente).
 * - Si copia bien, muestra el ícono de check 2s.
 *
 * 💡 Mejora pendiente:
 * - En lugar de `document.querySelector("pre")`, pasar una ref al hijo
 *   o aceptar `code` como prop.
 */
const CodeBlockWithCopy = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // 1. tomamos el primer <pre>
      const preElement = document.querySelector('pre');
      const codeElement = preElement?.querySelector('code');
      const codeToCopy = codeElement?.textContent || '';

      // 2. copiamos
      await navigator.clipboard.writeText(codeToCopy);
      setIsCopied(true);

      // 3. reset del mensaje
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative">
      {/* Botón copiar */}
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 z-20 flex cursor-pointer items-center gap-1 rounded-lg bg-slate-100 p-2 text-xs transition-all hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700"
        aria-label="Copiar código"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-black/45 dark:text-gray-400" />
        )}
        {isCopied ? 'Copied' : ''}
      </button>

      {/* Bloque de código real */}
      {children}
    </div>
  );
};

export default CodeBlockWithCopy;
