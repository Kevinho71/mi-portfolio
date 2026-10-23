"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Lock, Search } from "lucide-react"
import ProjectView, { type Project } from "./ProjectView"

const BASE_PATH = ""

const projects: Project[] = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    tagline:
      "Convierte a cada colegiado en una marca visible y al colegio en su motor: perfiles profesionales que captan oportunidades, administración que lo controla todo.",
    description:
      "Plataforma de gestión integral del Colegio de Administradores de Empresas de Tarija (+500 socios registrados). Reemplaza planillas, papel y cobros presenciales por un sistema único que sirve a administración, socios y público. Su diferencial: no es solo un sistema interno, es una vitrina profesional — perfiles tipo LinkedIn visibles al público, panel administrativo completo y CMS para que el colegio edite su web sin un desarrollador.",
    highlights: [
      "Perfiles profesionales tipo LinkedIn: cada socio publica experiencia, logros, certificados y contacto, visible para cualquier visitante.",
      "Panel administrativo completo: socios, empresas afiliadas, pagos, documentos, posts y contenido institucional.",
      "CMS integrado: el colegio edita su landing sin escribir código ni depender de un desarrollador.",
    ],
    impact: "+500 socios registrados · en producción (cadet.org.bo)",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "MinIO", "React", "TypeScript", "Tailwind CSS", "Docker"],
    type: "public",
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · Panel admin y oficina virtual con autenticación",
    images: ["cadet4.png", "cadet1.png", "cadet2.png", "cadet3.png"],
  },
  {
    name: "UCB Gabinete Psicológico",
    role: "Desarrollador Full Stack",
    tagline:
      "Transforma la salud mental estudiantil en decisiones: atención clínica digital, detección temprana con IA y evidencia para toda la universidad.",
    description:
      "Digitaliza por completo el servicio de psicología universitaria: consultas, historias clínicas, seguimiento de sesiones y reportes en un solo sistema. Lo que antes era papel, Excel e informes redactados a mano hoy es un flujo guiado de 8 pasos que deja la historia clínica armada y el reporte listo. Sobre esa base corre una capa de IA que apoya al psicólogo —no lo reemplaza—: triangula la información de entrevistas e historiales para redactar historias clínicas, detectar señales tempranas y sostener decisiones clínicas con evidencia. Para la universidad el resultado es visibilidad real del bienestar por carrera, semestre y departamento, con datos para decidir. Preparada para lanzarse a nivel nacional.",
    highlights: [
      "Digitalización total: consultas, historias clínicas, sesiones y reportes en un solo lugar, sin papel ni planillas paralelas.",
      "IA de apoyo clínico: triangula entrevistas e historiales para redactar historias clínicas, generar informes y detectar señales tempranas.",
      "Decisiones con evidencia: más de 28 indicadores de bienestar por carrera, semestre y departamento, con exportación en Word, Excel y PDF.",
    ],
    impact: "Consultas, historias clínicas y reportes automatizados · producción UCB",
    tech: ["Spring Boot", "Spring AI", "React", "TypeScript", "PostgreSQL", "Docker"],
    type: "public",
    url: "https://gabinete-psi-f.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · Acceso hasta login",
    images: ["gabinete1.png", "gabinete2.png", "gabinete3.png", "gabinete4.png"],
  },
  {
    name: "UCB Orientación Vocacional",
    role: "Desarrollador Full Stack",
    tagline:
      "Orientación vocacional convertida en embudo de captación: tests psicométricos configurables que se corrigen solos y se entregan por QR, desde un solo panel, a colegios de todo un país.",
    description:
      "Transforma el programa de Orientación Vocacional de la UCB —antes papel, corrección manual y reportes armados uno por uno— en una solución que evalúa, corrige, orienta y capta a escala. La UCB lanza campañas por gestión y colegio, asigna tests (MIDAS/CHASIDE) y habilita un QR: el estudiante responde desde su celular sin instalar nada y recibe su perfil vocacional y carreras sugeridas por correo. Todo se centraliza: resultados individuales y consolidados, tableros y exportación PDF/Excel/ZIP. El valor es estratégico: cada evaluación es un prospecto, cada carrera sugerida enlaza a la oferta UCB y cada colegio genera información para decidir dónde captar. Multi-sede y multi-gestión, lista para lanzamiento nacional.",
    highlights: [
      "Tests configurables (MIDAS/CHASIDE) que se corrigen solos con baremos ajustables.",
      "Captación por QR: el estudiante responde sin crear cuenta y recibe resultados por email.",
      "Un solo panel: resultados, tableros y exportación PDF/Excel/ZIP para dirección.",
    ],
    impact: "6 colegios de Tarija y 146 participantes · producción UCB",
    tech: ["Spring Boot", "Java", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "Docker"],
    type: "public",
    url: "https://front-ov-dev.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · Acceso hasta login",
    images: ["orientacion1.png", "orientacion2.png", "orientacion3.png", "orientacion4.png"],
  },
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)

  const openProject = (i: number) => {
    setDirection(1)
    setActiveIndex(i)
  }

  const closeProject = () => setActiveIndex(null)

  const goPrev = () => {
    setDirection(-1)
    setActiveIndex((i) => (i === null ? i : (i - 1 + projects.length) % projects.length))
  }

  const goNext = () => {
    setDirection(1)
    setActiveIndex((i) => (i === null ? i : (i + 1) % projects.length))
  }

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
              {"// Sistemas reales desarrollados para instituciones y empresas. Algunos son privados por acuerdos de confidencialidad."}
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
                <Card
                  className="flex flex-col h-full cursor-pointer group"
                  onClick={() => openProject(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(i) } }}
                  aria-label={`Ver detalles de ${project.name}`}
                >
                  {project.images.length > 0 && (
                    <div className="relative overflow-hidden border-b-2 border-border bg-muted" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={`${BASE_PATH}/projects/${project.images[0]}`}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
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
                      {project.tagline}
                    </p>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-accent">
                      ▸ {project.impact}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-3 flex flex-col gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 note-muted w-full">
                      {"// "}{project.note}
                    </p>
                    <div className="flex flex-wrap gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                        onClick={(e) => { e.stopPropagation(); openProject(i) }}
                      >
                        <Search size={13} className="mr-1.5" /> ver_detalles
                      </Button>

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

      <ProjectView
        projects={projects}
        activeIndex={activeIndex}
        direction={direction}
        basePath={BASE_PATH}
        onClose={closeProject}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}
