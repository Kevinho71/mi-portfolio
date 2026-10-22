"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 grid-bg"
    >
      {/* Halo CRT rojo óxido */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="crt-halo absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary/15 blur-3xl" />
      </div>

      {/* Marco brutalista decorativo */}
      <div className="absolute top-24 left-6 right-6 bottom-16 border-2 border-border/40 pointer-events-none hidden sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Prompt terminal */}
        <p className="mb-4 text-xs font-mono uppercase tracking-widest text-accent">
          <span className="text-muted-foreground">C:\PORTFOLIO&gt;</span> whoami
        </p>

        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 border-2 border-border bg-muted overflow-hidden chromatic-hover" style={{ boxShadow: "var(--shadow-hard)" }}>
            <img
              src="/mi-portfolio/foto-perfil-kevin.png"
              alt="Kevin Guzman"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Badge variant="outline" className="mb-6 flicker">
          &gt; Disponible para nuevas oportunidades
        </Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display tracking-tight mb-6 leading-[1.05]">
          Hola, soy{" "}
          <span className="text-primary crt-glow chromatic-hover inline-block">
            Kevin Guzman
          </span>
        </h1>

        <p className="text-lg sm:text-xl font-mono uppercase tracking-wider text-foreground/80 mb-6">
          [ Full Stack Software Developer ]
        </p>

        <p className="text-sm sm:text-base font-mono text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Egresado de Ingeniería de Sistemas, enfocado en el{" "}
          <span className="text-accent font-medium">desarrollo backend</span> y la{" "}
          <span className="text-accent font-medium">arquitectura en la nube escalable</span>.
          Diseño e implemento sistemas transaccionales y plataformas web con el ecosistema{" "}
          <span className="text-accent font-medium">Java (Spring Boot)</span> y{" "}
          <span className="text-accent font-medium">React (TypeScript)</span>, priorizando APIs
          robustas, seguridad, contenedores y despliegues eficientes en la nube.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button size="lg" asChild>
            <a href="#projects">./ver_proyectos</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">./contactarme</a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Kevinho71"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent chromatic-hover"
            aria-label="GitHub"
          >
            <GitHubIcon size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-guzmán-marca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent chromatic-hover"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={22} />
          </a>
          <a
            href="mailto:kevin4000100@gmail.com"
            className="text-muted-foreground hover:text-accent chromatic-hover"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>

        {/* Cursor terminal blinking */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-accent text-lg">
          <span className="terminal-cursor">▊</span>
        </div>
      </motion.div>
    </section>
  )
}
