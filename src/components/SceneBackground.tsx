"use client"

import type { TabId } from "@/lib/content"
import "./meowl/scenes.css"

function Constellation() {
  return (
    <div className="constellation">
      <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(255,214,140,0.35)" strokeWidth="1.5" fill="none">
          <line x1="70" y1="150" x2="150" y2="120" />
          <line x1="150" y1="120" x2="230" y2="170" />
          <line x1="230" y1="170" x2="300" y2="120" />
          <line x1="300" y1="120" x2="350" y2="200" />
          <line x1="230" y1="170" x2="270" y2="260" />
          <line x1="270" y1="260" x2="320" y2="320" />
        </g>
        <g fill="#ffe6b0">
          <circle cx="70" cy="150" r="4" />
          <circle cx="150" cy="120" r="3" />
          <circle cx="230" cy="170" r="5" />
          <circle cx="300" cy="120" r="3" />
          <circle cx="350" cy="200" r="4" />
          <circle cx="270" cy="260" r="3.5" />
          <circle cx="320" cy="320" r="4" />
        </g>
        <g fill="rgba(255,230,176,0.5)">
          <circle cx="70" cy="150" r="8" />
          <circle cx="230" cy="170" r="9" />
          <circle cx="320" cy="320" r="8" />
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

      {scene === "presentacion" && (
        <>
          <div className="moon" />
          <div className="moon-crater" style={{ top: "24%", left: "34%", width: 24, height: 24 }} />
          <div className="moon-crater" style={{ top: "58%", left: "58%", width: 15, height: 15 }} />
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

      {scene === "blog" && <div className="shelf" />}

      <div className="scene-overlay" />
    </div>
  )
}
