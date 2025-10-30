// utils/markdown-to-html.ts
// ─────────────────────────────────────────────────────────────
// Convierte un string Markdown en HTML usando unified + remark + rehype.
// Incluye:
// - remark-parse → parsea Markdown a AST
// - remark-rehype → pasa de Markdown AST a HTML AST
// - rehype-pretty-code → formatea bloques de código con temas bonitos
// - transformerCopyButton → agrega botón de “copiar” en el código
// - rehype-stringify → vuelve a string HTML
// ─────────────────────────────────────────────────────────────

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

/**
 * markdownToHtml
 *
 * Recibe markdown en texto plano y devuelve HTML ya procesado.
 * Útil para:
 * - blogs
 * - documentación
 * - contenido de CMS
 *
 * 👀 Notas:
 * - `allowDangerousHtml: true` permite que el Markdown traiga HTML embebido.
 *   Úsalo con cuidado o sanitiza antes si el contenido viene de usuarios.
 * - `rehype-pretty-code` permite destacar sintaxis y configurar temas.
 * - Aquí usamos el tema `catppuccin-macchiato` (puedes cambiarlo).
 */
export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    // 1) Parsear Markdown → MDAST
    .use(remarkParse)
    // 2) Pasar de Markdown AST → HTML AST
    .use(remarkRehype, { allowDangerousHtml: true })
    // 3) Bonito para bloques de código
    .use(rehypePrettyCode, {
      theme: 'catppuccin-macchiato',
      transformers: [
        // Agrega el botón de copiar en cada bloque de código
        transformerCopyButton({
          visibility: 'always',      // siempre visible
          feedbackDuration: 3000,    // “Copied!” por 3s
        }),
      ],
    })
    // 4) Volver a HTML string
    .use(rehypeStringify as any)
    .process(markdown);

  return String(result);
}
