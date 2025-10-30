// ==========================
// 🧩 componente extra
// Lista tipada de comentarios de YouTube simulados
// Útil para: secciones de “social proof”, sliders, carousels o para poblar
// un componente de “comentarios recientes” sin depender de la API real.
// ==========================

export interface CommentData {
  /** Nombre visible del usuario en YouTube */
  username: string;
  /** Handle o @ del canal/usuario */
  handle: string;
  /** Ruta a la imagen/avatar local (optimiza con next/image si estás en Next.js) */
  avatarUrl: string;
  /** Texto del comentario */
  comment: string;
  /** Bandera por si quieres mostrar un badge tipo “Creador”, “YouTuber”, etc. */
  isYouTuber: boolean;
}

/**
 * commentsData
 *
 * - Dataset pequeño de comentarios reales/fake ya traducidos.
 * - Lo puedes pasar directo a un <CommentsList /> o a un carrusel.
 * - Si montas esto en producción, cámbialo por datos dinámicos o por
 *   una API interna que los traiga desde YouTube.
 */
export const commentsData: CommentData[] = [
  {
    username: 'Bob Koss',
    handle: '@bobkoss280',
    avatarUrl: '/images/png/youtube-pfp/bob-koss.png',
    comment:
      'Acabo de encontrar tu canal. Gran contenido. Gracias por tomarte el tiempo para hacer los videos.',
    isYouTuber: false,
  },
  {
    username: 'LUFFY',
    handle: '@dhanuzh.d',
    avatarUrl: '/images/png/youtube-pfp/luffy.png',
    comment:
      'Bro, ¿puedes pasarme tu configuración de Vim para VS Code? Me gusta mucho.',
    isYouTuber: false,
  },
  {
    username: 'Computer Engineer',
    handle: '@computerengineercemberkera3490',
    avatarUrl: '/images/png/youtube-pfp/computer-engineer.png',
    comment: '¡Me gustó!',
    isYouTuber: false,
  },
  {
    username: 'Nine',
    handle: '@Nineiscomplete',
    avatarUrl: '/images/png/youtube-pfp/nine.png',
    comment: 'Los streams están 🔥🔥',
    isYouTuber: false,
  },
  {
    username: "GR3Y'S ORG4N1CS",
    handle: '@GR3YSORG4N1CS',
    avatarUrl: '/images/png/youtube-pfp/GR3Ys-0RG4N1CS.png',
    comment:
      'Por la miniatura parece que te falta `rainbow-delimiters.nvim`, pero aparte de eso, se ve prácticamente igual (dentro de lo razonable) que VS Code.',
    isYouTuber: false,
  },
  {
    username: 'Val Alexander',
    handle: '@OxBuns',
    avatarUrl: '/images/png/youtube-pfp/Val-Alexander.png',
    comment: 'No me sorprende en lo absoluto — bien merecido 👏',
    isYouTuber: false,
  },
  {
    username: 'Douglas',
    handle: '@Douglas-PC',
    avatarUrl: '/images/png/youtube-pfp/Douglas.png',
    comment:
      'Me suscribí; sigue así. Buenas explicaciones técnicas, de programación, reseñas del IDE e info de código.',
    isYouTuber: false,
  },
  {
    username: 'Joffrey',
    handle: '@joffrey5601',
    avatarUrl: '/images/png/youtube-pfp/Joffrey.png',
    comment: 'Te lo mereces.',
    isYouTuber: false,
  },
  {
    username: 'Andriy Pashynnyk',
    handle: '@andriypashynnyk4278',
    avatarUrl: '/images/png/youtube-pfp/Andriy-Pashynnyk.png',
    comment: '¡Muy buen directo!',
    isYouTuber: false,
  },
  {
    username: "Someone You've Never Heard of",
    handle: '@someoneyouveneverheardof',
    avatarUrl: "/images/png/youtube-pfp/Someone-You've-Never-Heard-of.png",
    comment: '¡Me encantó!',
    isYouTuber: false,
  },
  {
    username: 'cariyaputta',
    handle: '@cariyaputta',
    avatarUrl: '/images/png/youtube-pfp/cariyaputta.png',
    comment: 'Bien.',
    isYouTuber: false,
  },
  {
    username: 'Improving Cow',
    handle: '@improving_cow',
    avatarUrl: '/images/png/youtube-pfp/Improving-Cow.png',
    comment: 'El mejor tutorial',
    isYouTuber: false,
  },
];
