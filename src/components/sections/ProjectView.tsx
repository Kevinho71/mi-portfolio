"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTechIcon } from "@/lib/techIcons"

export interface Project {
  name: string
  role: string
  tagline: string
  description: string
  highlights: string[]
  impact: string
  tech: string[]
  type: string
  url?: string
  note: string
  images: string[]
}

interface Props {
  projects: Project[]
  activeIndex: number | null
  direction: number
  basePath: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
}

function Carousel({ images, name, basePath }: { images: string[]; name: string; basePath: string }) {
  const [imgIndex, setImgIndex] = useState(0)
  const prev = () => setImgIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex((i) => (i + 1) % images.length)

  return (
    <div className="mt-8 border-2 border-border bg-muted">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={`${basePath}/projects/${images[imgIndex]}`}
            alt={`${name} captura ${imgIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 border-2 border-border text-foreground hover:border-accent hover:text-accent p-1.5 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 border-2 border-border text-foreground hover:border-accent hover:text-accent p-1.5 transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={`w-2 h-2 transition-colors border border-border ${i === imgIndex ? "bg-accent" : "bg-muted-foreground/40"}`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectView({
  projects,
  activeIndex,
  direction,
  basePath,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const project = activeIndex === null ? null : projects[activeIndex]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") onPrev()
      else if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-background overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
        >
          {/* Titlebar (solo tema Win98) */}
          <div className="w98-only w98-titlebar">
            <span className="w98-titlebar-icon" aria-hidden="true">▣</span>
            <span className="w98-titlebar-text">{project.name}</span>
            <div className="w98-titlebar-controls">
              <span className="w98-caption" aria-hidden="true">_</span>
              <span className="w98-caption" aria-hidden="true">□</span>
              <button
                type="button"
                className="w98-caption w98-caption-close"
                aria-label="Cerrar proyecto"
                onClick={onClose}
              >
                ×
              </button>
            </div>
          </div>

          {/* Header (tema CRT) */}
          <div className="crt-only sticky top-0 z-30 border-b-2 border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                aria-label="Volver a proyectos"
              >
                <ArrowLeft size={16} /> volver
              </button>
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Side arrows (desktop) */}
          <button
            onClick={onPrev}
            className="hidden sm:flex fixed left-3 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-11 h-11 border-2 border-border bg-background/80 text-foreground hover:border-accent hover:text-accent transition-colors chromatic-hover"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={onNext}
            className="hidden sm:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-11 h-11 border-2 border-border bg-background/80 text-foreground hover:border-accent hover:text-accent transition-colors chromatic-hover"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={22} />
          </button>

          {/* Animated content */}
          <div className="project-view-body mx-auto max-w-7xl px-4 sm:px-12 py-10 sm:py-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.name}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
                  {/* Main */}
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
                      &gt; PROYECTO / DETALLE
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tight text-foreground leading-[1.05]">
                      {project.name}
                    </h2>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-3">
                      &gt; {project.role}
                    </p>
                    <p className="mt-5 text-lg sm:text-xl font-mono text-accent leading-relaxed max-w-3xl">
                      {project.tagline}
                    </p>

                    {/* Impact */}
                    <div className="mt-5 inline-flex items-center gap-2 border-2 border-accent/60 bg-accent/10 px-3 py-1.5">
                      <span className="w-1.5 h-1.5 bg-accent" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
                        {project.impact}
                      </span>
                    </div>

                    {project.images.length > 0 && (
                      <Carousel key={project.name} images={project.images} name={project.name} basePath={basePath} />
                    )}

                    {/* Description */}
                    <div className="mt-10">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
                        {"// descripcion"}
                      </p>
                      <p className="text-sm sm:text-base font-mono text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="mt-10">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
                        {"// lo_destacado"}
                      </p>
                      <ul className="space-y-3">
                        {project.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 text-sm sm:text-base font-mono text-foreground/90 leading-relaxed"
                          >
                            <span className="text-accent mt-1 flex-shrink-0">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Note */}
                    <p className="mt-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
                      {"// "}
                      {project.note}
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      {project.type === "public" && project.url && (
                        <Button size="sm" variant="default" className="sm:w-auto" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} className="mr-2" /> ./abrir_proyecto
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="sm:w-auto" onClick={onClose}>
                        <ArrowLeft size={14} className="mr-2" /> volver_a_proyectos
                      </Button>
                    </div>
                  </div>

                  {/* Side panel: tech */}
                  <aside className="lg:sticky lg:top-24 self-start">
                    <div className="border-2 border-border bg-card">
                      <div className="px-4 py-3 border-b-2 border-border">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                          {"// stack_tecnologico"}
                        </p>
                      </div>
                      <div className="p-4 grid grid-cols-2 gap-3">
                        {project.tech.map((t) => {
                          const icon = getTechIcon(t)
                          return (
                            <div
                              key={t}
                              className="flex flex-col items-center gap-2 p-3 border-2 border-border bg-background hover:border-accent transition-colors"
                            >
                              {icon ? (
                                <img
                                  src={icon}
                                  alt={t}
                                  width={34}
                                  height={34}
                                  className="h-[34px] w-[34px] object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="text-xs font-mono text-accent">{t}</span>
                              )}
                              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground text-center leading-tight">
                                {t}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Mobile nav */}
                    <div className="sm:hidden mt-6 flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={onPrev}>
                        <ChevronLeft size={16} className="mr-1" /> anterior
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={onNext}>
                        siguiente <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </aside>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de estado (solo tema Win98) */}
          <div className="w98-only w98-statusbar">
            <span>
              {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <span>ESC para cerrar · ← → para navegar</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
