"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "IA", href: "#ai" },
  { label: "Contacto", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="text-primary font-display text-2xl tracking-tight chromatic-hover crt-glow"
        >
          KG_
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent link-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href="/mi-portfolio/cv-kevin.pdf" download>
              ↓ CV
            </a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-border bg-background px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              &gt; {link.label}
            </a>
          ))}
          <Button size="sm" className="w-full" asChild>
            <a href="/mi-portfolio/cv-kevin.pdf" download>
              ↓ Descargar CV
            </a>
          </Button>
        </div>
      )}
    </header>
  )
}
