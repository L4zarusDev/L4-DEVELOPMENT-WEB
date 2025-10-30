/**
 * ============================================================
 * 🚧 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * Card de libro para un grid o carrusel.
 * Muestra portada, título, autor, género y rating.
 * Pensado para usarse dentro de una lista y abrir un modal / detalle
 * con el callback `onClick`.
 * ============================================================
 */

import React from 'react';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  rating: number;
  genre: string;
}

interface BookCardProps {
  book: Book;
  onClick: () => void; // se dispara al hacer click en toda la card
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10"
    >
      {/* Portada del libro */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay al hacer hover para dar profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Info del libro */}
      <div className="p-4">
        {/* Título */}
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
          {book.title}
        </h3>

        {/* Autor */}
        <p className="mb-2 text-sm text-gray-400">by {book.author}</p>

        {/* Género + rating */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-500">
            {book.genre}
          </span>

          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-300">{book.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
