"use client"

import { useState } from "react"
import MeowlSvg from "./MeowlSvg"
import "./meowl.css"

interface MeowlProps {
  /** Boca moviéndose (estado "hablando"). */
  talking?: boolean
  /** Texto del globo de diálogo (oculto si vacío). */
  bubble?: string
  /** Modo vuelo: alas abiertas, aleteo, rama oculta. */
  flying?: boolean
  /** Ancho/alto en px o cualquier unidad CSS. */
  size?: number | string
  className?: string
  style?: React.CSSProperties
}

export default function Meowl({
  talking = false,
  bubble,
  flying = false,
  size = 180,
  className,
  style,
}: MeowlProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`meowl ${className ?? ""}`}
      style={{ width: size, height: typeof size === "number" ? size * 1.2 : undefined, ...style }}
      data-hover={hover}
      data-talking={talking}
      data-flying={flying}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="meowl-bubble" data-show={!!bubble && bubble.length > 0} role="status" aria-live="polite">
        {bubble}
      </div>
      <MeowlSvg />
    </div>
  )
}
