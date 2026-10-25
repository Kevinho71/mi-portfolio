"use client"

import type { TabId } from "@/lib/content"
import "./meowl/scenes.css"

/* Luna dibujada píxel a píxel sobre una grilla de 16×16 */
function PixelMoon() {
  const R = 7.6
  const craters = [
    { x: -2.5, y: -2, r: 1.7 },
    { x: 2, y: 2.5, r: 1.3 },
    { x: -1, y: 4, r: 0.9 },
  ]
  const cells: { x: number; y: number; fill: string }[] = []

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x + 0.5 - 8
      const dy = y + 0.5 - 8
      const d = Math.hypot(dx, dy)
      if (d > R) continue

      let fill = "#fdf2cc"
      if (d > R - 1) fill = "#e9d29b"
      else if (craters.some((c) => Math.hypot(dx - c.x, dy - c.y) <= c.r)) fill = "#e2c68e"

      cells.push({ x, y, fill })
    }
  }

  return (
    <svg viewBox="0 0 16 16" className="moon-pixel" shapeRendering="crispEdges" aria-hidden="true">
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill={c.fill} />
      ))}
    </svg>
  )
}

function Constellation() {
  return (
    <div className="constellation">
      <svg
        viewBox="0 0 400 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        <g stroke="#ffcf4d" strokeOpacity="0.5" strokeWidth="3" fill="none">
          <path d="M70 150 L150 120 L230 170 L300 120 L350 200 L270 260 L320 320" />
          <path d="M230 170 L270 260" />
        </g>
        <g fill="#ffe6a8">
          <rect x="67" y="147" width="6" height="6" />
          <rect x="147" y="117" width="6" height="6" />
          <rect x="227" y="167" width="6" height="6" />
          <rect x="297" y="117" width="6" height="6" />
          <rect x="347" y="197" width="6" height="6" />
          <rect x="267" y="257" width="6" height="6" />
          <rect x="317" y="317" width="6" height="6" />
        </g>
      </svg>
    </div>
  )
}

function Skyline() {
  const heights = [34, 58, 46, 72, 40, 62, 52, 78, 44, 66]
  return (
    <div className="skyline" aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="building" style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}

// Fondo de escenario a pantalla completa para cada pestaña.
export default function SceneBackground({ scene }: { scene: TabId }) {
  return (
    <div className={`scene scene-${scene}`} aria-hidden="true">
      <div className="stars" />
      <div className="sky-bands" />

      {scene === "presentacion" && (
        <>
          <PixelMoon />
          <div className="mountains" />
        </>
      )}

      {scene === "experiencia" && (
        <>
          <div className="lamp-glow" />
          <div className="book-stack">
            <i /><i /><i /><i />
          </div>
        </>
      )}

      {scene === "habilidades" && <Constellation />}

      {scene === "proyectos" && <Skyline />}

      {scene === "blog" && (
        <div className="shelf">
          {/* Percha: sobre el extremo derecho del estante */}
          <span data-meowl-perch className="shelf-perch" aria-hidden="true" />
        </div>
      )}

      <div className="scene-overlay" />
    </div>
  )
}
