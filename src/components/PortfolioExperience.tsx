"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import WelcomeOverlay from "@/components/WelcomeOverlay"
import SceneBackground from "@/components/SceneBackground"
import MeowlFlying, { type MeowlFlyingHandle } from "@/components/meowl/MeowlFlying"
import { PresentacionTab, ExperienciaTab, HabilidadesTab, ProyectosTab, BlogTab } from "@/components/tabs"
import { tabs, type TabId } from "@/lib/content"

const VIEWS: Record<TabId, React.ComponentType> = {
  presentacion: PresentacionTab,
  experiencia: ExperienciaTab,
  habilidades: HabilidadesTab,
  proyectos: ProyectosTab,
  blog: BlogTab,
}

export default function PortfolioExperience() {
  const [phase, setPhase] = useState<"welcome" | "app">("welcome")
  const [tab, setTab] = useState<TabId>("presentacion")
  const meowlRef = useRef<MeowlFlyingHandle>(null)

  const View = VIEWS[tab]

  const firstFlightRef = useRef(true)

  // Vuela a la percha de la pestaña activa (vuelo inicial y en cada cambio).
  useEffect(() => {
    if (phase !== "app") return
    const delay = firstFlightRef.current ? 750 : 420
    firstFlightRef.current = false
    const id = setTimeout(() => {
      const perch = document.querySelector<HTMLElement>("[data-meowl-perch]")
      if (perch) meowlRef.current?.flyTo(perch)
    }, delay)
    return () => clearTimeout(id)
  }, [phase, tab])

  return (
    <AnimatePresence mode="wait">
      {phase === "welcome" ? (
        <motion.div key="welcome" exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
          <WelcomeOverlay onDone={() => setPhase("app")} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Fondo: escenario de la pestaña activa */}
          <div className="fixed inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${tab}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <SceneBackground scene={tab} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Meowl volador: vuela a la percha de cada pestaña */}
          <MeowlFlying ref={meowlRef} size={116} />

          {/* Navbar flotante centrada */}
          <nav className="fixed left-1/2 top-4 z-40 max-w-[94vw] -translate-x-1/2">
            <div className="glow-soft flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0d20]/70 p-1 backdrop-blur-md">
              {tabs.map((t) => {
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4"
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-lg bg-amber-300"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        active ? "text-[#191120]" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Contenido */}
          <main className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${tab}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <View />
              </motion.div>
            </AnimatePresence>

            <footer className="mt-16 border-t border-white/10 pb-6 pt-8 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Kevin Guzman · Hecho con Next.js, Tailwind y un gato-búho que vigila la noche.
            </footer>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
