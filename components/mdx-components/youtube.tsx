/**
 * Youtube
 * ------------------------------------------------------------
 * Componente simple para embeber un video de YouTube.
 *
 * Uso:
 * <Youtube id="dQw4w9WgXcQ" />
 *
 * Notas:
 * - Usa `aspect-video` para mantener la relación 16:9
 * - Le añade borde redondeado + sombra
 * - Sólo recibe el ID del video, no la URL completa
 */
export function Youtube({ id }: { id: string }) {
  return (
    <div>
      <iframe
        className="my-2 aspect-video w-full rounded-lg shadow-md"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        // añade los permisos más comunes
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
