// Contenido centralizado del portfolio. Fuente única de verdad para las pestañas.

export const profile = {
  name: "Kevin Guzman",
  fullName: "Kevin Ady Guzman Marca",
  role: "Full Stack Software Developer",
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

export interface Kpi {
  value: string
  label: string
}

export interface Project {
  name: string
  role: string
  tagline: string
  description: string
  highlights: string[]
  impact: string
  kpis: Kpi[]
  tech: string[]
  url?: string
  note: string
  images: string[]
  /** "cliente": instituciones/empresas. "personal": proyectos propios. */
  category: "cliente" | "personal"
}

export const projects: Project[] = [
  {
    name: "CADET Web",
    role: "Desarrollador Full Stack",
    category: "cliente",
    tagline:
      "Convierte a cada colegiado en una marca visible y al colegio en su motor: perfiles profesionales que captan oportunidades, administración que lo controla todo.",
    description:
      "Plataforma de gestión integral del Colegio de Administradores de Empresas de Tarija (+500 socios registrados). Reemplaza planillas, papel y cobros presenciales por un sistema único que sirve a administración, socios y público. Su diferencial: no es solo un sistema interno, es una vitrina profesional — perfiles tipo LinkedIn visibles al público, panel administrativo completo y CMS para que el colegio edite su web sin un desarrollador.",
    highlights: [
      "Perfiles profesionales tipo LinkedIn: cada socio publica experiencia, logros, certificados y contacto, visible para cualquier visitante.",
      "Panel administrativo completo: socios, empresas afiliadas, pagos, documentos, posts y contenido institucional.",
      "CMS integrado: el colegio edita su landing sin escribir código ni depender de un desarrollador.",
    ],
    impact: "+500 socios registrados",
    kpis: [
      { value: "+500", label: "socios registrados" },
      { value: "3", label: "módulos: vitrina, panel y CMS" },
      { value: "En línea", label: "cadet.org.bo" },
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "MinIO", "React", "TypeScript", "Docker"],
    url: "https://www.cadet.org.bo/",
    note: "Landing pública · panel admin con autenticación",
    images: ["cadet4.png", "cadet1.png", "cadet2.png", "cadet3.png"],
  },
  {
    name: "UCB Gabinete Psicológico",
    role: "Desarrollador Full Stack",
    category: "cliente",
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
    kpis: [
      { value: "+28", label: "indicadores de bienestar" },
      { value: "8", label: "pasos del flujo clínico" },
      { value: "En línea", label: "producción UCB" },
    ],
    tech: ["Spring Boot", "Spring AI", "React", "TypeScript", "PostgreSQL", "Docker"],
    url: "https://gabinete-psi-f.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · acceso hasta login",
    images: ["gabinete1.png", "gabinete2.png", "gabinete3.png", "gabinete4.png"],
  },
  {
    name: "UCB Orientación Vocacional",
    role: "Desarrollador Full Stack",
    category: "cliente",
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
    kpis: [
      { value: "6", label: "colegios de Tarija" },
      { value: "146", label: "participantes evaluados" },
      { value: "En línea", label: "producción UCB" },
    ],
    tech: ["Spring Boot", "Java", "PostgreSQL", "React", "TypeScript", "Docker"],
    url: "https://front-ov-dev.alexa.tja.ucb.edu.bo/",
    note: "Proyecto institucional UCB · acceso hasta login",
    images: ["orientacion1.png", "orientacion2.png", "orientacion3.png", "orientacion4.png"],
  },
]

export const clientProjects: Project[] = projects.filter((p) => p.category === "cliente")

// Proyectos personales. Vacío a propósito: la pestaña muestra un estado
// "en el taller" hasta que se carguen entradas con esta forma:
//
// {
//   name: "Meowl AI",
//   role: "Desarrollador Full Stack",
//   category: "personal",
//   tagline: "Una frase que resuma el proyecto.",
//   description: "Qué hace y por qué existe.",
//   highlights: ["Logro 1.", "Logro 2."],
//   impact: "Métrica o estado · dato duro",
//   kpis: [{ value: "+10", label: "usuarios activos" }],
//   tech: ["Next.js", "TypeScript", "Gemini"],
//   url: "https://…",
//   note: "Nota breve de acceso",
//   images: [],
// }
export const personalProjects: Project[] = []

export const contact = {
  email: "kevin4000100@gmail.com",
  whatsapp: "+591 60259580",
  whatsappMessage:
    "Hola Kevin, he revisado tu trabajo y quisiera agendar una reunión contigo",
  github: "https://github.com/Kevinho71",
  linkedin: "https://www.linkedin.com/in/kevin-guzmán-marca/",
}

// Chat de WhatsApp con el mensaje ya escrito.
export const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

// CV descargable (vive en /public).
export const cvPath = "/cv-kevin.pdf"

export type TabId = "presentacion" | "experiencia" | "habilidades" | "proyectos" | "blog"

export const tabs: { id: TabId; label: string }[] = [
  { id: "presentacion", label: "Presentación" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "blog", label: "Blog" },
]
