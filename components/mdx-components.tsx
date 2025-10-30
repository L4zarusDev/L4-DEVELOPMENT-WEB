'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// runtime para evaluar el MDX en tiempo de ejecución
import * as runtime from 'react/jsx-runtime';

import { Callout } from '@/components/mdx-components/callout';
import { Youtube } from '@/components/mdx-components/youtube';
import CodeBlockWithCopy from '@/components/mdx-components/copyCode';
import SectionSeparator from '@/components/mdx-components/seperator';
import { TableOfContents } from '@/components/mdx-components/toc';
import Carousel from '@/components/mdx-components/carousel';

import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────────────────
   util: convierte el string generado de MDX a un React component real
   (esto es un patrón típico cuando el contenido viene de la base de datos
   y se compila en el servidor o en build)
   ─────────────────────────────────────────────────────────────────────────── */
const useMDXComponent = (code: string) => {
  // el code que recibes es una función serializada
  // la ejecutamos y le pasamos el runtime de React
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

/* ──────────────────────────────────────────────────────────────────────────────
   Heading genérico (h1..h6) con estilos tailwind y scroll-m
   ─────────────────────────────────────────────────────────────────────────── */
const Heading = ({ as: Component = 'h1', children, ...props }: any) => {
  const styles = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8',
    h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-4',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3',
    h5: 'scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-2',
    h6: 'scroll-m-20 text-base font-semibold tracking-tight mt-6 mb-2',
  };

  return (
    <Component
      className={cn(
        'group relative flex items-center gap-2',
        styles[Component as keyof typeof styles],
        'prose prose-slate dark:prose-invert',
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/* ──────────────────────────────────────────────────────────────────────────────
   Mapeo de componentes MDX → componentes de React (shortcodes)
   Este objeto se lo pasamos al <Component /> renderizado al final.
   Aquí puedes registrar TODO lo que quieras que se use dentro del MDX:
   <Callout />, <Youtube />, tablas, imágenes, etc.
   ─────────────────────────────────────────────────────────────────────────── */
const components = {
  // Imagen con next/image
  Image: (props: any) => (
    <Image
      className="rounded-lg border shadow-sm"
      {...props}
      alt={props.alt || 'Blog Image'}
    />
  ),

  Callout,
  Youtube,
  SectionSeparator,
  Carousel,

  // headings
  h1: (props: any) => <Heading as="h1" {...props} />,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  h4: (props: any) => <Heading as="h4" {...props} />,
  h5: (props: any) => <Heading as="h5" {...props} />,
  h6: (props: any) => <Heading as="h6" {...props} />,

  // links: si dentro del <a> hay una imagen, lo renderizamos especial
  a: ({ className, ...props }: any) => {
    const hasImage =
      props.children &&
      Array.isArray(props.children) &&
      props.children.some((child: any) => child?.type);

    // link con imagen dentro
    if (hasImage) {
      return (
        <Link
          className={cn(
            'inline-flex items-center gap-1 underline underline-offset-4 font-medium text-white hover:text-white/80',
            className,
          )}
          {...props}
        >
          {props.children.map((child: any, index: number) => {
            if (child?.type) {
              return (
                <Image
                    // ojo: esto asume que el hijo es un <Image/> con src/alt
                  key={index}
                  src={child.props.src}
                  alt={child.props.alt}
                  width={25}
                  height={25}
                  className="inline-block rounded"
                />
              );
            }
            return child;
          })}
        </Link>
      );
    }

    // link normal
    return (
      <Link
        className={cn(
          'font-medium text-primary hover:text-primary/80 underline underline-offset-4',
          className,
        )}
        {...props}
      />
    );
  },

  // párrafos
  p: ({ className, ...props }: any) => (
    <p
      className={cn(
        'my-2 leading-5 [&:not(:first-child)]:mt-2 prose-p:text-base prose-p:text-slate-700 dark:prose-p:text-slate-300',
        className,
      )}
      {...props}
    />
  ),

  // listas
  ul: ({ className, ...props }: any) => (
    <ul
      className={cn(
        'my-1 md:my-2 ml-6 list-disc prose-li:marker:text-slate-500 dark:prose-li:marker:text-slate-400',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: any) => (
    <ol
      className={cn(
        'my-1 md:my-2 ml-6 list-decimal prose-li:marker:text-slate-500 dark:prose-li:marker:text-slate-400',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: any) => (
    <li
      className={cn('mt-2 text-slate-700 dark:text-slate-300', className)}
      {...props}
    />
  ),

  // citas
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-700 dark:text-slate-200',
        className,
      )}
      {...props}
    />
  ),

  // imágenes <img> puras dentro del MDX
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('my-1 md:my-4 rounded-lg border shadow-sm', className)}
      alt={alt}
      {...props}
    />
  ),

  // separador
  hr: (props: any) => <hr className="my-8 border-muted" {...props} />,

  // tablas
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-1 md:my-2 w-full overflow-y-auto">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t border-muted p-0 even:bg-muted/45', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: any) => (
    <th
      className={cn('border border-muted px-4 py-2 text-left font-semibold', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: any) => (
    <td className={cn('border border-muted px-4 py-2 text-left', className)} {...props} />
  ),

  // bloques de código
  pre: ({ className, children, ...props }: any) => {
    const code = children?.props?.children || '';

    return (
      <CodeBlockWithCopy code={code} className={className}>
        <pre
          className={cn(
            'my-2 overflow-x-auto rounded-lg',
            'scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-400',
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </CodeBlockWithCopy>
    );
  },

  // inline code
  code: ({ className, ...props }: any) => (
    <code
      className={cn(
        'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...props}
    />
  ),

  // tipografía extra
  strong: (props: any) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-slate-800 dark:text-slate-200" {...props} />
  ),
  del: (props: any) => (
    <del className="line-through text-slate-600 dark:text-slate-400" {...props} />
  ),
};

interface MDXComponentProps {
  /** código MDX serializado (ya "compilado") */
  code: string;
  /** título del post/página — lo usamos para NO mostrarlo en el TOC */
  title: string;
}

/**
 * MDXComponent
 *
 * - Renderiza el MDX con los componentes registrados arriba.
 * - Extrae los <h1> y <h2> del contenido ya montado para generar un TOC.
 * - Omite headings que no queremos (el mismo título del post, “Table of Contents”…).
 */
export default function MDXComponent({ code, title }: MDXComponentProps) {
  const Component = useMDXComponent(code);

  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

  // Al montar (o cuando cambia el MDX) → buscar los h1/h2 reales en el DOM
  useEffect(() => {
    // query de TODOS los h1 y h2 que estén ya renderizados
    const headingElements = Array.from(document.querySelectorAll('h1, h2'));

    const newHeadings = headingElements
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        // heading.tagName = "H1", "H2", ... → agarramos el número
        level: parseInt(heading.tagName[1] || ''),
      }))
      // sacamos títulos que no queremos en el TOC
      .filter(
        (heading) =>
          heading.text !== 'Table of Contents' &&
          heading.text !== 'Blog Name' &&
          heading.text !== title, // no mostrar el nombre del archivo / título principal
      );

    setHeadings(newHeadings);
  }, [code, title]);

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-pre:bg-slate-950">
      {/* TOC flotante / lateral */}
      <TableOfContents headings={headings} />

      {/* Contenido del MDX (usa el mapeo de componentes de arriba) */}
      <Component components={components} />
    </article>
  );
}
