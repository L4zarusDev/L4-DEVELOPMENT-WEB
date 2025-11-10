// lib/posts.ts
// ─────────────────────────────────────────────────────────────
// Utilidades para trabajar con posts en MDX:
//
// - Lee todos los .mdx en la carpeta `/posts`
// - Extrae frontmatter con `gray-matter`
// - Calcula y GUARDA el tiempo de lectura si no existe
//   (lo guarda en .cache/readTimes.json y también re-escribe el MDX 😎)
// - Devuelve los posts ordenados por fecha
// - Permite obtener:
//     • todos los posts
//     • un post por slug
//     • posts destacados
//
// ⚠️ Nota importante:
// Este archivo está pensado para ejecutarse en el **lado del servidor**,
// porque usa `fs`, `path`, `process.cwd()` y escribe en disco.
// No lo importes directamente en un Client Component.
// ─────────────────────────────────────────────────────────────

import { glob } from 'glob';
import { join } from 'path';
import fs, { writeFileSync } from 'fs';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'posts');
const cacheFile = join(process.cwd(), '.cache', 'readTimes.json');

interface PostData {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  readTime: string;
  filepath: string;
  content: string;
  slug: string;
  // Por si en el frontmatter agregas más cosas
  [key: string]: any;
}

/**
 * Calcula un tiempo de lectura muy simple:
 * 200 palabras por minuto → redondea hacia arriba.
 */
function calculateReadTime(content: string): string {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min`;
}

/**
 * Carga el cache de tiempos de lectura desde .cache/readTimes.json
 * Si no existe, devuelve un objeto vacío.
 */
function loadCache(): Record<string, string> {
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  }
  return {};
}

/**
 * Guarda el cache en el archivo .cache/readTimes.json
 */
function saveCache(cache: Record<string, string>) {
  const cacheDir = join(process.cwd(), '.cache');

  // Aseguramos que existe la carpeta .cache
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
}

/**
 * Log liviano solo en desarrollo.
 */
function log(message: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
}

/**
 * Devuelve la lista de rutas relativas de todos los .mdx dentro de /posts
 * Ej: ["2025/mi-post.mdx", "hello.mdx", ...]
 */
export function getPostSlugs() {
  return glob.sync('**/*.mdx', { cwd: postsDirectory });
}

/**
 * Lee un post específico por su filepath relativo a /posts.
 *
 * - Lee el archivo
 * - Saca frontmatter + contenido con gray-matter
 * - Si NO tenía readTime:
 *    • lo calcula
 *    • lo guarda en cache
 *    • y reescribe el MDX agregando el readTime al frontmatter 💪
 */
export function getPost(filepath: string): PostData {
  const fullPath = join(postsDirectory, filepath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let readTime = data.readTime as string | undefined;
  let shouldUpdateFrontmatter = false;

  // Si el MDX no tenía readTime, lo buscamos primero en el cache
  if (!readTime) {
    log(`Calculating read time for: ${filepath}`);

    const cache = loadCache();

    if (cache[filepath]) {
      // Ya lo teníamos calculado en una ejecución anterior
      readTime = cache[filepath];
      log(`Read time found in cache: ${readTime}`);
    } else {
      // No estaba: lo calculamos
      readTime = calculateReadTime(content);
      cache[filepath] = readTime;
      saveCache(cache);
      log(`New read time calculated: ${readTime}`);
    }

    // Actualizamos el frontmatter en memoria
    data.readTime = readTime;
    shouldUpdateFrontmatter = true;
  }

  // Si tuvimos que añadir readTime, reescribimos el archivo MDX con el nuevo frontmatter
  if (shouldUpdateFrontmatter) {
    log(`Updating front matter for: ${filepath}`);
    const updatedFileContents = matter.stringify(content, data);
    writeFileSync(fullPath, updatedFileContents);
    log(`Front matter updated for: ${filepath}`);
  }

  return {
    ...data,
    content,
    filepath,
    slug: filepath.replace(/\.mdx$/, ''), // "blog/hello.mdx" → "blog/hello"
    readTime: readTime!,
  } as PostData;
}

/**
 * Devuelve TODOS los posts ordenados por fecha DESC (más nuevo primero).
 * Si pasas `limit`, hace slice.
 */
export function getPosts(limit: number = -1): PostData[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPost(slug))
    // Ordenamos por fecha descendente
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return limit === -1 ? posts : posts.slice(0, limit);
}

/**
 * Devuelve UN post por slug limpio (sin .mdx).
 * Ej: getPostBySlug("hello") → busca "hello.mdx" dentro de los posts.
 */
export function getPostBySlug(slug: string): PostData | undefined {
  const allPosts = getPosts();
  return allPosts.find((post) => post.slug === slug);
}

/**
 * Devuelve los posts que tengan `featured: true` en el frontmatter.
 * Por defecto, hasta 8.
 */
export function getFeaturedPosts(limit: number = 8): PostData[] {
  const allPosts = getPosts();
  const featuredPosts = allPosts.filter((post) => Boolean(post.featured));
  return featuredPosts.slice(0, limit);
}
