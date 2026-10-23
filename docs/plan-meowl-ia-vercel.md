# Plan — Meowl asistente IA (Gemini) + migración a Vercel

Fecha: 2026-10-23 · Rama: `nuevo-portfolio`

## Objetivo

1. Crear el **backend** (route handler de Next.js) que llama a la API de Gemini por
   `fetch` directo (sin SDK), con **streaming SSE**, usando un *system prompt* con toda
   la información personal de Kevin.
2. Dejar una **UI mínima de prueba** conectada a ese endpoint (chat flotante con
   `meowl.svg` como avatar).
3. **Migrar** el proyecto de export estático / GitHub Pages a **Vercel** (serverless).

---

## 1. Backend (Gemini)

- **Endpoint**: `POST /api/chat` (`src/app/api/chat/route.ts`).
- **Modelo**: `gemini-3.5-flash-lite` (configurable vía `GEMINI_MODEL`).
- **Integración**: fetch directo a la **Interactions API** de Gemini
  (`POST https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse`),
  autenticando con la cabecera `x-goog-api-key`.
- **Memoria multi-turno**: se usa el modo *stateful* de la API de Gemini
  (`previous_interaction_id`). El cliente conserva el `interactionId` devuelto y lo
  reenvía en el siguiente turno. Gemini gestiona el historial y las *thought signatures*
  del lado del servidor, por lo que no hay que reenviar pensamientos.
- **Contrato del backend (request)**:
  ```json
  { "message": "¿cuál es el stack de Kevin?", "interactionId": "v1_xxx (opcional)" }
  ```
- **Contrato SSE (respuesta → cliente)**, un objeto JSON por evento:
  ```text
  data: {"type":"text","text":"..."}
  data: {"type":"done","interactionId":"v1_..."}
  data: {"type":"error","message":"..."}
  ```
  Solo se reenvían los deltas `text` (se ignoran `thought_summary` y
  `thought_signature`).
- **Errores**: sin `GEMINI_API_KEY` → 500; body inválido → 400; error de Gemini → 502.
- **Config**: `export const maxDuration = 60`.

### Archivos
- `src/app/api/chat/route.ts` — handler POST.
- `src/lib/meowl/gemini.ts` — construye la petición y transforma el SSE de Gemini al
  contrato propio.
- `src/lib/meowl/system-prompt.ts` — `SYSTEM_PROMPT` (identidad de Meowl + datos reales
  de Kevin + reglas).

### Reglas del system prompt
- Identidad: Meowl, gato-búho mascota del portfolio, tono ingenioso y conciso.
- Responder **solo** sobre Kevin / su portfolio / sus proyectos.
- **Idioma de respuesta = idioma de la pregunta** (ajuste acordado).
- Redirigir con cortesía preguntas fuera de tema.

---

## 2. UI mínima de prueba

- `src/components/meowl/MeowlChat.tsx` (client component):
  - Botón flotante (abajo-derecha) que abre/cierra un panel de chat.
  - Avatar estático `<img src="/meowl.svg">` (sin integración animada completa — queda
    para una tarea posterior).
  - Input + envío → `fetch('/api/chat')` → lee el `ReadableStream` y va acumulando el
    texto (streaming), con estados de carga/error.
- Se monta en `src/app/layout.tsx` (dentro de `<body>`).
- Estilo reutiliza los tokens del portfolio (borde brutalista, `font-mono`, `text-accent`,
  etc.).

> La integración animada completa de Meowl (conversión a componente inline, perchas,
> vuelo, boca al hablar) queda **fuera** de esta tarea.

---

## 3. Migración a Vercel

### `next.config.ts`
- Quitar `output: "export"`, `basePath: "/mi-portfolio"` e `images.unoptimized`.
- Mantener `turbopack.root`.

### Rutas hardcodeadas `/mi-portfolio` → `/`
- `src/components/Navbar.tsx` (2× `cv-kevin.pdf`)
- `src/components/sections/Hero.tsx` (`foto-perfil-kevin.png`)
- `src/components/sections/About.tsx` (`Flyway_logo.svg`)
- `src/lib/techIcons.ts` (`Flyway_logo.svg`)
- `src/components/sections/Projects.tsx` (`BASE_PATH = ""`)

### Workflow de despliegue
- Eliminar `.github/workflows/deploy.yml` (GitHub Pages). En Vercel el deploy es
  automático por integración Git.

### Variables de entorno / secretos
- `GEMINI_API_KEY` (obligatoria) y `GEMINI_MODEL` (default `gemini-3.5-flash-lite`) →
  configurar en Vercel → Settings → Environment Variables.
- Local: `.env.local` (ya ignorado).
- `.env.example` documenta ambas variables; se añade la excepción `!.env.example` en
  `.gitignore` (hoy `.env*` lo ignoraría).

### `vercel.json`
- No es necesario para un Next estándar (Vercel lo detecta). No se crea.

---

## 4. Verificación

- `npm run build` local (ya con config de Vercel).
- `npm run dev` → probar `/api/chat` con la UI mínima y la key local.
- Configurar `GEMINI_API_KEY` en Vercel y validar el deploy.

---

## Decisiones tomadas
- **Sin dependencias nuevas**: fetch directo (no `@google/generative-ai`).
- **Streaming** por SSE.
- **Modelo**: `gemini-3.5-flash-lite` (GA, julio 2026, thinking `minimal` por defecto).
- **Idioma de respuesta** = idioma de la pregunta.
