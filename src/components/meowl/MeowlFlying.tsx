"use client"

import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react"
import Meowl from "./Meowl"
import "./meowl.css"

// Fracción de la altura del SVG donde están los pies (las patitas).
const FEET_RATIO = 0.72
const TAKEOFF_MS = 320
const FLIGHT_MS = 1400
// Máquina de escribir: un carácter cada 16 ms (~60 por segundo).
const TICK_MS = 16

export interface MeowlFlyingHandle {
  flyTo: (target: HTMLElement) => Promise<void>
  /** Escribe un texto letra por letra; se oculta 4 s después de terminar. */
  say: (text: string) => void
  /** Inicia una respuesta en streaming (boca abierta, burbuja a la espera). */
  streamStart: () => void
  /** Agrega un fragmento a la respuesta que se está escribiendo. */
  streamChunk: (text: string) => void
  /** Cierra el streaming: al terminar de escribir, espera 4 s y se oculta. */
  streamEnd: () => void
  /** Oculta la burbuja de inmediato. */
  clearBubble: () => void
}

const t = (x: number, y: number) => `translate(${x}px, ${y}px)`
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

type BubbleSide = "left" | "center" | "right"

// Mantiene el globo dentro de la pantalla: si no entra arriba del personaje,
// lo baja lo justo para que se lea completo (nunca se recorta).
function applyBubbleShift(el: HTMLElement, charTopInDocument: number) {
  const charTop = charTopInDocument - window.scrollY
  const needed = Math.max(0, Math.round(el.offsetHeight + 8 - charTop))
  el.style.setProperty("--bubble-shift", `${needed}px`)
}

const MeowlFlying = forwardRef<
  MeowlFlyingHandle,
  { size?: number; onActivate?: () => void; onSpeechEnd?: () => void }
>(function MeowlFlying({ size = 116, onActivate, onSpeechEnd }, ref) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const flyingRef = useRef(false)
  const [flying, setFlying] = useState(false)

  /* ---------- Burbuja + máquina de escribir ---------- */
  const [bubble, setBubble] = useState("")
  const [bubbleSide, setBubbleSide] = useState<BubbleSide>("center")
  const [talking, setTalking] = useState(false)
  const bubbleElRef = useRef<HTMLDivElement>(null)

  const queue = useRef("")
  const revealed = useRef(0)
  const streaming = useRef(false)
  const ticker = useRef<number | null>(null)

  const stopTicker = () => {
    if (ticker.current !== null) {
      window.clearInterval(ticker.current)
      ticker.current = null
    }
  }

  const finishSpeech = () => {
    stopTicker()
    setTalking(false)
    onSpeechEnd?.()
  }

  const startTicker = () => {
    if (ticker.current !== null) return
    ticker.current = window.setInterval(() => {
      const target = queue.current
      if (revealed.current < target.length) {
        revealed.current += 1
        setBubble(target.slice(0, revealed.current))
        return
      }
      if (!streaming.current) finishSpeech()
    }, TICK_MS)
  }

  // Elige el lado de la burbuja para que no se salga de la pantalla.
  const currentSide = (): BubbleSide => {
    const el = rootRef.current
    if (!el) return "center"
    const center = pos.current.x - window.scrollX + el.offsetWidth / 2
    if (center < 200) return "left"
    if (center > window.innerWidth - 200) return "right"
    return "center"
  }

  // Si el personaje está muy cerca del borde superior, el globo se corre
  // hacia abajo lo justo para no salirse de la pantalla.
  useLayoutEffect(() => {
    const el = bubbleElRef.current
    if (el) applyBubbleShift(el, pos.current.y)
  }, [bubble])

  useEffect(() => {
    const onMove = () => {
      const el = bubbleElRef.current
      if (el) applyBubbleShift(el, pos.current.y)
    }
    window.addEventListener("scroll", onMove, { passive: true })
    window.addEventListener("resize", onMove)
    return () => {
      window.removeEventListener("scroll", onMove)
      window.removeEventListener("resize", onMove)
    }
  }, [])

  const resetSpeech = (text: string, isStreaming: boolean) => {
    stopTicker()
    queue.current = text
    revealed.current = 0
    streaming.current = isStreaming
    setBubble(isStreaming ? "…" : "")
    setBubbleSide(currentSide())
    setTalking(true)
    startTicker()
  }

  const clearBubble = () => {
    stopTicker()
    queue.current = ""
    revealed.current = 0
    streaming.current = false
    setTalking(false)
    setBubble("")
  }

  // La burbuja ya escrita no se oculta sola: se queda hasta que el visitante
  // haga clic en cualquier parte de la página.
  useEffect(() => {
    if (!bubble || talking) return

    const dismiss = () => {
      if (ticker.current !== null) {
        window.clearInterval(ticker.current)
        ticker.current = null
      }
      queue.current = ""
      revealed.current = 0
      streaming.current = false
      setTalking(false)
      setBubble("")
    }

    document.addEventListener("pointerdown", dismiss, true)
    return () => document.removeEventListener("pointerdown", dismiss, true)
  }, [bubble, talking])

  /* ---------- Posición y vuelo ---------- */
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

  // Limpieza del temporizador al desmontar.
  useEffect(() => {
    return () => {
      if (ticker.current !== null) window.clearInterval(ticker.current)
    }
  }, [])

  const flyTo = async (target: HTMLElement) => {
    const el = rootRef.current
    if (!el || flyingRef.current) return

    const r = target.getBoundingClientRect()
    const scrollX = window.scrollX
    const rawX = r.left + scrollX + r.width / 2 - el.offsetWidth / 2
    const to = {
      // La percha puede estar fuera de pantalla (p. ej. una card dentro del
      // carrusel): Meowl nunca debe salirse del viewport.
      x: clamp(rawX, scrollX + 8, scrollX + window.innerWidth - el.offsetWidth - 8),
      y: r.top + window.scrollY - el.offsetHeight * FEET_RATIO,
    }
    const from = pos.current
    if (Math.hypot(to.x - from.x, to.y - from.y) < 12) return

    // No se habla en pleno vuelo.
    clearBubble()

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

  useImperativeHandle(ref, () => ({
    flyTo,
    say: (text: string) => {
      if (!text) return
      resetSpeech(text, false)
    },
    streamStart: () => resetSpeech("", true),
    streamChunk: (text: string) => {
      if (!text) return
      queue.current += text
      startTicker()
    },
    streamEnd: () => {
      streaming.current = false
      startTicker()
    },
    clearBubble,
  }))

  return (
    <div ref={rootRef} className="flying-meowl" style={{ visibility: "hidden" }}>
      <Meowl
        flying={flying}
        size={size}
        bubble={bubble}
        bubbleSide={bubbleSide}
        bubbleRef={bubbleElRef}
        talking={talking && !flying}
        onActivate={onActivate}
      />
    </div>
  )
})

export default MeowlFlying
