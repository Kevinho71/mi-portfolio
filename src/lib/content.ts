// Contenido centralizado del portfolio. Fuente única de verdad para las pestañas.

export const profile = {
  name: "Kevin Guzman",
  fullName: "Kevin Ady Guzman Marca",
  role: "Full Stack Software Developer",
  location: "Tarija, Bolivia",
  tagline:
    "Egresado de Ingeniería de Sistemas, enfocado en el desarrollo backend y la arquitectura en la nube escalable.",
  bio: [
    "Diseño e implemento sistemas transaccionales y plataformas web con Java (Spring Boot) y React (TypeScript), priorizando APIs robustas, seguridad, contenedores y despliegues eficientes en la nube.",
    "También trabajo ingeniería de IA aplicada: armo agentes con contexto, herramientas y evaluación para que funcionen fuera de la demo — MCP, agent skills, SDD y evals.",
  ],
  stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "AWS", "GCP"],
}

export interface ExperienceItem {
  role: string
  place: string
  period: string
  description: string
}

export const experience: ExperienceItem[] = [
  {
    role: "Dev Backend",
    place: "Favorcito",
    period: "Ene 2026 – May 2026",
    description:
      "Pasantía como desarrollador backend para una plataforma web, trabajando APIs y servicios del lado del servidor.",
  },
  {
    role: "Sistema administrativo",
    place: "CADET — Colegio de Administradores de Empresas de Tarija",
    period: "2025 – 2026",
    description:
      "Desarrollo de un sistema administrativo y transaccional que reemplaza planillas y papel por una vitrina profesional de socios y un panel completo.",
  },
  {
    role: "Plataforma de orientación vocacional",
    place: "UCB — Sede Tarija",
    period: "2026",
    description:
      "Tests psicométricos configurables (MIDAS/CHASIDE) que se corrigen solos y se entregan por QR, con tableros y exportación PDF/Excel.",
  },
  {
    role: "Gabinete Psicológico",
    place: "UCB — Sede Tarija",
    period: "2026",
    description:
      "Sistema de gestión clínica con una capa de IA que apoya al psicólogo redactando historias clínicas y detectando señales tempranas.",
  },
]

export interface EducationItem {
  title: string
  place: string
  period: string
}

export const education: EducationItem[] = [
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

export interface Skill {
  label: string
  icon?: string
}

export const hardSkills: string[] = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Docker",
  "Git",
  "Firebase",
  "Linux",
  "AWS",
  "GCP",
  "Flyway",
]

export const aiSkills: string[] = [
  "AI Harness Development",
  "MCP · Model Context Protocol",
  "Agent Skills",
  "SDD · Spec-Driven Development",
  "Agentic Workflows",
  "Evals",
]

export const softSkills: string[] = [
  "Resolución de problemas complejos",
  "Proactividad",
  "Arquitectura de sistemas",
  "Dirección de equipos",
  "Metodologías ágiles",
]

export interface Project {
  name: string
  role: string
  tagline: string
  description: string
  highlights: string[]
  impact: string
  tech: string[]
  url?: string
  note: string
  images: string[]
}

export const projects: Project[] = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    tagline:
      "Convierte a cada colegiado en una marca visible y al colegio en su motor: perfiles profesionales y administración en un solo sistema.",
    description:
      "Plataforma integral del Colegio de Administradores de Empresas de Tarija (+500 socios). Reemplaza planillas y papel por un sistema único: perfiles tipo LinkedIn, panel administrativo, pagos, documentos y CMS.",
    highlights: [
      "Perfiles profesionales tipo LinkedIn visibles al público.",
      "Panel administrativo: socios, pagos, documentos y contenido.",
      "CMS integrado: el colegio edita su web sin un desarrollador.",
    ],
    impact: "+500 socios registrados · en producción (cadet.org.bo)",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "MinIO", "React", "TypeScript", "Docker"],
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · panel admin con autenticación",
    images: ["cadet4.png", "cadet1.png", "cadet2.png", "cadet3.png"],
  },
  {
    name: "UCB Gabinete Psicológico",
    role: "Desarrollador Full Stack",
    tagline:
      "Transforma la salud mental estudiantil en decisiones: atención clínica digital, detección temprana con IA y evidencia para la universidad.",
    description:
      "Digitaliza el servicio de psicología universitaria: consultas, historias clínicas, sesiones y reportes. Una capa de IA apoya al psicólogo redactando historias clínicas, generando informes y detectando señales tempranas.",
    highlights: [
      "Digitalización total: consultas, historias y reportes en un solo lugar.",
      "IA de apoyo clínico: redacción de historias y detección temprana.",
      "+28 indicadores de bienestar por carrera, semestre y departamento.",
    ],
    impact: "Consultas, historias y reportes automatizados · producción UCB",
    tech: ["Spring Boot", "Spring AI", "React", "TypeScript", "PostgreSQL", "Docker"],
    url: "https://gabinete-psi-f.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · acceso hasta login",
    images: ["gabinete1.png", "gabinete2.png", "gabinete3.png", "gabinete4.png"],
  },
  {
    name: "UCB Orientación Vocacional",
    role: "Desarrollador Full Stack",
    tagline:
      "Orientación vocacional convertida en embudo de captación: tests psicométricos que se corrigen solos y se entregan por QR.",
    description:
      "Evalúa, corrige, orienta y capta a escala. La UCB lanza campañas por gestión y colegio, asigna tests (MIDAS/CHASIDE) y habilita un QR: el estudiante responde desde su celular y recibe su perfil vocacional por correo.",
    highlights: [
      "Tests configurables que se corrigen solos con baremos ajustables.",
      "Captación por QR, sin crear cuenta.",
      "Tableros y exportación PDF/Excel/ZIP para dirección.",
    ],
    impact: "6 colegios de Tarija y 146 participantes · producción UCB",
    tech: ["Spring Boot", "Java", "PostgreSQL", "React", "TypeScript", "Docker"],
    url: "https://front-ov-dev.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · acceso hasta login",
    images: ["orientacion1.png", "orientacion2.png", "orientacion3.png", "orientacion4.png"],
  },
]

export const contact = {
  email: "kevin4000100@gmail.com",
  whatsapp: "+591 60259580",
  github: "https://github.com/Kevinho71",
  linkedin: "https://www.linkedin.com/in/kevin-guzmán-marca/",
}

export type TabId = "presentacion" | "experiencia" | "habilidades" | "proyectos" | "blog"

export const tabs: { id: TabId; label: string }[] = [
  { id: "presentacion", label: "Presentación" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "blog", label: "Blog" },
]
