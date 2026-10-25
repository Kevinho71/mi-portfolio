// Cliente SSE del endpoint /api/chat. Compartido por el asistente de Meowl.

export type StreamEvent =
  | { type: "text"; text: string }
  | { type: "done"; interactionId?: string }
  | { type: "error"; message: string }

export interface StreamHandlers {
  onText: (text: string) => void
  onDone: (interactionId?: string) => void
  onError: (message: string) => void
}

export async function streamChat(
  message: string,
  interactionId: string | undefined,
  handlers: StreamHandlers,
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
