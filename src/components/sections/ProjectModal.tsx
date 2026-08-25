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

  useEffect(() => {
    setImgIndex(0)
  }, [project?.name])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-slate-900/50 backdrop-blur-md"
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-card rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-border/60 sticky top-0 bg-card/95 backdrop-blur-md z-10 rounded-t-3xl">
              <div>
                <p className="text-xs font-semibold text-primary mb-1">
                  Proyecto destacado
                </p>
                <h3 className="text-2xl font-display text-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {project.role}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Carousel */}
            {project.images.length > 0 && (
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={`${basePath}/projects/${project.images[imgIndex]}`}
                      alt={`${project.name} captura ${imgIndex + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg text-foreground hover:bg-white hover:scale-110 transition-all flex items-center justify-center"
                        aria-label="Anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg text-foreground hover:bg-white hover:scale-110 transition-all flex items-center justify-center"
                        aria-label="Siguiente"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {project.images.length > 1 && (
                  <div className="flex justify-center gap-1.5 py-3">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === imgIndex ? "w-8 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                        aria-label={`Imagen ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                  Descripción
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                  Stack tecnológico
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                {project.note}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
              {project.type === "public" && project.url ? (
                <Button className="flex-1 gradient-brand text-white border-0 rounded-full" asChild>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-2" /> Abrir proyecto
                  </a>
                </Button>
              ) : null}
              <Button variant="outline" className="flex-1 rounded-full" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
