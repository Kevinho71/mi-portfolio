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
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
      <div className="scene" aria-hidden="true">
        <div className="stars" />
        <div className="scene-vignette" />
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display relative z-10 text-[clamp(3.5rem,15vw,11rem)] font-semibold tracking-tight text-[#f3e9d8]"
      >
        Bienvenido
      </motion.h1>
    </div>
  )
}
