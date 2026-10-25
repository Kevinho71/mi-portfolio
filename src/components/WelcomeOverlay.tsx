"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import "./meowl/scenes.css"

export default function WelcomeOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden">
      <div className="scene" aria-hidden="true">
        <div className="stars" />
        <div className="scene-vignette" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: (t: number) => Math.round(t * 3) / 3 }}
        className="relative z-10 px-4 text-center font-display text-[clamp(2.25rem,10vw,7rem)] leading-none font-bold text-[#f5e6bf]"
        style={{ textShadow: "6px 6px 0 #05060f, 12px 12px 0 #2a2f5e" }}
      >
        Bienvenido
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        className="relative z-10 mt-8 flex items-center gap-2 text-base uppercase tracking-[0.2em] text-amber-300"
      >
        <span className="terminal-cursor inline-block h-4 w-3 bg-amber-300" aria-hidden="true" />
        cargando_portfolio
      </motion.p>
    </div>
  )
}
