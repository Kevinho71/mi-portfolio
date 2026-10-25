"use client"

import { memo, useState } from "react"
import MeowlSvg from "./MeowlSvg"
import "./meowl.css"

// El SVG es grande y no cambia con la conversación: se memoriza para que el
// efecto de máquina de escribir solo repinte la burbuja.
const MeowlArt = memo(MeowlSvg)

interface MeowlProps {
  /** Boca moviéndose (estado "hablando"). */
  talking?: boolean
  /** Texto del globo de diálogo (oculto si vacío). */
  bubble?: string
  /** Lado del globo respecto al personaje. */
  bubbleSide?: "left" | "center" | "right"
  /** Permite medir el globo para mantenerlo dentro de la pantalla. */
  bubbleRef?: React.RefObject<HTMLDivElement | null>
  /** Modo vuelo: alas abiertas, aleteo, rama oculta. */
  flying?: boolean
  /** Abre el panel de preguntas al hacer clic. */
  onActivate?: () => void
  /** Ancho/alto en px o cualquier unidad CSS. */
  size?: number | string
  className?: string
  style?: React.CSSProperties
}

export default function Meowl({
  talking = false,
  bubble,
  bubbleSide = "center",
  bubbleRef,
  flying = false,
  onActivate,
  size = 180,
  className,
  style,
}: MeowlProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`meowl ${onActivate ? "cursor-pointer" : ""} ${className ?? ""}`}
      style={{ width: size, height: typeof size === "number" ? size * 1.2 : undefined, ...style }}
      data-hover={hover}
      data-talking={talking}
      data-flying={flying}
      role={onActivate ? "button" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      aria-label={onActivate ? "Pregúntale algo a Meowl sobre Kevin" : undefined}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (!onActivate) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onActivate()
        }
      }}
    >
      <div
        ref={bubbleRef}
        className="meowl-bubble"
        data-show={!!bubble && bubble.length > 0}
        data-side={bubbleSide}
      >
        {bubble}
      </div>
      <MeowlArt />
    </div>
  )
}
