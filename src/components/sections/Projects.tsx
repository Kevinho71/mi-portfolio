import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Lock } from "lucide-react"

const projects = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    description:
      "Sistema administrativo y transaccional para el Colegio de Administradores de Empresas Tarija. Incluye landing pública, panel de administración protegido con autenticación, gestión de miembros, pagos y reportes.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    type: "public",
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · Admin con autenticación",
  },
  {
    name: "UCB Gabinete Psicológico",
    role: "Desarrollador Full Stack",
    description:
      "Plataforma de gestión del gabinete psicológico de la UCB sede Tarija. Permite el registro y seguimiento de pacientes, gestión de citas, historial clínico y generación de reportes. Acceso restringido a personal institucional.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    type: "public",
    url: "https://gabinete-psi-f.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional · Acceso hasta login",
  },
  {
    name: "UCB Orientación Vocacional",
    role: "Desarrollador Full Stack",
    description:
      "Plataforma web para la aplicación y evaluación de tests de orientación vocacional para estudiantes de la UCB sede Tarija. Incluye módulo de análisis de resultados y reportes para orientadores.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    type: "public",
    url: "https://front-ov-dev.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional · Acceso hasta login",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-secondary/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <Badge variant="outline" className="mb-3 text-xs uppercase tracking-widest text-primary border-primary/40">
            Proyectos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">Lo que he construido</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Sistemas reales desarrollados para instituciones y empresas. Algunos son privados por acuerdos de confidencialidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="flex flex-col bg-card border-border/50 hover:border-primary/40 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {project.type === "private" ? (
                    <Lock size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  ) : (
                    <ExternalLink size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  )}
                </div>
                <CardDescription className="text-xs text-primary/80 font-medium">
                  {project.role}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs border-border/60">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-4 flex flex-col items-start gap-3">
                <p className="text-xs text-muted-foreground italic">{project.note}</p>
                {project.type === "public" && project.url ? (
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-2" /> Ver proyecto
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" className="w-full cursor-default opacity-50" disabled>
                    <Lock size={14} className="mr-2" /> Acceso privado
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
