"use client"

import Meowl from "./Meowl"
import type { TabId } from "@/lib/content"
import "./scenes.css"

const SCENE_CAPTIONS: Record<TabId, string> = {
  presentacion: "Meowl vigila la ventana al atardecer",
  experiencia: "Meowl revisa el estudio entre libros",
  habilidades: "Meowl lee las constelaciones",
  proyectos: "Meowl observa la ciudad que Kevin construye",
  blog: "Meowl espera en la biblioteca vacía",
}

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

export default function MeowlScene({
  scene,
  talking = false,
  className = "",
}: {
  scene: TabId
  talking?: boolean
  className?: string
}) {
  return (
    <div
      className={`diorama relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0d20] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className={`scene scene-${scene}`} aria-hidden="true">
        <div className="stars" />

        {scene === "presentacion" && (
          <>
            <div className="moon" />
            <div className="moon-crater" style={{ top: "22%", left: "34%", width: 18, height: 18 }} />
            <div className="moon-crater" style={{ top: "58%", left: "58%", width: 12, height: 12 }} />
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

        <div className="scene-vignette" />
      </div>

      {/* Meowl posado en el escenario */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <Meowl talking={talking} size={150} />
      </div>

      <p className="absolute left-4 top-4 z-20 max-w-[70%] text-xs font-medium text-white/60">
        {SCENE_CAPTIONS[scene]}
      </p>
    </div>
  )
}
