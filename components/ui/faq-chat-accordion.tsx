'use client';

/*
  FaqAccordion
  ------------------------------------------------------------------
  - Acordeón de preguntas frecuentes usando Radix + framer-motion.
  - Soporta:
      • icono por pregunta (izq/der)
      • estilos personalizados por prop
      • timestamp “última actualización”
  - Ideal para mostrar FAQs dentro de una landing / dashboard.
  - Ejemplo de uso:
        <FaqAccordion data={[
          { id: 1, question: '¿Qué es esto?', answer: 'Un FAQ.' },
          { id: 2, question: '¿Puedo editarlo?', answer: 'Sí.' },
        ]} />
  ------------------------------------------------------------------
*/

import * as React from 'react';
import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  /**
   * Texto de referencia (cuándo se actualizó / frecuencia)
   * Ej: "Every day, 9:01 AM"
   */
  timestamp?: string;
  /** Clase extra para el “bubble” de la pregunta */
  questionClassName?: string;
  /** Clase extra para el “bubble” de la respuesta */
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp = 'Every day, 9:01 AM',
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  // Guardamos qué item está abierto (Radix controla value)
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn('p-4', className)}>
      {/* Texto superior (opcional) */}
      {timestamp && (
        <div className="mb-4 text-sm text-muted-foreground">
          {timestamp}
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ''}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => {
          const isOpen = openItem === item.id.toString();

          return (
            <Accordion.Item
              key={item.id}
              value={item.id.toString()}
              className="mb-2"
            >
              {/* Header del acordeón */}
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                  {/* Bubble de la pregunta */}
                  <div
                    className={cn(
                      'relative flex items-center space-x-2 rounded-xl p-2 transition-colors',
                      isOpen
                        ? 'bg-primary/20 text-slate-300'
                        : 'bg-slate-600 text-slate-300 hover:bg-primary/10',
                      questionClassName,
                    )}
                  >
                    {/* Icono decorativo (opcional) */}
                    {item.icon && (
                      <span
                        className={cn(
                          'absolute bottom-6',
                          item.iconPosition === 'right' ? 'right-0' : 'left-0',
                        )}
                        style={{
                          transform:
                            item.iconPosition === 'right'
                              ? 'rotate(7deg)'
                              : 'rotate(-4deg)',
                        }}
                      >
                        {item.icon}
                      </span>
                    )}

                    <span className="font-medium">
                      {item.question}
                    </span>
                  </div>

                  {/* Botón +/- */}
                  <span
                    className={cn(
                      'text-muted-foreground',
                      isOpen && 'text-primary',
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-slate-300" />
                    ) : (
                      <Plus className="h-5 w-5 text-slate-300" />
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              {/* Contenido animado */}
              <Accordion.Content asChild forceMount>
                <motion.div
                    // Estado inicial y animaciones
                  initial="collapsed"
                  animate={isOpen ? 'open' : 'collapsed'}
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end overflow-hidden"
                >
                  <div className="ml-7 mt-1 md:ml-16">
                    <div
                      className={cn(
                        'relative max-w-xs rounded-2xl bg-primary px-4 py-2 text-primary-foreground',
                        answerClassName,
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
