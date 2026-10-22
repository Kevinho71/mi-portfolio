"use client"

import { useSyncExternalStore } from "react"

type Theme = "crt" | "w98"

const STORAGE_KEY = "theme"
const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener("storage", callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "w98" ? "w98" : "crt"
}

/* En el HTML inicial siempre es CRT: el script inline corrige antes del paint. */
function getServerSnapshot(): Theme {
  return "crt"
}

function setTheme(next: Theme) {
  const root = document.documentElement

  if (next === "w98") root.dataset.theme = "w98"
  else delete root.dataset.theme

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* localStorage puede estar bloqueado: el tema igual se aplica en esta sesión */
  }

  listeners.forEach((listener) => listener())
}

const OPTIONS: { value: Theme; label: string; title: string }[] = [
  { value: "crt", label: "CRT", title: "Tema CRT (original)" },
  { value: "w98", label: "98", title: "Tema Windows 98" },
]

export default function ThemeSwitch({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div
      role="group"
      aria-label="Tema visual del sitio"
      className={`inline-flex items-center border-2 border-border bg-card ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = theme === option.value
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-pressed={active}
            onClick={() => setTheme(option.value)}
            className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
