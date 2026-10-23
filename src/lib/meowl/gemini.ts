// Cliente ligero (fetch directo) para la API de Gemini.
// Usa la Interactions API en modo stateful para gestionar la conversación y las
// "thought signatures" del lado del servidor, y transforma el SSE de Gemini en un
// protocolo SSE propio que el frontend consume fácilmente.

import { SYSTEM_PROMPT } from "./system-prompt";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-3.5-flash-lite";

const encoder = new TextEncoder();

function sseEvent(payload: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export interface StreamGeminiParams {
  /** Último mensaje del usuario (texto plano). */
  message: string;
  /** Id de la interacción previa para continuar la conversación (multi-turno). */
  interactionId?: string;
  apiKey: string;
  model?: string;
  signal?: AbortSignal;
}

/**
 * Llama a Gemini en streaming y devuelve un ReadableStream que emite eventos SSE:
 *   { type: "text", text }            → delta de respuesta
 *   { type: "done", interactionId }   → fin + id para el siguiente turno
 *   { type: "error", message }        → error durante el streaming
 */
export async function streamGeminiChat(
  params: StreamGeminiParams,
): Promise<ReadableStream<Uint8Array>> {
  const { message, interactionId, apiKey, model = DEFAULT_MODEL, signal } = params;

  const body: Record<string, unknown> = {
    model,
    system_instruction: SYSTEM_PROMPT,
    input: message,
    stream: true,
    generation_config: { thinking_level: "minimal" },
  };
  if (interactionId) {
    body.previous_interaction_id = interactionId;
  }

  const upstream = await fetch(`${GEMINI_API_BASE}/interactions?alt=sse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(
      `Gemini respondió ${upstream.status}: ${detail.slice(0, 500) || upstream.statusText}`,
    );
  }

  return transformStream(upstream.body);
}

function transformStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let buffer = "";
  let nextInteractionId = "";

  const handleEvent = (rawEvent: string, controller: ReadableStreamDefaultController<Uint8Array>) => {
    for (const line of rawEvent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(payload);
      } catch {
        continue; // líneas que no son JSON (p. ej. comentarios SSE)
      }

      const event = parsed as {
        event_type?: string;
        interaction?: { id?: string };
        delta?: { type?: string; text?: string };
      };

      if (event.event_type === "interaction.created" || event.event_type === "interaction.completed") {
        if (event.interaction?.id) nextInteractionId = event.interaction.id;
        continue;
      }

      if (event.event_type === "step.delta") {
        if (event.delta?.type === "text" && typeof event.delta.text === "string" && event.delta.text) {
          controller.enqueue(sseEvent({ type: "text", text: event.delta.text }));
        }
        // se ignoran thought_summary y thought_signature
      }
    }
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let boundary: number;
          while ((boundary = buffer.indexOf("\n\n")) !== -1) {
            const rawEvent = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            handleEvent(rawEvent, controller);
          }
        }

        // Procesa el resto que no terminó en "\n\n".
        if (buffer.trim()) handleEvent(buffer, controller);

        controller.enqueue(sseEvent({ type: "done", interactionId: nextInteractionId }));
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error en el streaming";
        controller.enqueue(sseEvent({ type: "error", message }));
        controller.close();
      }
    },
    cancel() {
      upstream.cancel().catch(() => {});
    },
  });
}
