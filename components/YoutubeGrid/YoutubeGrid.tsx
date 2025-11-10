// ============================================================================
// 🧩 componente extra
// YoutubeGrid
// - Componente contenedor sencillo que inyecta los datos de comentarios
//   (commentsData) en el componente ScrollingTestimonials.
// - Su objetivo es aislar el “grid/sección” de testimonios para que puedas
//   importarlo donde lo necesites sin preocuparte por pasar props manualmente.
// - Incluye un wrapper <div> con altura mínima de pantalla para asegurar
//   un área de visualización adecuada del marquee vertical.
// ============================================================================

import ScrollingTestimonials from './ScrollingTestimonials';
import { commentsData } from './CommentData';

export default function YoutubeGrid() {
  return (
    <div className="relative min-h-screen">
      {/* 
        ScrollingTestimonials:
        - Recibe un array de testimonios (CommentData[])
        - Se encarga de dividir en columnas (desktop) o usar una sola (mobile)
        - Anima los elementos con GSAP y crea un marquee infinito
      */}
      <ScrollingTestimonials testimonials={commentsData} />
    </div>
  );
}
