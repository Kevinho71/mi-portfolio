import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

export default function Footer() {
  return (
    <footer className="border-t-2 border-border py-8 bg-background">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Kevin Guzman · Todos los derechos reservados
          </p>
          <span className="hidden sm:inline text-accent">|</span>
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
            [EOF] — connection closed
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Kevinho71"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent chromatic-hover"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-guzmán-marca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent chromatic-hover"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
