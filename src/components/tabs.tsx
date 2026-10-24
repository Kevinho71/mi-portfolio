"use client"

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
import {
  profile,
  experience,
  education,
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
        <div className="absolute -inset-3 rounded-[2rem] bg-amber-300/10 blur-2xl" aria-hidden="true" />
        <img
          src="/foto-perfil-kevin.png"
          alt="Kevin Guzman"
          className="relative aspect-square w-full rounded-[1.75rem] border border-white/10 object-cover"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#0b0d20]/80 px-3 py-1 text-xs font-medium text-amber-200 backdrop-blur">
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
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#191120] transition hover:bg-amber-200"
          >
            <Mail size={16} /> Contactar
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
          >
            <GitHubIcon size={16} /> GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
          >
            <LinkedInIcon size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Experiencia ---------- */
function TimelineItem({
  title,
  place,
  period,
  description,
  icon: Icon,
}: {
  title: string
  place: string
  period: string
  description: string
  icon: React.ElementType
}) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#161a38] text-amber-300">
        <Icon size={14} />
      </span>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <span className="text-xs font-medium tracking-wide text-amber-300/90">{period}</span>
      </div>
      <p className="text-sm font-medium text-foreground/70">{place}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </li>
  )
}

export function ExperienciaTab() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <SectionTitle lead="Sistemas reales, en producción, para instituciones y empresas.">
          Experiencia
        </SectionTitle>
        <ol className="space-y-8">
          {experience.map((e) => (
            <TimelineItem
              key={e.role + e.place}
              title={e.role}
              place={e.place}
              period={e.period}
              description={e.description}
              icon={Briefcase}
            />
          ))}
        </ol>
      </div>
      <div>
        <SectionTitle lead="Formación académica y de idiomas.">Estudios</SectionTitle>
        <ol className="space-y-8">
          {education.map((e) => (
            <TimelineItem
              key={e.title}
              title={e.title}
              place={e.place}
              period={e.period}
              description=""
              icon={GraduationCap}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ---------- Habilidades ---------- */
function SkillGroup({
  title,
  icon: Icon,
  items,
  accent = "text-amber-300",
}: {
  title: string
  icon: React.ElementType
  items: string[]
  accent?: string
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-foreground">
        <Icon size={18} className={accent} /> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/85"
          >
            {s}
          </span>
        ))}
      </div>
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
        <SkillGroup title="Stack técnico" icon={Code2} items={hardSkills} />
        <SkillGroup title="Ingeniería de IA" icon={Sparkles} items={aiSkills} accent="text-amber-200" />
        <SkillGroup title="Habilidades blandas" icon={Wrench} items={softSkills} accent="text-amber-200/80" />
        <SkillGroup title="Idiomas" icon={Languages} items={["Español (nativo)", "Inglés (avanzado)"]} />
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
        {projects.map((p) => (
          <article
            key={p.name}
            className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition hover:border-amber-300/40 hover:bg-white/[0.05]"
          >
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
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 5 && (
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground/50">
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
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-amber-300">
        <BookOpen size={28} />
      </div>
      <h2 className="mt-6 font-display text-3xl text-foreground">Próximamente</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Estoy preparando artículos sobre backend, arquitectura en la nube e ingeniería de IA.
        Mientras tanto, Meowl cuida de la biblioteca.
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#191120] transition hover:bg-amber-200"
      >
        ¿Sugerir un tema? <ArrowUpRight size={16} />
      </a>
    </div>
  )
}
