"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Sparkles } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 blob-bg"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Foto de perfil con ring degradado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="gradient-ring float-slow shadow-2xl shadow-primary/20">
            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-card">
              <img
                src="/mi-portfolio/foto-perfil-kevin.png"
                alt="Kevin Guzman"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Badge de disponibilidad */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
        >
          <span className="relative flex items-center justify-center w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium text-green-700">Disponible para nuevas oportunidades</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display tracking-tight mb-6 leading-[1.05]">
          Hola, soy{" "}
          <span className="gradient-text">Kevin Guzman</span>
          <Sparkles className="inline-block ml-2 text-primary" size={40} />
        </h1>

        <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 max-w-3xl mx-auto">
          Desarrollador Full Stack · Backend Specialist
        </p>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Estudiante de Ingeniería de Sistemas apasionado por construir sistemas robustos
          y experiencias web memorables. Especializado en{" "}
          <span className="font-semibold text-foreground">Java Spring Boot</span> y{" "}
          <span className="font-semibold text-foreground">React TypeScript</span>,
          con enfoque en arquitecturas escalables y limpias.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button size="lg" className="gradient-brand text-white border-0 rounded-full px-7 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow group" asChild>
            <a href="#projects">
              Ver mis proyectos
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-7 border-2" asChild>
            <a href="#contact">
              <Mail size={16} className="mr-2" /> Hablemos
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href="https://github.com/Kevinho71"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-guzmán-marca-730b88301"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href="mailto:kevin4000100@gmail.com"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
