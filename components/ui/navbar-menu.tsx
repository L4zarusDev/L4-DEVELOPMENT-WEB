'use client';

/*
  Menu UI (hover dropdown)
  ------------------------------------------------------------------
  Este módulo define 4 piezas reutilizables para un navbar moderno:
    1. Menu        → contenedor del menú con blur/glassmorphism.
    2. MenuItem    → item que al hacer hover muestra un panel flotante.
    3. ProductItem → tarjeta simple dentro del panel (con imagen + texto).
    4. HoveredLink → link estilizado para listas dentro del panel.

  Características:
  - Animaciones suaves con framer-motion (spring tweaked).
  - “layoutId" compartido para efecto de morph del panel.
  - Cierra el panel al sacar el mouse del <Menu>.
  - Pensado para usarse así:

      const [active, setActive] = useState<string | null>(null);

      <Menu setActive={setActive}>
        <MenuItem item="About" active={active} setActive={setActive}>
          ...contenido panel...
        </MenuItem>
        <MenuItem item="Services" active={active} setActive={setActive}>
          ...contenido panel...
        </MenuItem>
      </Menu>

  Nota: el padre (navbar) es el que tiene el estado `active`.
  ------------------------------------------------------------------
*/

import React from 'react';
import { motion } from 'motion/react'; // framer motion (nuevo entrypoint)
import Image from 'next/image';

// Ajustes de animación globales para el panel flotante
const transition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isActive = active === item;

  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      {/* Botón / link del menú */}
      <motion.p
        transition={{ duration: 0.3 }}
        className={`cursor-pointer rounded-full px-4 py-2 text-white/90 transition-all duration-200 hover:text-white ${
          isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
        } font-medium`}
      >
        {item}
      </motion.p>

      {/* Panel flotante */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {isActive && (
            <div className="absolute left-1/2 top-6 -translate-x-1/2 pt-4">
              <motion.div
                layoutId="active" // permite morph cuando cambia de item
                transition={transition}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <motion.div
                  layout // asegura layout animado al cambiar children
                  className="h-full w-max p-6"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      // Al salir del área del menú, cerramos el panel
      onMouseLeave={() => setActive(null)}
      className="relative flex justify-center space-x-8 rounded-full border border-white/20 bg-white/10 px-10 py-4 shadow-lg backdrop-blur-md"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
          {title}
        </h4>
        <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 transition-colors duration-200 hover:text-black dark:text-neutral-200"
    >
      {children}
    </a>
  );
};
