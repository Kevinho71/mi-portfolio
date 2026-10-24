"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import WelcomeOverlay from "@/components/WelcomeOverlay"
import MeowlScene from "@/components/meowl/MeowlScene"
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

  const View = VIEWS[tab]

  return (
    <AnimatePresence mode="wait">
      {phase === "welcome" ? (
        <motion.div key="welcome" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <WelcomeOverlay onBegin={() => setPhase("app")} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Barra superior */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d20]/75 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
              <button
                onClick={() => setTab("presentacion")}
                className="flex items-center gap-2 text-left"
                aria-label="Ir a la presentación"
              >
                <img src="/meowl.svg" alt="" className="h-7 w-6 object-contain" />
                <span className="font-display text-lg leading-none text-foreground">Kevin Guzman</span>
              </button>

              <nav
                className="ml-auto flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1"
                aria-label="Secciones"
              >
                {tabs.map((t) => {
                  const active = t.id === tab
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4"
                    >
                      {active && (
                        <motion.span
                          layoutId="tab-pill"
                          className="absolute inset-0 rounded-full bg-amber-300"
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
              </nav>
            </div>
          </header>

          {/* Contenido + escenario */}
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,420px)] lg:gap-10">
              {/* Escenario (móvil: arriba · escritorio: columna derecha fija) */}
              <div className="lg:order-2 lg:self-start lg:sticky lg:top-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`scene-${tab}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <MeowlScene scene={tab} className="h-[240px] sm:h-[300px] lg:h-[520px]" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Contenido de la pestaña */}
              <div className="lg:order-1">
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
              </div>
            </div>

            <footer className="mt-16 border-t border-white/10 pb-10 pt-8 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Kevin Guzman · Hecho con Next.js, Tailwind y un gato-búho que vigila la noche.
            </footer>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
