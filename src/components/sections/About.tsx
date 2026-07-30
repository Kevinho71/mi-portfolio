"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Briefcase } from "lucide-react"

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
    <section id="about" className="py-24 border-t-2 border-border/40 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
            &gt; SECTION_02 / SOBRE_MI
          </p>
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight">Quién soy</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-display mb-4 text-foreground">// Hard Skills</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {hardSkills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex flex-col items-center gap-1.5 p-2 border-2 border-border bg-card hover:border-accent transition-colors group"
                    title={skill.label}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      width={28}
                      height={28}
                      className="transition-transform duration-200 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-accent transition-colors leading-tight text-center">
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-display mb-4 text-foreground">// Soft Skills</h3>
              <ul className="space-y-2">
                {softSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                    <span className="text-accent">▸</span>
                    {skill}
                  </li>
                ))}
              </ul>
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
              <h3 className="text-lg font-display mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-primary" /> // Experiencia
              </h3>
              <div className="space-y-4">
                {experience.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Card>
                      <CardContent className="p-4 pt-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-display text-foreground">{item.title}</p>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" /> // Estudios
              </h3>
              <div className="space-y-4">
                {education.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Card>
                      <CardContent className="p-4 pt-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-display text-foreground">{item.title}</p>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">{item.place}</p>
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
