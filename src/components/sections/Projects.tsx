"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Lock, Search, Rocket } from "lucide-react"
import ProjectModal, { type Project } from "./ProjectModal"

const BASE_PATH = "/mi-portfolio"

const projects: Project[] = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    description:
      "Plataforma integral para el Colegio de Administradores de Empresas de Tarija. Digitaliza la operación completa: afiliación digital, gestión de socios, cobros con lógica FIFO, agenda, CMS institucional y oficina virtual por colegiado. Reemplaza planillas y formularios en papel por flujos automatizados con roles diferenciados para administración, socios y público.",
    tech: ["React 19", "TypeScript", "Spring Boot 3.5", "PostgreSQL", "Flyway", "MinIO", "Docker"],
    type: "public",
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · Panel admin y oficina virtual con autenticación",
    images: ["cadet1.png", "cadet2.png", "cadet3.png"],
  },
  {
    name: "UCB Gabinete Psicológico",
    role: "Desarrollador Full Stack",
    description:
      "Sistema de gestión clínica para el gabinete psicológico universitario. Cubre registro de pacientes en 8 pasos, sesiones terapéuticas, historial clínico, 28+ gráficas analíticas y exportación en Word, Excel y PDF. Integra Google Gemini para generar resúmenes clínicos automáticos e informes de orientación vocacional.",
    tech: ["React 19", "TypeScript", "Spring Boot 4", "PostgreSQL", "Spring AI", "Gemini", "Docker"],
    type: "public",
    url: "https://gabinete-psi-f.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · Acceso hasta login",
    images: ["gabinete1.png", "gabinete2.png", "gabinete3.png", "gabinete4.png"],
  },
  {
    name: "UCB Orientación Vocacional",
    role: "Desarrollador Full Stack",
    description:
      "Plataforma para campañas itinerantes de orientación vocacional en colegios de Bolivia. Los estudiantes rinden tests MIDAS y CHASIDE desde el celular vía QR sin login. Motor de cálculo psicométrico con baremos configurables, envío automático de resultados por email y exportación masiva de reportes en PDF, Excel y ZIP.",
    tech: ["React 19", "TypeScript", "Spring Boot 4", "PostgreSQL", "Flyway", "jsPDF", "Docker"],
    type: "public",
    url: "https://front-ov-dev.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · Acceso hasta login",
    images: ["orientacion1.png", "orientacion2.png", "orientacion3.png", "orientacion4.png"],
  },
]

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="py-24 relative">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <Rocket size={12} /> Proyectos destacados
            </div>
            <h2 className="text-4xl sm:text-5xl font-display tracking-tight mb-3">
              Lo que he <span className="gradient-text">construido</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistemas reales en producción, desarrollados para instituciones y empresas.
              Algunos son privados por acuerdos de confidencialidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  className="flex flex-col h-full cursor-pointer group soft-shadow border-border/60 rounded-2xl overflow-hidden"
                  onClick={() => setActive(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(project) }}
                  aria-label={`Ver detalles de ${project.name}`}
                >
                  {project.images.length > 0 && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={`${BASE_PATH}/projects/${project.images[0]}`}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                        <span className="bg-white/95 text-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <Search size={14} /> Ver detalles
                        </span>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-2 pt-5">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-display group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      {project.type === "private" ? (
                        <Lock size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
                      ) : (
                        <ExternalLink size={16} className="text-primary flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <CardDescription className="text-sm text-primary/80 font-medium">
                      {project.role}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 pb-3">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="outline" className="rounded-full font-normal">+{project.tech.length - 4}</Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 flex flex-col gap-2">
                    <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setActive(project) }}
                      >
                        <Search size={13} className="mr-1.5" /> Detalles
                      </Button>

                      {project.type === "public" && project.url ? (
                        <Button size="sm" className="flex-1 gradient-brand text-white border-0 rounded-full" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={13} className="mr-1.5" /> Visitar
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="flex-1 rounded-full cursor-default opacity-50" disabled>
                          <Lock size={13} className="mr-1.5" /> Privado
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        basePath={BASE_PATH}
      />
    </>
  )
}
