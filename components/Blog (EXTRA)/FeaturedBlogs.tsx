/**
 * ============================================================
 * 🚧 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * Sección de posts destacados con scroll horizontal.
 * Lee los posts desde `#site/content` y los muestra con `BlogCard`.
 * ============================================================
 */

import React from 'react';
import SectionHeading from '../SectionHeading';
import BlogCard from './BlogCard';
import { posts } from '#site/content';
// console.log(posts) // 👈 descomenta si quieres ver el shape de los posts

export default function FeaturedBlogs() {
  // Nota: `posts` viene ya cargado (probablemente de contentlayer o fuente similar)
  // aquí sólo lo ordenamos y lo pintamos.
  return (
    <div id="blog" className="my-20 lg:mt-40">
      {/* Encabezado de la sección */}
      <SectionHeading
        heading="Blog"
        subheading="Documenting my expertise in PHP, WordPress, and Laravel development, plus insights on AI integration."
      />

      {/* Contenedor principal de las cards */}
      <div className="mt-20 rounded-2xl lg:mt-40">
        {/* Wrapper con scroll horizontal (para mobile y pantallas chicas) */}
        <div className="mt-8 overflow-x-auto rounded-2xl py-4 pb-4">
          {/* Carrusel horizontal de cards */}
          <div className="flex space-x-6 px-4">
            {posts
              // ──────────────────────────────────────────────
              // Reordenamos: todo igual, pero los que tienen
              // "mautic" en el slug se van al final.
              // ──────────────────────────────────────────────
              .sort((a, b) => {
                if (a.slug.includes('mautic')) return 1;
                if (b.slug.includes('mautic')) return -1;
                return 0;
              })
              .map((post, idx) => (
                <BlogCard
                  key={idx}
                  blog={{
                    title: post.title,
                    description: post.description,
                    imageUrl: post.imageUrl,
                    url: post.slug, // 👈 si tu slug no es URL absoluta, añade "/" aquí
                    readTime: post.readTime,
                    tags: post.tags,
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
