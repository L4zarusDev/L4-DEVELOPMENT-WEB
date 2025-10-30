// lib/utils.ts
// ─────────────────────────────────────────────────────────────
// Utilidades comunes para el blog/app:
// - `cn` → fusionar clases tailwind de forma inteligente
// - `formatDate` → mostrar fechas bonitas
// - helpers para posts (ordenar, filtrar por tag, contar tags)
// - `getPostsByTagSlug` usa github-slugger para comparar slugs
//
// 👀 Nota: esto asume que `Post` viene de `#site/content` (contentlayer
// o un setup similar). Ajusta el import si cambias de sistema.
// ─────────────────────────────────────────────────────────────

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Post } from '#site/content';
import { slug } from 'github-slugger';

/**
 * cn(...)
 * Combina clases de forma segura:
 * - clsx: permite pasar strings, arrays, objetos condicionales
 * - twMerge: resuelve conflictos de Tailwind (p. ej. "p-2 p-4" → "p-4")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatDate("2025-10-30")
 * → "October 30, 2025"
 *
 * Cambia el locale si quieres español:
 * toLocaleDateString("es-MX", { ... })
 */
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Ordena posts más recientes primero.
 */
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Recorre todos los posts publicados
 * y devuelve un objeto { tag: cantidad }.
 *
 * Ej: { react: 5, nextjs: 3, "ai": 2 }
 */
export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    // Solo contamos los publicados
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });

  return tags;
}

/**
 * Devuelve los tags ordenados de mayor a menor uso.
 */
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

/**
 * Filtra posts por el slug del tag.
 * Útil porque en la URL solemos usar slugs, no el nombre "bonito".
 *
 * Ej:
 *   getPostsByTagSlug(posts, "react") → todos los que tengan tag "React"
 *   (o "react", o "React.js") porque se compara por slug.
 */
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;

    // slugificamos todos los tags del post
    const slugifiedTags = post.tags.map((t) => slug(t));
    return slugifiedTags.includes(tag);
  });
}
