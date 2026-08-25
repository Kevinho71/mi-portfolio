import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-8 bg-background">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5 text-center sm:text-left">
          © {new Date().getFullYear()} Kevin Guzman · Hecho con
          <Heart size={14} className="text-pink-500 fill-pink-500" />
          en Bolivia
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Kevinho71"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            aria-label="GitHub"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-guzmán-marca-730b88301"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
