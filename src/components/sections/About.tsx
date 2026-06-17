import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Briefcase } from "lucide-react"

const hardSkills = [
  "Java", "TypeScript", "JavaScript", "Python",
  "Spring Boot", "React", "FastAPI", "Express.js",
  "PostgreSQL", "MySQL", "MongoDB",
  "Docker", "Git", "Firebase", "Linux",
  "GCP", "MinIO", "Liquibase", "Flyway",
]

const softSkills = [
  "Resolución de problemas técnicos complejos",
  "Proactividad",
  "Arquitectura de sistemas",
  "Dirección de equipos",
  "Metodologías ágiles",
]

const experience = [
  {
    title: "Dev Backend — Favorcito",
    period: "Ene 2026 – May 2026",
    description: "Pasantía como desarrollador backend para plataforma web.",
  },
  {
    title: "Sistema administrativo — CADET",
    period: "2024 – 2025",
    description: "Desarrollo de sistema administrativo y transaccional para el Colegio de Administradores de Empresas Tarija.",
  },
  {
    title: "Plataforma de orientación vocacional — UCB",
    period: "2024 – 2025",
    description: "Desarrollo de plataforma de test de orientación vocacional para UCB sede Tarija.",
  },
  {
    title: "Software de Gabinete Psicológico — UCB",
    period: "2024 – 2025",
    description: "Desarrollo de sistema de gestión de gabinete psicológico para UCB sede Tarija.",
  },
]

const education = [
  {
    title: "Ingeniería de Sistemas",
    place: "Universidad Católica Boliviana — Sede Tarija",
    period: "2022 – actualidad",
  },
  {
    title: "Intercambio — Beca Full Tuition",
    place: "Pontificia Universidad Javeriana — Bogotá",
    period: "2024",
  },
  {
    title: "Dominio de inglés",
    place: "Centro Boliviano Americano (CBA)",
    period: "2018 – 2021",
  },
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <Badge variant="outline" className="mb-3 text-xs uppercase tracking-widest text-primary border-primary/40">
            Sobre mí
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">Quién soy</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Hard Skills</h3>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Soft Skills</h3>
              <ul className="space-y-2">
                {softSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience + Education */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-primary" /> Experiencia
              </h3>
              <div className="space-y-3">
                {experience.map((item) => (
                  <Card key={item.title} className="bg-secondary/30 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" /> Estudios
              </h3>
              <div className="space-y-3">
                {education.map((item) => (
                  <Card key={item.title} className="bg-secondary/30 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.place}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
