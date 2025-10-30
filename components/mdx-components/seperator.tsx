import React from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface SectionSeparatorProps {
  title: string;
  link?: string;
  linkText?: string;
}

/**
 * SectionSeparator
 * ------------------------------------------------------------
 * Separador para secciones dentro de un layout tipo dashboard/blog.
 *
 * - Muestra una línea a la izquierda y un pequeño bloque con el título
 * - Opcionalmente muestra un link de “more / ver más” con icono
 * - Útil para dividir bloques de contenido dentro de una página larga
 *
 * Ejemplo:
 * <SectionSeparator title="Proyectos recientes" link="/projects" linkText="ver todo" />
 */
export default function SectionSeparator({
  title,
  link,
  linkText,
}: SectionSeparatorProps) {
  return (
    <div className="col-span-3 flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
      {/* línea izquierda */}
      <Separator className="flex-1" />

      {/* título + link opcional */}
      <div className="flex items-center gap-1">
        <p className="text-xs uppercase">{title}</p>
        {link && (
          <Link
            href={link}
            className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs transition hover:bg-muted/20"
          >
            <span>{linkText || 'more'}</span>
            <ExternalLink size={12} />
          </Link>
        )}
      </div>

      {/* remate derecho con mini cuadrado */}
      <div className="flex w-[8%] items-center justify-center">
        <Separator />
        <span className="-ml-1 h-1 w-1 rotate-45 bg-muted" />
      </div>
    </div>
  );
}
