"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import {
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Languages,
  Wrench,
} from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import PixelBranch from "@/components/PixelBranch"
import ProjectDetail from "@/components/ProjectDetail"
import { getTechIcon } from "@/lib/techIcons"
import {
  profile,
  experience,
  education,
  type ExperienceItem,
  type Project,
  hardSkills,
  aiSkills,
  softSkills,
  clientProjects,
  personalProjects,
  contact,
} from "@/lib/content"

function SectionTitle({ children, lead }: { children: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">{children}</h2>
      {lead && <p className="mt-3 max-w-xl text-lg text-muted-foreground">{lead}</p>}
    </div>
  )
}

/* ---------- Presentación ---------- */
export function PresentacionTab() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(240px,320px)_1fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="pixel-shadow relative border-2 border-border bg-card p-2">
            <img
              src="/foto-perfil-kevin.png"
              alt="Kevin Guzman"
              className="relative aspect-square w-full object-cover"
              style={{ imageRendering: "auto" }}
            />
          </div>
        </div>

        <div className="[text-shadow:1px_1px_0_rgba(5,6,15,0.65)]">
          <p className="text-base font-medium tracking-wide text-amber-300">{profile.role}</p>
          <h2 className="mt-2 font-display text-3xl leading-[1.15] text-foreground sm:text-4xl">
            {profile.name}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{profile.tagline}</p>

          <div className="mt-6 space-y-3 text-base text-foreground/90">
            {profile.bio.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.stack.map((s) => (
              <span key={s} className="pixel-chip px-3 py-1 text-sm font-medium text-foreground/85">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="glow-amber inline-flex items-center gap-2 bg-amber-300 px-5 py-2.5 text-base font-semibold text-[#0b0e1d] hover:bg-amber-200"
            >
              <Mail size={16} /> Contactar
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn inline-flex items-center gap-2 bg-card px-5 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
            >
              <GitHubIcon size={16} /> GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn inline-flex items-center gap-2 bg-card px-5 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Rama pixel-art: la percha de Meowl, abajo a la derecha.
          El margen negativo la lleva hasta el borde exacto de la pantalla. */}
      <div className="relative mt-12 flex justify-end" aria-hidden="true">
        <div className="relative -mr-[calc((100vw-100%)/2)] w-[min(360px,92%)]">
          <PixelBranch className="h-auto w-full" />
          <span
            data-meowl-perch
            className="pointer-events-none absolute left-[55%] top-1/2 h-px w-px"
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- Experiencia ---------- */
function ExperienceNode({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.div
      className="relative flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.14, ease: "easeOut" }}
    >
      {/* rama + nodo (desktop) */}
      <div className="mb-3 hidden items-center md:flex">
        <motion.span
          aria-hidden
          className="block h-6 w-1 bg-amber-300/60"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.14, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="h-3 w-3 bg-amber-300 shadow-[2px_2px_0_0_#05060f]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.32 + index * 0.14 }}
        />
      </div>

      <div className="pixel-frame flex-1 p-5">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="shrink-0 text-amber-300" />
          <h3 className="font-display text-base text-foreground">{item.role}</h3>
        </div>
        <p className="mt-1 text-sm font-medium text-amber-300/90">{item.period}</p>
        <p className="mt-1 text-sm font-medium text-foreground/70">{item.place}</p>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  )
}

function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Percha: sobre el extremo derecho de la línea de tiempo */}
      <span
        data-meowl-perch
        className="pointer-events-none absolute right-16 top-2 h-px w-px"
        aria-hidden="true"
      />
      {/* Tronco + origen (desktop) */}
      <div className="relative mb-3 hidden h-4 md:block">
        <motion.div
          aria-hidden
          className="absolute left-6 right-2 top-1/2 h-1 -translate-y-1/2 bg-border"
          style={{ transformOrigin: "left center" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 bg-amber-300 shadow-[2px_2px_0_0_#05060f]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.85 }}
        />
        <span className="absolute left-0 top-1/2 -translate-y-[150%] text-sm font-medium tracking-wide text-amber-200/90">
          Inicio
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
        {experience.map((e, i) => (
          <ExperienceNode key={e.role + e.place} item={e} index={i} />
        ))}
      </div>
    </div>
  )
}

export function ExperienciaTab() {
  return (
    <div className="space-y-14">
      <section>
        <div className="mb-10">
          <SectionTitle lead="Sistemas reales, en producción, para instituciones y empresas.">
            Experiencia
          </SectionTitle>
        </div>
        <ExperienceTimeline />
      </section>

      <section>
        <SectionTitle lead="Formación académica y de idiomas.">Estudios</SectionTitle>
        <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {education.map((e) => (
            <li key={e.title} className="pixel-frame p-5">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="shrink-0 text-amber-300" />
                <h3 className="font-display text-base text-foreground">{e.title}</h3>
              </div>
              <p className="mt-1 text-sm font-medium text-amber-300/90">{e.period}</p>
              <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

/* ---------- Habilidades ---------- */
function SkillGroup({
  title,
  icon: Icon,
  items,
  accent = "text-amber-300",
  className = "",
}: {
  title: string
  icon: React.ElementType
  items: string[]
  accent?: string
  className?: string
}) {
  return (
    <div className={`pixel-frame p-6 ${className}`}>
      <h3 className="mb-4 flex items-center gap-2 font-display text-base text-foreground">
        <Icon size={18} className={accent} /> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className="pixel-chip px-3 py-1.5 text-sm font-medium text-foreground/85">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function SkillIcon({ label }: { label: string }) {
  const icon = getTechIcon(label)
  return (
    <div className="flex flex-col items-center gap-2 border-2 border-border bg-background p-2.5 text-center transition hover:border-amber-300/60 hover:bg-secondary">
      {icon ? (
        <img src={icon} alt="" className="h-7 w-7 object-contain" loading="lazy" />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center bg-secondary text-sm font-semibold text-amber-300">
          {label.slice(0, 1)}
        </span>
      )}
      <span className="text-sm font-medium leading-tight text-foreground/80">{label}</span>
    </div>
  )
}

export function HabilidadesTab() {
  return (
    <div className="space-y-6">
      <SectionTitle lead="Stack backend-first con React y nube, más una capa de ingeniería de IA.">
        Habilidades
      </SectionTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="pixel-frame relative p-6 md:col-span-2">
          <span data-meowl-perch className="pointer-events-none absolute -top-1 right-6 h-px w-px" aria-hidden="true" />
          <h3 className="mb-5 flex items-center gap-2 font-display text-base text-foreground">
            <Code2 size={18} className="text-amber-300" /> Stack técnico
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {hardSkills.map((s) => (
              <SkillIcon key={s} label={s} />
            ))}
          </div>
        </div>

        <SkillGroup title="Ingeniería de IA" icon={Sparkles} items={aiSkills} accent="text-amber-200" />
        <SkillGroup title="Habilidades blandas" icon={Wrench} items={softSkills} accent="text-amber-200/80" />
        <SkillGroup
          className="md:col-span-2"
          title="Idiomas"
          icon={Languages}
          items={["Español (nativo)", "Inglés (avanzado)"]}
        />
      </div>
    </div>
  )
}

/* ---------- Proyectos ---------- */
function ProjectCard({
  project: p,
  perch = false,
  onOpen,
}: {
  project: Project
  perch?: boolean
  onOpen: (project: Project) => void
}) {
  return (
    <article
      data-project-card
      className="group pixel-frame relative flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col p-4 transition hover:border-amber-300/60 hover:bg-secondary sm:w-[340px] lg:w-[calc((100%-2.5rem)/3)] lg:max-w-none"
    >
      {perch && (
        <span data-meowl-perch className="pointer-events-none absolute -top-1 right-6 h-px w-px z-10" aria-hidden="true" />
      )}
      <div className="flex items-start gap-3">
        {p.images.length > 0 && (
          <img
            src={`/projects/${p.images[0]}`}
            alt=""
            className="h-14 w-20 shrink-0 border-2 border-border object-cover object-top"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-display text-base leading-tight text-foreground">
            {p.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-amber-300/90">{p.role}</p>
        </div>
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${p.name}`}
            className="shrink-0 text-muted-foreground transition hover:text-amber-300"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
      <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">{p.tagline}</p>
      <p className="mt-2 line-clamp-1 text-sm font-medium text-foreground/70">{p.impact}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
        {p.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="border border-border bg-secondary px-2 py-0.5 text-sm font-medium text-foreground/70"
          >
            {t}
          </span>
        ))}
        {p.tech.length > 3 && (
          <span className="border border-border bg-secondary px-2 py-0.5 text-sm font-medium text-foreground/50">
            +{p.tech.length - 3}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onOpen(p)}
        className="pixel-btn mt-3 inline-flex w-full items-center justify-center gap-2 bg-background px-4 py-2 text-base font-semibold text-foreground hover:bg-secondary hover:text-amber-200"
      >
        Ver detalles <ArrowRight size={14} />
      </button>
    </article>
  )
}

/**
 * Fila horizontal de proyectos. Muestra hasta 3 cards en pantallas grandes;
 * si hay más (o el espacio no alcanza) se convierte en carrusel scrolleable.
 */
function ProjectCarousel({
  items,
  offset = 0,
  onOpen,
}: {
  items: Project[]
  offset?: number
  onOpen: (project: Project) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () => setOverflowing(el.scrollWidth - el.clientWidth > 4)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [items.length])

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-project-card]")
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p, i) => (
          <ProjectCard key={p.name} project={p} perch={offset + i === 2} onOpen={onOpen} />
        ))}
      </div>

      {overflowing && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Proyectos anteriores"
            className="pixel-btn absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-card text-foreground/80 hover:text-amber-300 sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Proyectos siguientes"
            className="pixel-btn absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-card text-foreground/80 hover:text-amber-300 sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  )
}

function EmptyProjects() {
  return (
    <div className="border-2 border-dashed border-border bg-card/60 p-8 text-center">
      <p className="font-display text-base text-foreground">En el taller</p>
      <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">
        Algunos experimentos propios todavía están en el horno. Meowl los vigila para que
        no se quemen.
      </p>
    </div>
  )
}

export function ProyectosTab() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <div className="space-y-12">
        <section>
          <SectionTitle lead="Sistemas reales desarrollados para instituciones y empresas.">
            Proyectos clientes
          </SectionTitle>
          <ProjectCarousel items={clientProjects} onOpen={setActive} />
        </section>

        <section>
          <SectionTitle lead="Experimentos propios: herramientas, prototipos y cosas que nadie pidió.">
            Proyectos personales
          </SectionTitle>
          {personalProjects.length > 0 ? (
            <ProjectCarousel
              items={personalProjects}
              offset={clientProjects.length}
              onOpen={setActive}
            />
          ) : (
            <EmptyProjects />
          )}
        </section>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </>
  )
}

/* ---------- Blog ---------- */
export function BlogTab() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
      <div className="pixel-shadow flex h-16 w-16 items-center justify-center border-2 border-border bg-card text-amber-300">
        <BookOpen size={28} />
      </div>
      <h2 className="mt-6 font-display text-2xl text-foreground">Próximamente</h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        Estoy preparando artículos sobre backend, arquitectura en la nube e ingeniería de IA.
        Mientras tanto, Meowl cuida de la biblioteca.
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="glow-amber mt-8 inline-flex items-center gap-2 bg-amber-300 px-5 py-2.5 text-base font-semibold text-[#0b0e1d] hover:bg-amber-200"
      >
        ¿Sugerir un tema? <ArrowUpRight size={16} />
      </a>
    </div>
  )
}
