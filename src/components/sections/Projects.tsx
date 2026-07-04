"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Lock, Search } from "lucide-react"
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
      <section id="projects" className="py-24 border-t-2 border-border/40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
              &gt; SECTION_03 / PROYECTOS
            </p>
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">Lo que he construido</h2>
            <p className="mt-3 font-mono text-sm text-muted-foreground max-w-xl">
              // Sistemas reales desarrollados para instituciones y empresas. Algunos son privados por acuerdos de confidencialidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Card clickeable para abrir modal */}
                <Card
                  className="flex flex-col h-full cursor-pointer group"
                  onClick={() => setActive(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(project) }}
                  aria-label={`Ver detalles de ${project.name}`}
                >
                  {/* Thumbnail de la primera imagen */}
                  {project.images.length > 0 && (
                    <div className="relative overflow-hidden border-b-2 border-border" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={`${BASE_PATH}/projects/${project.images[0]}`}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay hover con icono */}
                      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="border-2 border-accent text-accent p-2">
                          <Search size={22} />
                        </span>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base text-foreground group-hover:text-accent transition-colors">
                        {project.name}
                      </CardTitle>
                      {project.type === "private" ? (
                        <Lock size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      ) : (
                        <ExternalLink size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <CardDescription className="text-accent">
                      &gt; {project.role}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <Badge key={t} variant="outline">{t}</Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="secondary">+{project.tech.length - 4}</Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 flex flex-col gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 w-full">
                      // {project.note}
                    </p>
                    <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                      {/* Botón ver detalles — abre modal */}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                        onClick={(e) => { e.stopPropagation(); setActive(project) }}
                      >
                        <Search size={13} className="mr-1.5" /> ver_detalles
                      </Button>

                      {/* Botón ir al proyecto — link externo */}
                      {project.type === "public" && project.url ? (
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={13} className="mr-1.5" /> ir_al_sitio
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="flex-1 cursor-default opacity-50" disabled>
                          <Lock size={13} className="mr-1.5" /> privado
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
