"use client"

import { useEffect, useRef, useState } from "react"
import Meowl from "./meowl/Meowl"
import "./meowl/scenes.css"

const WELCOME = "¡Hola! Soy Meowl, la mascota de Kevin. Te voy a mostrar quién es, qué sabe hacer y qué ha construido. ¿Empezamos?"

export default function WelcomeOverlay({ onBegin }: { onBegin: () => void }) {
  const [typed, setTyped] = useState("")
  const [done, setDone] = useState(false)
  const raf = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let i = 0
    raf.current = setInterval(() => {
      i += 1
      setTyped(WELCOME.slice(0, i))
      if (i >= WELCOME.length) {
        if (raf.current) clearInterval(raf.current)
        setTimeout(() => setDone(true), 350)
      }
    }, 26)
    return () => {
      if (raf.current) clearInterval(raf.current)
    }
  }, [])

  const talking = typed.length > 0 && !done

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="scene" aria-hidden="true">
        <div className="stars" />
        <div className="moon" style={{ top: "10%", right: "8%" }} />
        <div className="scene-vignette" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="flex flex-col items-center">
          <Meowl talking={talking} size={220} />
        </div>

        <p className="min-h-[4.5rem] max-w-xl text-lg leading-relaxed text-[#f3e9d8]">
          {typed}
          <span className="ml-0.5 inline-block h-[1.2em] w-[2px] translate-y-[3px] bg-amber-300 align-middle animate-pulse" />
        </p>

        <button
          onClick={onBegin}
          disabled={!done}
          className={`rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${
            done
              ? "bg-amber-300 text-[#191120] hover:bg-amber-200 hover:scale-[1.03] active:scale-[0.98]"
              : "cursor-default bg-white/5 text-white/30"
          }`}
        >
          Entrar al portfolio
        </button>
      </div>
    </div>
  )
}
