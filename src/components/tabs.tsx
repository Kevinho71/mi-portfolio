"use client"

import { motion } from "motion/react"
import {
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  BookOpen,
  MapPin,
  ArrowUpRight,
  Languages,
  Wrench,
} from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import { getTechIcon } from "@/lib/techIcons"
import {
  profile,
  experience,
  education,
  type ExperienceItem,
  hardSkills,
  aiSkills,
  softSkills,
  projects,
  contact,
} from "@/lib/content"

function SectionTitle({ children, lead }: { children: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl text-foreground sm:text-4xl">{children}</h2>
      {lead && <p className="mt-3 max-w-xl text-sm text-muted-foreground">{lead}</p>}
    </div>
  )
}

/* ---------- Presentación ---------- */
export function PresentacionTab() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(240px,320px)_1fr]">
      <div className="relative mx-auto w-full max-w-xs">
        <span data-meowl-perch className="pointer-events-none absolute -top-1 left-1/2 h-px w-px -translate-x-1/2" aria-hidden="true" />
        <div className="absolute -inset-3 rounded-2xl bg-amber-300/10 blur-2xl" aria-hidden="true" />
        <img
          src="/foto-perfil-kevin.png"
          alt="Kevin Guzman"
          className="relative aspect-square w-full rounded-xl border border-white/10 object-cover"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-[#0b0d20]/80 px-3 py-1 text-xs font-medium text-amber-200 backdrop-blur">
          <MapPin size={13} /> {profile.location}
        </span>
      </div>

      <div>
        <p className="text-sm font-medium tracking-wide text-amber-300">{profile.role}</p>
        <h2 className="mt-2 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
          {profile.name}
        </h2>
        <p className="mt-4 text-base text-muted-foreground">{profile.tagline}</p>

        <div className="mt-6 space-y-3 text-sm text-foreground/90">
          {profile.bio.map((p, i) => (
            <p key={i} className="leading-relaxed">{p}</p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="glow-amber inline-flex items-center gap-2 rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#191120] transition hover:bg-amber-200"
          >
            <Mail size={16} /> Contactar
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-soft inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
          >
            <GitHubIcon size={16} /> GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-soft inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
          >
            <LinkedInIcon size={16} /> LinkedIn
          </a>
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
          className="block h-6 w-px bg-amber-300/50"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.14, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.32 + index * 0.14 }}
        />
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="shrink-0 text-amber-300" />
          <h3 className="font-display text-base text-foreground">{item.role}</h3>
        </div>
        <p className="mt-1 text-xs font-medium text-amber-300/90">{item.period}</p>
        <p className="mt-1 text-xs font-medium text-foreground/70">{item.place}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  )
}

function ExperienceTimeline() {
  return (
    <div>
      {/* Tronco + origen (desktop) */}
      <div className="relative mb-3 hidden h-4 md:block">
        <motion.div
          aria-hidden
          className="absolute left-6 right-2 top-1/2 h-px -translate-y-1/2 bg-white/15"
          style={{ transformOrigin: "left center" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.9)]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.85 }}
        />
        <span className="absolute left-0 top-1/2 -translate-y-[150%] text-[11px] font-medium tracking-wide text-amber-200/90">
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
        <div className="relative mb-10">
          <span data-meowl-perch className="pointer-events-none absolute -top-1 right-4 h-px w-px" aria-hidden="true" />
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
            <li key={e.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="shrink-0 text-amber-300" />
                <h3 className="font-display text-base text-foreground">{e.title}</h3>
              </div>
              <p className="mt-1 text-xs font-medium text-amber-300/90">{e.period}</p>
              <p className="mt-1 text-xs text-muted-foreground">{e.place}</p>
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
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-6 ${className}`}>
      <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-foreground">
        <Icon size={18} className={accent} /> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/85"
          >
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
    <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-center transition hover:border-amber-300/40">
      {icon ? (
        <img src={icon} alt="" className="h-7 w-7 object-contain" loading="lazy" />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-300/15 text-sm font-semibold text-amber-300">
          {label.slice(0, 1)}
        </span>
      )}
      <span className="text-[11px] font-medium leading-tight text-foreground/80">{label}</span>
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
        <div className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 md:col-span-2">
          <span data-meowl-perch className="pointer-events-none absolute -top-1 right-6 h-px w-px" aria-hidden="true" />
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg text-foreground">
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
export function ProyectosTab() {
  return (
    <div className="space-y-6">
      <SectionTitle lead="Sistemas reales desarrollados para instituciones y empresas.">
        Proyectos
      </SectionTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-amber-300/40 hover:bg-white/[0.05]"
          >
            {i === 0 && (
              <span data-meowl-perch className="pointer-events-none absolute -top-1 right-6 h-px w-px z-10" aria-hidden="true" />
            )}
            {p.images.length > 0 && (
              <div className="relative overflow-hidden border-b border-white/10">
                <img
                  src={`/projects/${p.images[0]}`}
                  alt={`${p.name} — captura`}
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg text-foreground">{p.name}</h3>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${p.name}`}
                    className="text-muted-foreground transition hover:text-amber-300"
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>
              <p className="mt-1 text-xs font-medium text-amber-300/90">{p.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
              <p className="mt-3 text-xs font-medium text-foreground/70">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 pt-3">
                {p.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 5 && (
                  <span className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground/50">
                    +{p.tech.length - 5}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ---------- Blog ---------- */
export function BlogTab() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-amber-300">
        <span data-meowl-perch className="pointer-events-none absolute -top-1 left-1/2 h-px w-px -translate-x-1/2" aria-hidden="true" />
        <BookOpen size={28} />
      </div>
      <h2 className="mt-6 font-display text-3xl text-foreground">Próximamente</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Estoy preparando artículos sobre backend, arquitectura en la nube e ingeniería de IA.
        Mientras tanto, Meowl cuida de la biblioteca.
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="glow-amber mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#191120] transition hover:bg-amber-200"
      >
        ¿Sugerir un tema? <ArrowUpRight size={16} />
      </a>
    </div>
  )
}
