"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import Meowl from "./Meowl"
import "./meowl.css"

// Fracción de la altura del SVG donde están los pies (las patitas).
const FEET_RATIO = 0.72
const TAKEOFF_MS = 320
const FLIGHT_MS = 1400

export interface MeowlFlyingHandle {
  flyTo: (target: HTMLElement) => Promise<void>
}

const t = (x: number, y: number) => `translate(${x}px, ${y}px)`
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const MeowlFlying = forwardRef<MeowlFlyingHandle, { size?: number }>(function MeowlFlying(
  { size = 116 },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const flyingRef = useRef(false)
  const [flying, setFlying] = useState(false)

  const place = (x: number, y: number) => {
    pos.current = { x, y }
    if (rootRef.current) rootRef.current.style.transform = t(x, y)
  }

  // Posición inicial ("casa"): abajo a la izquierda, ya visible.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const y = window.innerHeight - el.offsetHeight - 28
    place(24, y)
    el.style.visibility = "visible"
  }, [])

  const flyTo = async (target: HTMLElement) => {
    const el = rootRef.current
    if (!el || flyingRef.current) return

    const r = target.getBoundingClientRect()
    const to = {
      x: r.left + window.scrollX + r.width / 2 - el.offsetWidth / 2,
      y: r.top + window.scrollY - el.offsetHeight * FEET_RATIO,
    }
    const from = pos.current
    if (Math.hypot(to.x - from.x, to.y - from.y) < 12) return

    flyingRef.current = true
    setFlying(true)
    await wait(TAKEOFF_MS)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(to.x, to.y)
      flyingRef.current = false
      setFlying(false)
      return
    }

    const peak =
      Math.min(from.y, to.y) - clamp(Math.abs(to.x - from.x) * 0.12 + 90, 90, 220)
    const midX = (from.x + to.x) / 2

    const anim = el.animate(
      [
        { transform: t(from.x, from.y) },
        { transform: t(from.x, from.y - 70), offset: 0.18 },
        { transform: t(midX, peak), offset: 0.55 },
        { transform: t(to.x, to.y - 60), offset: 0.88 },
        { transform: t(to.x, to.y) },
      ],
      { duration: FLIGHT_MS, easing: "ease-in-out", fill: "forwards" },
    )

    try {
      await anim.finished
    } catch {
      /* animación cancelada */
    }

    place(to.x, to.y)
    anim.cancel()
    flyingRef.current = false
    setFlying(false)
  }

  useImperativeHandle(ref, () => ({ flyTo }))

  return (
    <div ref={rootRef} className="flying-meowl" style={{ visibility: "hidden" }}>
      <Meowl flying={flying} size={size} />
    </div>
  )
})

export default MeowlFlying
