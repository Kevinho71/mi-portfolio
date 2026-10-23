"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ThemeSwitch from "@/components/ThemeSwitch"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  // Scroll-spy: marca la sección visible como "task" activa (aria-current).
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
            break
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="nav-logo text-primary font-display text-2xl tracking-tight chromatic-hover crt-glow"
        >
          KG_
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className="nav-link text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent link-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeSwitch />
          <Button size="sm" asChild>
            <a href="/cv-kevin.pdf" download>
              ↓ CV
            </a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu (Start menu en Win98) */}
      {open && (
        <div className="mobile-menu md:hidden border-t-2 border-border bg-background flex">
          <div className="w98-only w98-startbar" aria-hidden="true">
            <span>Windows98</span>
          </div>
          <div className="flex-1 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "true" : undefined}
                className="nav-link text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                &gt; {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-4 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                &gt; tema
              </span>
              <ThemeSwitch />
            </div>
            <Button size="sm" className="w-full" asChild>
              <a href="/cv-kevin.pdf" download>
                ↓ Descargar CV
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
