"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, Sparkles, Heart } from "lucide-react"

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const hardSkills = [
  { label: "Java",        icon: `${DEVICON}/java/java-original.svg` },
  { label: "TypeScript",  icon: `${DEVICON}/typescript/typescript-original.svg` },
  { label: "JavaScript",  icon: `${DEVICON}/javascript/javascript-original.svg` },
  { label: "Python",      icon: `${DEVICON}/python/python-original.svg` },
  { label: "Spring Boot", icon: `${DEVICON}/spring/spring-original.svg` },
  { label: "React",       icon: `${DEVICON}/react/react-original.svg` },
  { label: "FastAPI",     icon: `${DEVICON}/fastapi/fastapi-original.svg` },
  { label: "Express.js",  icon: `${DEVICON}/express/express-original.svg` },
  { label: "PostgreSQL",  icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { label: "MySQL",       icon: `${DEVICON}/mysql/mysql-original.svg` },
  { label: "MongoDB",     icon: `${DEVICON}/mongodb/mongodb-original.svg` },
  { label: "Docker",      icon: `${DEVICON}/docker/docker-original.svg` },
  { label: "Git",         icon: `${DEVICON}/git/git-original.svg` },
  { label: "Firebase",    icon: `${DEVICON}/firebase/firebase-original.svg` },
  { label: "Linux",       icon: `${DEVICON}/linux/linux-original.svg` },
  { label: "GCP",         icon: `${DEVICON}/googlecloud/googlecloud-original.svg` },
  { label: "MinIO",       icon: `${DEVICON}/minio/minio-original.svg` },
  { label: "Liquibase",   icon: `${DEVICON}/liquibase/liquibase-original.svg` },
  { label: "Flyway",      icon: `${DEVICON}/flyway/flyway-original.svg` },
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
    period: "2025 – 2026",
    description: "Desarrollo de sistema administrativo y transaccional para el Colegio de Administradores de Empresas Tarija.",
  },
  {
    title: "Plataforma de orientación vocacional — UCB",
    period: "2026",
    description: "Desarrollo de plataforma de test de orientación vocacional para UCB sede Tarija.",
  },
  {
    title: "Software de Gabinete Psicológico — UCB",
    period: "2026",
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
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles size={12} /> Sobre mí
          </div>
          <h2 className="text-4xl sm:text-5xl font-display tracking-tight mb-3">
            Un poco de mi <span className="gradient-text">historia</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skills, experiencia y formación — lo que me acompañó en el camino.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-display mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </span>
                Hard Skills
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {hardSkills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                    title={skill.label}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      width={32}
                      height={32}
                      className="transition-transform duration-200 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center">
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                  <Heart size={16} />
                </span>
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full bg-card border border-border/60 text-sm text-foreground/80 hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience + Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-display mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white">
                  <Briefcase size={16} />
                </span>
                Experiencia
              </h3>
              <div className="space-y-3">
                {experience.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Card className="soft-shadow border-border/60 rounded-2xl">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white">
                  <GraduationCap size={16} />
                </span>
                Estudios
              </h3>
              <div className="space-y-3">
                {education.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Card className="soft-shadow border-border/60 rounded-2xl">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <span className="text-[11px] font-medium text-accent bg-accent/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.place}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
