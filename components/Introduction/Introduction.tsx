/**
 * ============================================================
 * 🧩 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * Introducción
 * - Wrapper súper simple que reutiliza <SectionHeading />
 * - Útil para no repetir heading/subheading en varias páginas
 * - Puedes pasarle un `animationId` para que toda tu UI lo anime igual
 * ============================================================
 */

import SectionHeading from '@/components/SectionHeading';

export default function Introduction() {
  return (
    <SectionHeading
      heading="Introducción"
      subheading="Bienvenido a nuestro espacio digital donde la creatividad se encuentra con la innovación."
      animationId="intro"
    />
  );
}
