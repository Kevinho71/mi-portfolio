"use client"

import { useEffect, useRef, useState } from "react"
import { X, Send, MessageCircle, Loader2 } from "lucide-react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

type StreamEvent = { type: "text"; text: string } | { type: "done"; interactionId?: string } | { type: "error"; message: string }

async function streamChat(
  message: string,
  interactionId: string | undefined,
  handlers: {
    onText: (text: string) => void
    onDone: (id?: string) => void
    onError: (message: string) => void
  },
  signal: AbortSignal,
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, interactionId }),
    signal,
  })

  if (!res.ok || !res.body) {
    let msg = `Error ${res.status}`
    try {
      const data = await res.json()
      if (data?.error) msg = data.error
    } catch {
      /* se conserva el mensaje genérico */
    }
    throw new Error(msg)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let boundary: number
    while ((boundary = buffer.indexOf("\n\n")) !== -1) {
      const rawEvent = buffer.slice(0, boundary)
      buffer = buffer.slice(boundary + 2)

      for (const line of rawEvent.split("\n")) {
        const trimmed = line.trim()
        if (!trimmed.startsWith("data:")) continue
        const payload = trimmed.slice(5).trim()
        if (!payload) continue

        let event: StreamEvent
        try {
          event = JSON.parse(payload) as StreamEvent
        } catch {
          continue
        }

        if (event.type === "text") handlers.onText(event.text)
        else if (event.type === "done") handlers.onDone(event.interactionId)
        else if (event.type === "error") handlers.onError(event.message)
      }
    }
  }
}

export default function MeowlChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const interactionIdRef = useRef<string | undefined>(undefined)
  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Autoscroll al final cuando se agregan mensajes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, busy])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }, { role: "assistant", content: "" }])
    setBusy(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await streamChat(
        text,
        interactionIdRef.current,
        {
          onText: (chunk) => {
            setMessages((prev) => {
              const next = [...prev]
              const last = next[next.length - 1]
              next[next.length - 1] = { ...last, content: last.content + chunk }
              return next
            })
          },
          onDone: (id) => {
            if (id) interactionIdRef.current = id
          },
          onError: (message) => {
            setMessages((prev) => {
              const next = [...prev]
              const last = next[next.length - 1]
              next[next.length - 1] = { ...last, content: last.content || `⚠ ${message}` }
              return next
            })
          },
        },
        controller.signal,
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error de conexión"
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        next[next.length - 1] = { ...last, content: last.content || `⚠ ${message}` }
        return next
      })
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  const close = () => {
    abortRef.current?.abort()
    setOpen(false)
  }

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center border-2 border-border bg-background text-accent transition-colors hover:border-accent"
          style={{ boxShadow: "var(--shadow-hard)" }}
          aria-label="Abrir chat con Meowl"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Panel de chat */}
      {open && (
        <div
          className="fixed bottom-5 right-5 z-50 flex w-[min(92vw,360px)] flex-col overflow-hidden border-2 border-border bg-background"
          style={{ boxShadow: "var(--shadow-hard)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b-2 border-border bg-muted px-4 py-3">
            <img src="/meowl.svg" alt="" className="h-10 w-8 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm text-foreground">Meowl</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                &gt; asistente_ia
              </p>
            </div>
            <button
              onClick={close}
              className="text-muted-foreground transition-colors hover:text-accent"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex max-h-[50vh] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">
                {"// Pregúntame sobre Kevin: su stack, proyectos, experiencia o cómo contactarlo."}
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] border-2 px-3 py-2 font-mono text-xs leading-relaxed ${
                  m.role === "user"
                    ? "self-end border-accent bg-accent/10 text-foreground"
                    : "self-start border-border bg-card text-foreground"
                }`}
              >
                {m.role === "assistant" && !m.content && busy ? (
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 size={12} className="animate-spin" /> pensando…
                  </span>
                ) : (
                  <span className="whitespace-pre-wrap">{m.content}</span>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t-2 border-border px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta algo…"
              className="min-w-0 flex-1 border-2 border-border bg-muted px-3 py-2 font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
              disabled={busy}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-9 w-9 items-center justify-center border-2 border-border text-accent transition-colors hover:border-accent disabled:opacity-40"
              aria-label="Enviar"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
