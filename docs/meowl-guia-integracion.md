# Meowl en tu portfolio: guía de integración y animación

Guía para incrustar `meowl.svg` en un portfolio hecho con **Next.js + TypeScript** y animarlo con las reglas del personaje. No requiere librerías extra: todo se resuelve con CSS y la Web Animations API del navegador.

## 1. Comportamiento que vamos a lograr

| Situación | Qué hace Meowl |
|---|---|
| **Reposo** | Flota suavemente, parpadea, mueve la cola y las alas apenas se agitan |
| **Cursor encima (hover)** | Abre más los ojos y abre un poco la boca |
| **Clic / toque** | Dice una frase ingeniosa en un globo de texto (por ejemplo, invitar a ver los proyectos) y mueve la boca mientras habla |
| **Volar de un lugar a otro** | Abre las alas, se eleva, cruza y aterriza en otra percha. **Siempre mira al frente** y vuela con la boca abierta |

Regla de oro del vuelo: **Meowl nunca rota ni se voltea**. Solo se traslada (`translate`) y abre/aletea las alas.

---

## 2. Reglas importantes (léelas antes de empezar)

1. **El SVG debe ir en línea (inline)**, como componente de React. Con `<img src="meowl.svg">` o `background-image` el CSS de la página no puede tocar sus partes, y no habría animación.
2. **Nunca uses `rotate()` ni `scaleX(-1)`** en el contenedor ni en el `<svg>`. Eso lo giraría de costado o lo espejaría, y rompe la regla de "siempre al frente".
3. **El `<svg>` necesita `overflow: visible`.** Al abrir las alas se salen del `viewBox` original; sin esto se ven cortadas.
4. **Ningún ancestro de Meowl debe tener `overflow: hidden` ni `transform`**, porque cortaría las alas o descolocaría su posición. Móntalo como hijo directo del contenedor raíz de la página.
5. **Monta un solo Meowl por página.** Los `id` internos del SVG (gradientes, filtros) deben ser únicos en el documento.
6. **Anima solo `transform` y `opacity`** (y las propiedades individuales `rotate` y `scale`). Son baratas para el navegador y evitan tirones.

---

## 3. Estructura de archivos

```
components/
  meowl/
    MeowlSvg.tsx   ← el SVG convertido a componente
    Meowl.tsx      ← lógica: hover, clic, vuelo
    meowl.css      ← todas las animaciones
app/
  page.tsx         ← monta <Meowl /> y define las perchas
```

---

## 4. Paso 1: convertir el SVG a componente

Usa [SVGR](https://react-svgr.com/playground/) (el *playground* online, o el CLI `npx @svgr/cli`) con `meowl.svg`, o hazlo a mano:

- `class` → `className`
- Atributos con guion pasan a camelCase: `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`, `stroke-opacity` → `strokeOpacity`, `stop-color` → `stopColor`, `stop-opacity` → `stopOpacity`, `flood-color` → `floodColor`, `flood-opacity` → `floodOpacity`
- **Elimina el bloque `<style>...</style>` completo** del SVG. Ese CSS era para probar el SVG suelto; ahora lo reemplaza `meowl.css` (paso 2). Si lo dejas, entrará en conflicto.
- Elimina los comentarios HTML (`<!-- -->`) o conviértelos a `{/* */}`.

```tsx
// components/meowl/MeowlSvg.tsx
export default function MeowlSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 480"
      width="100%"
      height="100%"
      role="img"
      aria-hidden="true"   // el contenedor ya tiene aria-label
      {...props}
    >
      {/* ...pega aquí el contenido del SVG ya convertido... */}
    </svg>
  );
}
```

### Partes del SVG que usaremos

| `id` / clase | Qué es | Qué le hacemos |
|---|---|---|
| `#meowl-float` | Todo el personaje (sin la rama) | Flotación suave |
| `#meowl-tail` | Cola | Balanceo |
| `.eye` | Cada ojo (izq. y der.) | Parpadeo, abrir más al hacer hover |
| `.mouth-closed` / `.mouth-open` | Boca cerrada en "w" / boca abierta | Intercambiar según el estado |
| `#wing-left`, `#wing-right` | Alas | Abrir y aletear |
| `#hat` | Sombrero de copa | (opcional) animarlo aparte |
| `#tree-branch`, `#cat-paws` | Rama y patitas | Se ocultan/levantan al volar |

> Las alas giran desde el hombro. Una rotación positiva abre el ala **izquierda** hacia afuera y arriba; en la **derecha** es al revés (negativa).

---

## 5. Paso 2: el CSS (`meowl.css`)

```css
/* ============ Contenedor ============ */
.meowl {
  --meowl-size: clamp(110px, 13vw, 180px);   /* ajusta el tamaño aquí */
  position: absolute;
  top: 0;
  left: 0;
  width: var(--meowl-size);
  aspect-ratio: 400 / 480;
  z-index: 50;
  cursor: pointer;
  visibility: hidden;            /* evita el "salto" antes de colocarlo */
  will-change: transform;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.meowl[data-ready="true"] { visibility: visible; }
.meowl:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 6px;
  border-radius: 16px;
}
.meowl svg { display: block; width: 100%; height: 100%; overflow: visible; }

/* ============ Reposo ============ */
.meowl #meowl-float {
  animation: meowl-float 3.6s ease-in-out infinite;
}
.meowl #meowl-tail {
  transform-box: fill-box;
  transform-origin: 50% 0%;
  animation: meowl-tail 3.2s ease-in-out infinite;
}
.meowl .eye {
  transform-box: fill-box;
  transform-origin: 50% 55%;
  animation: meowl-blink 5s infinite;
  transition: scale 0.18s ease-out;     /* "scale" es independiente del parpadeo (transform) */
}
.meowl #wing-left {
  transform-box: fill-box;
  transform-origin: 90% 6%;             /* hombro */
  transition: rotate 0.3s ease-out;     /* abrir/cerrar alas */
  animation: meowl-flutter-l 3.6s ease-in-out infinite;
}
.meowl #wing-right {
  transform-box: fill-box;
  transform-origin: 10% 6%;
  transition: rotate 0.3s ease-out;
  animation: meowl-flutter-r 3.6s ease-in-out infinite;
}
.meowl #tree-branch,
.meowl #cat-paws {
  transition: opacity 0.35s ease, transform 0.5s ease;
}

/* Boca: cerrada por defecto, abierta bajo ciertos estados */
.meowl .mouth-closed { transition: opacity 0.1s; }
.meowl .mouth-open {
  transform-box: fill-box;
  transform-origin: 50% 0%;             /* crece hacia abajo */
  transition: opacity 0.15s, scale 0.2s;
}

/* ============ Hover: ojos más abiertos + boca entreabierta ============ */
.meowl[data-hover="true"] .eye          { scale: 1.06 1.4; }
.meowl[data-hover="true"] .mouth-closed { opacity: 0; }
.meowl[data-hover="true"] .mouth-open   { opacity: 1; scale: 0.7; }

/* ============ Hablando: la boca se mueve ============ */
.meowl[data-talking="true"] .mouth-closed { opacity: 0; }
.meowl[data-talking="true"] .mouth-open {
  opacity: 1;
  scale: 1;
  animation: meowl-talk 0.32s ease-in-out infinite;
}

/* ============ Volando: alas abiertas, boca abierta, mirando al frente ============ */
.meowl[data-flying="true"] #meowl-float { animation: meowl-fly-bob 0.55s ease-in-out infinite; }
.meowl[data-flying="true"] #meowl-tail  { animation-duration: 1s; }
.meowl[data-flying="true"] #wing-left {
  rotate: 65deg;                                   /* ala abierta */
  animation: meowl-flap-l 0.55s ease-in-out infinite;
}
.meowl[data-flying="true"] #wing-right {
  rotate: -65deg;
  animation: meowl-flap-r 0.55s ease-in-out infinite;
}
.meowl[data-flying="true"] .eye          { scale: 1.06 1.3; }
.meowl[data-flying="true"] .mouth-closed { opacity: 0; }
.meowl[data-flying="true"] .mouth-open   { opacity: 1; scale: 1.15; }
.meowl[data-flying="true"] #tree-branch  { opacity: 0; transform: translateY(40px); }
.meowl[data-flying="true"] #cat-paws     { transform: translateY(-14px); }

/* ============ Globo de texto ============ */
.meowl-bubble {
  position: absolute;
  left: 50%;
  bottom: 100%;
  width: max-content;
  max-width: min(240px, 70vw);
  padding: 0.6rem 0.8rem;
  border-radius: 14px;
  background: #fff;
  color: #0f2a43;
  border: 1px solid rgba(15, 42, 67, 0.08);
  box-shadow: 0 6px 20px rgba(15, 42, 67, 0.18);
  font: 600 0.85rem/1.35 system-ui, sans-serif;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 6px) scale(0.96);
  transition: opacity 0.2s, transform 0.2s;
}
.meowl-bubble::after {                 /* colita del globo */
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 12px;
  height: 12px;
  background: #fff;
  border-right: 1px solid rgba(15, 42, 67, 0.08);
  border-bottom: 1px solid rgba(15, 42, 67, 0.08);
  transform: translate(-50%, -6px) rotate(45deg);
}
.meowl-bubble[data-show="true"] {
  opacity: 1;
  transform: translate(-50%, -4px) scale(1);
}

/* ============ Keyframes ============ */
@keyframes meowl-float     { 0%, 100% { transform: translateY(0); }   50% { transform: translateY(-5px); } }
@keyframes meowl-fly-bob   { 0%, 100% { transform: translateY(0); }   50% { transform: translateY(-12px); } }
@keyframes meowl-tail      { 0%, 100% { transform: rotate(-3deg); }   50% { transform: rotate(3deg); } }
@keyframes meowl-blink     { 0%, 92%, 100% { transform: scaleY(1); }  95% { transform: scaleY(0.08); } }
@keyframes meowl-flutter-l { 0%, 100% { transform: rotate(0deg); }    50% { transform: rotate(6deg); } }
@keyframes meowl-flutter-r { 0%, 100% { transform: rotate(0deg); }    50% { transform: rotate(-6deg); } }
/* Aleteo: se suma a rotate: 65deg → el ala oscila entre ~39° y ~81° */
@keyframes meowl-flap-l    { 0%, 100% { transform: rotate(16deg); }   50% { transform: rotate(-26deg); } }
@keyframes meowl-flap-r    { 0%, 100% { transform: rotate(-16deg); }  50% { transform: rotate(26deg); } }
@keyframes meowl-talk      { 0%, 100% { transform: scaleY(0.55); }    50% { transform: scaleY(1); } }

/* ============ Accesibilidad: movimiento reducido ============ */
@media (prefers-reduced-motion: reduce) {
  .meowl *, .meowl { animation: none !important; transition: none !important; }
}
```

**Cómo se combinan `transform` y las propiedades individuales:** los keyframes usan `transform` (parpadeo, aleteo) y los estados usan `scale` / `rotate` (ojos abiertos, alas abiertas). El navegador las suma, así que no se pisan entre sí.

---

## 6. Paso 3: el componente (`Meowl.tsx`)

Toda la lógica vive aquí: estados, frases y vuelo. El vuelo se hace con `element.animate()` sobre el contenedor, **solo con `translate`**, nunca con rotación.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import MeowlSvg from "./MeowlSvg";
import "./meowl.css";

const FEET_RATIO = 0.71;  // altura (0–1) a la que está la rama dentro del SVG
const TAKEOFF_MS = 300;   // las alas se abren antes de despegar
const FLIGHT_MS = 1800;
const BUBBLE_MS = 4200;

// Frases generales (personalízalas, ver sección 9)
const GENERAL_LINES = [
  "¡Ey! Ve a darle un vistazo a los proyectos. No muerdo… mucho.",
  "Kevin es mitad estudiante de ingeniería, mitad desarrollador full-stack. Yo soy mitad gato, mitad búho. Nos entendemos.",
  "Spring Boot, React, Next.js, Flutter… Kevin tiene más capas que yo, pero yo soy más suave.",
  "Desde Tarija hasta tu pantalla: este portfolio está hecho con cariño y con TypeScript.",
  "¿IoT? Kevin hace que los sensores hablen. Yo solo maúllo.",
  "Los gatos siempre caen de pie. El código de Kevin intenta lo mismo.",
  "Si me tocas otra vez, empiezo a cobrar por clic. Mejor mira los proyectos.",
  "Hackathons, freelance y universidad: Kevin duerme cuando termine el deploy.",
];

const t = (x: number, y: number) => `translate(${x}px, ${y}px)`;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function Meowl() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const perch = useRef<HTMLElement | null>(null);
  const pending = useRef<HTMLElement | null>(null);
  const flyingRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLine = useRef("");

  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(false);
  const [flying, setFlying] = useState(false);
  const [bubble, setBubble] = useState({ text: "", show: false });

  /* ---------- Posición y vuelo ---------- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const perches = Array.from(
      document.querySelectorAll<HTMLElement>("[data-meowl-perch]")
    );
    if (perches.length === 0) return;

    // Coordenadas de documento para que los pies (la rama) queden sobre la percha
    const targetFor = (p: HTMLElement) => {
      const r = p.getBoundingClientRect();
      return {
        x: r.left + window.scrollX - el.offsetWidth / 2,
        y: r.top + window.scrollY - el.offsetHeight * FEET_RATIO,
      };
    };

    const place = (x: number, y: number) => {
      pos.current = { x, y };
      el.style.transform = t(x, y);
    };

    const flyTo = async (target: HTMLElement) => {
      if (target === perch.current) return;
      if (flyingRef.current) {          // si ya vuela, recuerda el último destino
        pending.current = target;
        return;
      }

      const from = pos.current;
      const to = targetFor(target);
      perch.current = target;
      setBubble((b) => ({ ...b, show: false }));

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        place(to.x, to.y);              // sin vuelo: aparece en la nueva percha
        return;
      }

      flyingRef.current = true;
      setFlying(true);                  // 1) abre alas y boca
      await wait(TAKEOFF_MS);

      // 2) se eleva, cruza en arco y desciende. Solo translate: SIEMPRE mira al frente
      const peak =
        Math.min(from.y, to.y) -
        clamp(Math.abs(to.x - from.x) * 0.12 + 90, 90, 220);
      const midX = (from.x + to.x) / 2;

      const anim = el.animate(
        [
          { transform: t(from.x, from.y) },
          { transform: t(from.x, from.y - 70), offset: 0.18 },
          { transform: t(midX, peak), offset: 0.55 },
          { transform: t(to.x, to.y - 60), offset: 0.88 },
          { transform: t(to.x, to.y) },
        ],
        { duration: FLIGHT_MS, easing: "ease-in-out", fill: "forwards" }
      );
      try {
        await anim.finished;
      } catch {
        /* animación cancelada */
      }

      // 3) aterriza: fija la posición final y cierra las alas
      place(to.x, to.y);
      anim.cancel();
      await wait(120);
      flyingRef.current = false;
      setFlying(false);

      const next = pending.current;
      pending.current = null;
      if (next && next !== perch.current) flyTo(next);
    };

    // Vuela cuando una percha entra en la franja central de la pantalla
    let firstPass = true;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).pop();
        if (firstPass) {                // primera carga: colócalo sin volar
          firstPass = false;
          const p = (hit?.target as HTMLElement) ?? perches[0];
          perch.current = p;
          const s = targetFor(p);
          place(s.x, s.y);
          setReady(true);
          return;
        }
        if (hit) flyTo(hit.target as HTMLElement);
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    perches.forEach((p) => io.observe(p));

    // Si cambia el tamaño de la página, vuelve a asentarlo en su percha
    const ro = new ResizeObserver(() => {
      if (perch.current && !flyingRef.current) {
        const s = targetFor(perch.current);
        place(s.x, s.y);
      }
    });
    ro.observe(document.body);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  /* ---------- Clic: frase ingeniosa ---------- */
  const speak = () => {
    if (flyingRef.current) return;
    // Frases propias de la sección (data-meowl-says="a|b|c") + las generales
    const local = perch.current?.dataset.meowlSays?.split("|") ?? [];
    const options = [...local, ...GENERAL_LINES].filter(
      (l) => l !== lastLine.current   // no repite la anterior
    );
    const text = options[Math.floor(Math.random() * options.length)];
    lastLine.current = text;

    setBubble({ text, show: true });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setBubble((b) => ({ ...b, show: false })),
      BUBBLE_MS
    );
  };

  return (
    <div
      ref={rootRef}
      className="meowl"
      role="button"
      tabIndex={0}
      aria-label="Meowl, la mascota del portfolio. Púlsalo para escuchar algo"
      data-ready={ready}
      data-hover={hover && !flying}
      data-flying={flying}
      data-talking={bubble.show && !flying}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={speak}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          speak();
        }
      }}
    >
      <div className="meowl-bubble" data-show={bubble.show && !flying} role="status" aria-live="polite">
        {bubble.text}
      </div>
      <MeowlSvg />
    </div>
  );
}
```

---

## 7. Paso 4: montarlo y definir las perchas

### Montaje

Colócalo **en la página que tiene las perchas** (no en el `layout`, porque el efecto busca las perchas al montarse) y como hijo directo del contenedor raíz.

```tsx
// app/page.tsx
import Meowl from "@/components/meowl/Meowl";

export default function Home() {
  return (
    <main>
      <Hero />
      <Proyectos />
      <Sobremi />
      <Contacto />
      <Meowl />
    </main>
  );
}
```

Si usas el *Pages Router*, importa `meowl.css` en `_app.tsx` en lugar de en el componente.

### Perchas

Una **percha** es un punto invisible donde Meowl se posa. La rama queda centrada sobre ese punto, así que colócalo en el borde superior de algo que parezca "una repisa" (una tarjeta, un título, un panel).

```tsx
<section id="proyectos" className="relative">
  <h2>Proyectos</h2>

  <div className="relative">
    {/* Percha: el punto donde se apoya la rama */}
    <span
      data-meowl-perch
      data-meowl-says="¡Aquí están los proyectos de Kevin! Elige uno, yo vigilo.|IoT, web, fintech y plataformas educativas. Kevin no se aburre."
      className="pointer-events-none absolute -top-px right-8 block h-px w-px"
      aria-hidden="true"
    />
    {/* ...tarjetas de proyectos... */}
  </div>
</section>
```

- `data-meowl-perch` marca el punto.
- `data-meowl-says` (opcional) son frases propias de esa sección, separadas por `|`. Se mezclan con las generales al hacer clic.
- **Coloca la percha cerca del título o de la parte visible de la sección.** Meowl vuela a una percha cuando esta entra en la franja central de la pantalla (el 30% del medio).
- Deja al menos ~90 px de margen respecto a los bordes laterales para que las alas abiertas no se corten.
- Pon entre 3 y 5 perchas en total (hero, proyectos, sobre mí, contacto). Más de eso se siente nervioso.

---

## 8. Cómo funciona cada regla

**Hover (ojos y boca).** `onPointerEnter` pone `data-hover="true"`. El CSS aplica `scale: 1.06 1.4` a los ojos (de aplanados a bien abiertos) y cambia la boca en "w" por la boca abierta a un 70%. Al salir el cursor, todo vuelve con una transición suave. El foco con teclado hace lo mismo.

**Clic (frase).** `speak()` elige una frase al azar sin repetir la anterior, muestra el globo durante 4,2 s y, mientras tanto, `data-talking="true"` hace que la boca abra y cierre. Hacer clic otra vez cambia de frase. Durante el vuelo se ignora el clic.

**Vuelo (siempre de frente).**
1. `data-flying="true"`: las alas pasan a `rotate: ±65deg` y empiezan a aletear, la boca se abre del todo, los ojos se abren, la rama se desvanece y las patitas se recogen.
2. Tras 300 ms (para que se vean las alas abrirse primero), el contenedor se mueve con `translate` en un arco: sube, cruza, baja.
3. Al aterrizar se fija la posición final, las alas se cierran, la boca vuelve a su estado normal y la rama reaparece en la nueva percha.

Como el contenedor nunca recibe `rotate` ni `scaleX(-1)`, Meowl llega mirando exactamente de frente, igual que salió.

---

## 9. Personalizar las frases

Edita `GENERAL_LINES` en `Meowl.tsx`. Algunas ideas de tono:

- Invitación a explorar: *"Ve a darle un vistazo a los proyectos."*
- Autoironía sobre el personaje: *"Mitad gato, mitad búho, 100% decorativo."*
- Guiños a la persona del portfolio: su stack, su ciudad, sus hackathons, la universidad.
- Llamada a la acción: *"El botón de contacto está más abajo. Kevin responde más rápido de lo que yo aterrizo."*

Consejos: máximo ~110 caracteres (el globo se lee en 3-4 segundos), una idea por frase, y evita afirmaciones que no sean ciertas del dueño del portfolio.

---

## 10. Ajustes finos

| Qué quieres cambiar | Dónde |
|---|---|
| Tamaño de Meowl | `--meowl-size` en `.meowl` |
| Cuánto se abren las alas al volar | `rotate: 65deg` / `-65deg` en `[data-flying]` |
| Intensidad del aleteo | Keyframes `meowl-flap-l` y `meowl-flap-r` |
| Velocidad del aleteo | `0.55s` en las reglas `[data-flying]` |
| Duración del vuelo | `FLIGHT_MS` |
| Altura del arco | `clamp(... + 90, 90, 220)` en `flyTo` |
| Qué tan abiertos los ojos al hacer hover | `scale: 1.06 1.4` |
| Cuándo vuela (cuándo se activa una percha) | `rootMargin` del `IntersectionObserver` |
| Tiempo que dura el globo | `BUBBLE_MS` |
| Si la rama no queda justo sobre la percha | `FEET_RATIO` (0.71 por defecto) |

---

## 11. Accesibilidad y rendimiento

- Tiene `role="button"`, `tabIndex`, `aria-label` y responde a `Enter` y `Espacio`.
- El globo es un `role="status"`, así que los lectores de pantalla anuncian la frase.
- Con `prefers-reduced-motion` no hay animaciones y Meowl simplemente aparece en la nueva percha, sin volar.
- Solo se animan `transform`, `opacity`, `scale` y `rotate`. Si notas tirones en móviles muy modestos, reduce el `filter` (sombra suave) de las alas o quita la sombra de `#hat`.
- Las propiedades individuales `scale` y `rotate` funcionan en Chrome 104+, Safari 14.1+ y Firefox 72+.

---

## 12. Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| Las alas se ven cortadas | Falta `overflow: visible` en el `<svg>`, o un ancestro tiene `overflow: hidden` |
| No se mueve nada | El SVG está con `<img>` o `background-image`; debe ser inline |
| Meowl queda en una posición rara | Algún ancestro tiene `transform`, `filter` o `position: relative` con desplazamiento; móntalo como hijo directo del contenedor raíz |
| Los ojos no se abren al hacer hover | Quedó el bloque `<style>` original dentro del SVG, o falta la clase `eye` en los grupos de ojos |
| La boca abierta siempre se ve | Falta el atributo `opacity="0"` en `#mouth-open` o no se cargó `meowl.css` |
| Se ve un gradiente raro o sin color | Hay dos Meowl en la página y los `id` se repiten |
| No vuela nunca | Las perchas no existen cuando se monta el componente (ponlo en la misma página), o ninguna entra en la franja central de la pantalla |
| Hay un parpadeo al cargar | Normal sin `visibility: hidden`; verifica que `.meowl` lo tenga hasta `data-ready="true"` |
| El globo se sale de la pantalla | Mueve la percha hacia el centro o ajusta `left` y `max-width` de `.meowl-bubble` para esa percha |
| Los cambios de CSS no se ven en Next | Reinicia `npm run dev` y limpia la caché del navegador |

---

## 13. Lista de verificación

- [ ] SVG convertido a componente, sin el bloque `<style>`
- [ ] `overflow: visible` en el `<svg>`
- [ ] `meowl.css` importado
- [ ] `<Meowl />` montado en la página con perchas
- [ ] Al menos 3 elementos con `data-meowl-perch`
- [ ] Nada de `rotate` ni `scaleX(-1)` sobre Meowl
- [ ] Probado en móvil (toque = frase) y con teclado
- [ ] Probado con "reducir movimiento" activado
