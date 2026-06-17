import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowDown } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Badge variant="secondary" className="mb-6 text-xs uppercase tracking-widest">
          Disponible para nuevas oportunidades
        </Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
          Hola, soy{" "}
          <span className="text-primary">Kevin Guzman</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4">
          Desarrollador Full Stack · Backend Specialist
        </p>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Estudiante de Ingeniería de Sistemas y desarrollador Full Stack con experiencia en el
          diseño e implementación de sistemas transaccionales y plataformas web. Especializado en
          el ecosistema{" "}
          <span className="text-foreground font-medium">Java (Spring Boot)</span> y{" "}
          <span className="text-foreground font-medium">React (TypeScript)</span>, con fuerte
          enfoque en arquitecturas robustas usando contenedores y entornos virtualizados.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button size="lg" asChild>
            <a href="#projects">Ver proyectos</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Contactarme</a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Kevinho71"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-guzmán-marca-730b88301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={22} />
          </a>
          <a
            href="mailto:kevin4000100@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>

        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  )
}
