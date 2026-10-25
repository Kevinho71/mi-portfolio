"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react"
import { getTechIcon } from "@/lib/techIcons"
import type { Project } from "@/lib/content"

/* Etiqueta de sección: // algo */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-sm font-mono uppercase tracking-widest text-amber-300/80">
      {children}
    </h3>
  )
}

/* Carrusel de capturas del proyecto */
function Carousel({ project }: { project: Project }) {
  const { images, name } = project
  const [index, setIndex] = useState(0)
  const total = images.length

  if (total === 0) return null

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total)

  return (
    <div className="overflow-hidden border-2 border-border bg-background">
      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={`/projects/${images[index]}`}
            alt={`${name} — captura ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        <span className="absolute bottom-3 right-3 border-2 border-border bg-background px-2 py-0.5 text-sm font-medium text-foreground">
          {index + 1} / {total}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className="pixel-btn absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-card text-foreground hover:text-amber-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className="pixel-btn absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-card text-foreground hover:text-amber-300"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t-2 border-border p-3">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver captura ${i + 1}`}
              aria-current={i === index}
              className={`relative h-12 w-16 shrink-0 overflow-hidden border-2 transition ${
                i === index
                  ? "border-amber-300 opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={`/projects/${image}`} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [project, onClose])

  // El portal necesita `document`; en SSR el detalle nunca está abierto.
  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-stretch justify-center overflow-hidden overscroll-contain bg-[#05060f]/85 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-4xl flex-col overflow-hidden border-2 border-border bg-card shadow-[8px_8px_0_0_#05060f] sm:h-auto sm:max-h-full"
          >
            {/* Cabecera fija */}
            <header className="flex shrink-0 items-start gap-3 border-b-2 border-border bg-card px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-mono uppercase tracking-widest text-amber-300/80">
                  {"// detalle_proyecto"}
                </p>
                <h2
                  id="project-detail-title"
                  className="truncate font-display text-lg text-foreground sm:text-xl"
                >
                  {project.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                autoFocus
                aria-label="Cerrar detalles"
                className="pixel-btn mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-background text-muted-foreground hover:text-amber-300"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 pb-8 pt-5 sm:px-7 sm:pt-6">
              {/* Tesis del proyecto */}
              <p className="text-sm font-medium tracking-wide text-amber-300">{project.role}</p>
              <p className="mt-2 max-w-3xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {project.tagline}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300/90 underline-offset-4 transition hover:text-amber-200 hover:underline"
                >
                  Ver sitio en vivo <ExternalLink size={13} />
                </a>
              )}

              {/* KPIs */}
              {project.kpis.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="border-2 border-border bg-background px-3 py-3 shadow-[3px_3px_0_0_#05060f]"
                    >
                      <p className="font-display text-lg leading-none text-amber-300">{kpi.value}</p>
                      <p className="mt-2 text-sm leading-snug text-muted-foreground">
                        {kpi.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Capturas */}
              <div className="mt-6">
                <Carousel key={project.name} project={project} />
              </div>

              {/* Stack */}
              <section className="mt-7">
                <Label>{"// stack_tecnologico"}</Label>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => {
                    const icon = getTechIcon(tech)
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 border-2 border-border bg-background px-2.5 py-1.5 text-sm font-medium text-foreground/85"
                      >
                        {icon && (
                          <img
                            src={icon}
                            alt=""
                            className="h-4 w-4 object-contain"
                            loading="lazy"
                          />
                        )}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </section>

              {/* Descripción */}
              <section className="mt-7">
                <Label>{"// descripcion"}</Label>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </section>

              {/* Lo destacado */}
              <section className="mt-7">
                <Label>{"// lo_destacado"}</Label>
                <ul className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-base leading-relaxed text-foreground/90"
                    >
                      <span className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true">
                        ▸
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="mt-7 text-sm font-mono uppercase tracking-widest text-muted-foreground/70">
                {"// "}
                {project.note}
              </p>

              {/* Acciones */}
              <div className="mt-7 flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-amber inline-flex items-center gap-2 bg-amber-300 px-4 py-2 text-base font-semibold text-[#0b0e1d] hover:bg-amber-200"
                  >
                    Abrir proyecto <ExternalLink size={15} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="pixel-btn inline-flex items-center gap-2 bg-background px-4 py-2 text-base font-medium text-foreground hover:bg-secondary"
                >
                  <ArrowLeft size={15} /> Volver a proyectos
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
