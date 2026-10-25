"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Loader2, Send, X } from "lucide-react"
import WelcomeOverlay from "@/components/WelcomeOverlay"
import SceneBackground from "@/components/SceneBackground"
import MeowlFlying, { type MeowlFlyingHandle } from "@/components/meowl/MeowlFlying"
import { PresentacionTab, ExperienciaTab, HabilidadesTab, ProyectosTab, BlogTab } from "@/components/tabs"
import { tabs, type TabId } from "@/lib/content"
import { SECTION_COMMENTS } from "@/lib/meowl/comments"
import { streamChat } from "@/lib/meowl/chat-client"

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

  // Asistente: panel de pregunta + respuesta en la burbuja del personaje.
  const [askOpen, setAskOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [busy, setBusy] = useState(false)
  const [answer, setAnswer] = useState("")
  const interactionIdRef = useRef<string | undefined>(undefined)
  const answerRef = useRef("")
  const askingRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)

  const View = VIEWS[tab]

  const firstFlightRef = useRef(true)

  // Vuela a la percha de la pestaña activa y, al aterrizar, comenta la sección.
  useEffect(() => {
    if (phase !== "app") return
    let cancelled = false

    // La percha del contenido manda. Solo si la pestaña no tiene ninguna dentro
    // de <main> (Blog la tiene en el estante del escenario de fondo) se usa esa.
    const findPerch = () =>
      document.querySelector<HTMLElement>("main [data-meowl-perch]") ??
      document.querySelector<HTMLElement>("[data-meowl-perch]")

    const isFirst = firstFlightRef.current
    firstFlightRef.current = false
    // En Blog se espera al fundido del escenario (600 ms) para que la percha
    // del estante ya esté montada en el DOM.
    const delay = isFirst ? 750 : tab === "blog" ? 700 : 420

    let attempt = 0
    let retry: ReturnType<typeof setTimeout> | undefined

    const fly = async () => {
      if (cancelled) return
      const perch = findPerch()
      if (!perch) {
        if (attempt < 2) {
          attempt += 1
          retry = setTimeout(fly, 250)
        }
        return
      }

      await meowlRef.current?.flyTo(perch)
      if (cancelled) return
      // Mientras el visitante conversa, la sección no interrumpe.
      if (!askingRef.current) meowlRef.current?.say(SECTION_COMMENTS[tab])
    }

    const id = setTimeout(fly, delay)
    return () => {
      cancelled = true
      clearTimeout(id)
      if (retry) clearTimeout(retry)
    }
  }, [phase, tab])

  // Cerrar el panel con Escape.
  useEffect(() => {
    if (!askOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAskOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [askOpen])

  // Cortar la petición si se desmonta.
  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const ask = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = question.trim()
    if (!text || busy) return

    setQuestion("")
    setBusy(true)
    setAnswer("")
    answerRef.current = ""
    askingRef.current = true

    const controller = new AbortController()
    abortRef.current = controller
    meowlRef.current?.streamStart()

    try {
      await streamChat(
        text,
        interactionIdRef.current,
        {
          onText: (chunk) => {
            answerRef.current += chunk
            meowlRef.current?.streamChunk(chunk)
          },
          onDone: (id) => {
            if (id) interactionIdRef.current = id
          },
          onError: (message) => {
            const line = `⚠ ${message}`
            answerRef.current += line
            meowlRef.current?.streamChunk(line)
          },
        },
        controller.signal,
      )
    } catch (err) {
      if (!controller.signal.aborted) {
        const line = `⚠ ${err instanceof Error ? err.message : "Error de conexión"}`
        answerRef.current += line
        meowlRef.current?.streamChunk(line)
      }
    } finally {
      // Al terminar de escribir, la burbuja se sostiene 4 s y desaparece.
      meowlRef.current?.streamEnd()
      setAnswer(answerRef.current)
      setBusy(false)
      askingRef.current = false
      abortRef.current = null
    }
  }

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

          {/* Meowl volador: vuela a la percha, comenta y responde preguntas */}
          <MeowlFlying
            ref={meowlRef}
            size={116}
            onActivate={() => setAskOpen((open) => !open)}
          />

          {/* Navbar flotante centrada */}
          <nav className="fixed left-1/2 top-4 z-40 max-w-[94vw] -translate-x-1/2">
            <div className="pixel-shadow flex items-center gap-1 overflow-x-auto border-2 border-border bg-[#0d1026] p-1">
              {tabs.map((t) => {
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative whitespace-nowrap px-3 py-1.5 text-base font-medium transition-colors sm:px-4"
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 bg-primary shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.35)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        active ? "text-[#0b0e1d]" : "text-muted-foreground hover:text-foreground"
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
          </main>

          {/* Panel del asistente */}
          <AnimatePresence>
            {askOpen && (
              <motion.form
                key="ask-meowl"
                onSubmit={ask}
                initial={{ opacity: 0, y: 12, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 12, x: "-50%" }}
                transition={{ duration: 0.18 }}
                style={{ boxShadow: "6px 6px 0 0 #05060f" }}
                className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,440px)] border-2 border-border bg-card p-3"
                aria-label="Pregúntale a Meowl sobre Kevin"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-amber-300/80">
                    {"// pregúntale a meowl"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAskOpen(false)}
                    aria-label="Cerrar el panel"
                    className="text-muted-foreground transition hover:text-amber-300"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="¿Qué stack usa Kevin?"
                    disabled={busy}
                    aria-label="Tu pregunta para Meowl"
                    className="min-w-0 flex-1 border-2 border-border bg-background px-3 py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-amber-300"
                  />
                  <button
                    type="submit"
                    disabled={busy || !question.trim()}
                    aria-label="Preguntar"
                    className="pixel-btn flex h-10 w-10 shrink-0 items-center justify-center bg-amber-300 text-[#0b0e1d] hover:bg-amber-200 disabled:opacity-40"
                  >
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  La respuesta se escribe en la burbuja de Meowl.
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Anuncio accesible de la última respuesta completa */}
          <p className="sr-only" role="status" aria-live="polite">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
