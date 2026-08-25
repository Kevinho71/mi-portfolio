"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-2xl tracking-tight gradient-text"
        >
          Kevin G.
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground link-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" className="gradient-brand text-white border-0 rounded-full px-5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" asChild>
            <a href="/mi-portfolio/cv-kevin.pdf" download>
              <Download size={14} className="mr-1.5" /> Descargar CV
            </a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" className="gradient-brand text-white border-0 rounded-full mt-2" asChild>
            <a href="/mi-portfolio/cv-kevin.pdf" download>
              <Download size={14} className="mr-1.5" /> Descargar CV
            </a>
          </Button>
        </div>
      )}
    </header>
  )
}
