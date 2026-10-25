// Rama de árbol en pixel art: percha de Meowl en la Presentación.
// El tronco llega hasta el borde derecho del viewBox para que la rama
// entre desde el borde exacto de la pantalla.
export default function PixelBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 112"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {/* Sombra bajo el tronco */}
      <g fill="#1c140d">
        <rect x="24" y="80" width="276" height="10" />
        <rect x="252" y="84" width="48" height="10" />
      </g>

      {/* Tronco */}
      <g fill="#4a3524">
        <rect x="16" y="56" width="284" height="22" />
        <rect x="252" y="38" width="48" height="44" />
        <rect x="28" y="44" width="38" height="12" />
      </g>
      <g fill="#6b4b2c">
        <rect x="16" y="56" width="252" height="6" />
        <rect x="252" y="38" width="44" height="6" />
        <rect x="28" y="44" width="38" height="4" />
      </g>

      {/* Ramitas */}
      <g fill="#4a3524">
        <rect x="104" y="40" width="10" height="20" />
        <rect x="92" y="26" width="16" height="16" />
        <rect x="82" y="12" width="12" height="16" />
        <rect x="176" y="28" width="12" height="32" />
        <rect x="162" y="12" width="16" height="18" />
      </g>

      {/* Hojas */}
      <g fill="#5d7a4a">
        <rect x="70" y="2" width="18" height="12" />
        <rect x="86" y="10" width="10" height="10" />
        <rect x="150" y="2" width="18" height="12" />
        <rect x="166" y="8" width="10" height="10" />
        <rect x="94" y="22" width="8" height="8" />
      </g>
    </svg>
  )
}
