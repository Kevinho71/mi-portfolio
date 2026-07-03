"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Lock } from "lucide-react"

const projects = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    description:
      "Plataforma integral para el Colegio de Administradores de Empresas de Tarija. Digitaliza la operación completa: afiliación digital, gestión de socios, cobros con lógica FIFO, agenda, CMS institucional y oficina virtual por colegiado. Reemplaza planillas y formularios en papel por flujos automatizados con roles diferenciados para administración, socios y público.",
    tech: ["React 19", "TypeScript", "Spring Boot 3.5", "PostgreSQL", "Flyway", "MinIO", "Docker"],
    type: "public",
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · Panel admin y oficina virtual con autenticación",
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
  },
]

export default function Projects() {
  return (
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
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
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
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex flex-col items-start gap-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">
                    // {project.note}
                  </p>
                  {project.type === "public" && project.url ? (
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="mr-2" /> ./ver_proyecto
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="w-full cursor-default opacity-50" disabled>
                      <Lock size={14} className="mr-2" /> acceso_privado
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
