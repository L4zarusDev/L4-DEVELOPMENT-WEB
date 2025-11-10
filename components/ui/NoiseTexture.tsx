// ⬇️ Pequeño overlay de ruido para darle textura a todo el sitio
// Úsalo una sola vez en la raíz (layout) para no duplicar SVGs.
export default function NoiseTexture() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* 
        SVG con fractal noise:
        - feTurbulence genera el “ruido”
        - feColorMatrix lo pasa a escala de grises
        - feComponentTransfer ajusta la opacidad por niveles
        - El rect lo pinta en toda la pantalla
        - La opacidad en la clase controla qué tan visible es
      */}
      <svg width="100%" height="100%" className="h-full w-full opacity-[0.07]">
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            {/* genera el patrón de ruido */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves={3}
              stitchTiles="stitch"
            />
            {/* lo desatura para que no tenga tonos raros */}
            <feColorMatrix type="saturate" values="0" />
            {/* ajusta las “bandas” de opacidad del ruido */}
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.5 0.7 0.9 1" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* pintamos el ruido sobre todo el viewport */}
        <rect width="100%" height="100%" fill="white" filter="url(#noise)" />
      </svg>
    </div>
  );
}
