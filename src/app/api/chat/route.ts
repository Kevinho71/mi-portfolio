import { streamGeminiChat } from "@/lib/meowl/gemini";

// Límite de duración para la función serverless (Vercel Hobby admite hasta 300s).
export const maxDuration = 60;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY no está configurada en el servidor." },
      { status: 500 },
    );
  }
  const model = process.env.GEMINI_MODEL || undefined;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  const parsed = (body ?? {}) as { message?: unknown; interactionId?: unknown };
  const message = typeof parsed.message === "string" ? parsed.message.trim() : "";
  if (!message) {
    return Response.json({ error: "El campo 'message' es obligatorio." }, { status: 400 });
  }
  const interactionId =
    typeof parsed.interactionId === "string" && parsed.interactionId
      ? parsed.interactionId
      : undefined;

  try {
    const stream = await streamGeminiChat({ message, interactionId, apiKey, model });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno al llamar a Gemini.";
    return Response.json({ error: message }, { status: 502 });
  }
}
