'use client';

/*
  ───────────────────────────────────────────────────────────
  Wrapper muy simple sobre @radix-ui/react-collapsible
  Te da 3 componentes:
    - <Collapsible>         → contenedor/control del estado
    - <CollapsibleTrigger>  → botón/disparador para abrir/cerrar
    - <CollapsibleContent>  → contenido que se muestra/oculta
  Úsalo cuando quieras mostrar secciones plegables (FAQs, filtros, etc.)
  ───────────────────────────────────────────────────────────
*/

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

// Contenedor raíz: maneja open/closed, controlled o uncontrolled.
// Ej: <Collapsible defaultOpen>...</Collapsible>
const Collapsible = CollapsiblePrimitive.Root;

// Botón/disparador: lo que el usuario clickea para abrir/cerrar.
// Ej: <CollapsibleTrigger>Ver más</CollapsibleTrigger>
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// Contenido plegable: lo que se muestra cuando está abierto.
// Ej: <CollapsibleContent>Contenido...</CollapsibleContent>
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
