/**
 * ============================================================
 * 🚧 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * Modal de detalle de libro.
 * - Se abre sobre toda la pantalla (portal-like)
 * - Cierra con:
 *    - botón de X
 *    - clic fuera (backdrop)
 *    - tecla ESC
 * - Bloquea el scroll del body mientras está abierto
 * ============================================================
 */

'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  rating: number;
  genre: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  // ───────────────────────────────────────────────────────────
  // Efecto: cerrar con ESC y bloquear el scroll de fondo
  // ───────────────────────────────────────────────────────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // bloquear scroll del body mientras el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Cierra si se hace clic en el backdrop (no dentro del modal)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Contenedor del modal */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-gray-900/95 backdrop-blur-md">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Contenido */}
        <div className="flex flex-col md:flex-row">
          {/* Portada */}
          <div className="relative aspect-[3/4] md:aspect-auto md:w-1/3">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>

          {/* Texto / detalles */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Header del libro */}
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-bold text-white">{book.title}</h2>
              <p className="mb-4 text-lg text-gray-300">by {book.author}</p>

              <div className="mb-6 flex items-center gap-4">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-400">
                  {book.genre}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-300">{book.rating}</span>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                About this book
              </h3>
              <p className="leading-relaxed text-gray-300">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
