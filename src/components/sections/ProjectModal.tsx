"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface Project {
  name: string
  role: string
  description: string
  tech: string[]
  type: string
  url?: string
  note: string
  images: string[]
}

interface Props {
  project: Project | null
  onClose: () => void
  basePath: string
}

export default function ProjectModal({ project, onClose, basePath }: Props) {
  const [imgIndex, setImgIndex] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Reset slide on project change
  useEffect(() => {
    setImgIndex(0)
  }, [project?.name])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [project])

  const prev = () => setImgIndex((i) => (i - 1 + (project?.images.length ?? 1)) % (project?.images.length ?? 1))
  const next = () => setImgIndex((i) => (i + 1) % (project?.images.length ?? 1))

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-sm"
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
          {/* Scanlines en el overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, hsla(40,25%,88%,0.03) 2px, hsla(40,25%,88%,0.03) 3px)",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-2 border-border"
            style={{ boxShadow: "6px 6px 0 0 hsl(8 65% 45%)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b-2 border-border sticky top-0 bg-card z-10">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                  &gt; PROYECTO / DETALLE
                </p>
                <h3 className="text-xl font-display text-foreground">{project.name}</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                  &gt; {project.role}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-accent chromatic-hover flex-shrink-0 mt-1 transition-colors"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Image carousel */}
            {project.images.length > 0 && (
              <div className="relative bg-muted border-b-2 border-border">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={`${basePath}/projects/${project.images[imgIndex]}`}
                      alt={`${project.name} captura ${imgIndex + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.18 }}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 border-2 border-border text-foreground hover:border-accent hover:text-accent p-1.5 transition-colors chromatic-hover"
                        aria-label="Anterior"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 border-2 border-border text-foreground hover:border-accent hover:text-accent p-1.5 transition-colors chromatic-hover"
                        aria-label="Siguiente"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Slide dots */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 py-3">
                    {project.images.map((_, i) => (
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
            )}

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Description */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                  // descripcion
                </p>
                <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                  // stack_tecnologico
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Note */}
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
                // {project.note}
              </p>
            </div>

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
              {project.type === "public" && project.url ? (
                <Button size="sm" variant="default" className="flex-1" asChild>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-2" /> ./abrir_proyecto
                  </a>
                </Button>
              ) : null}
              <Button size="sm" variant="outline" className="flex-1" onClick={onClose}>
                [ESC] cerrar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
