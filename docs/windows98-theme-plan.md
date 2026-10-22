# Plan por fases — Tema Windows 98 en el portafolio

**Rama:** `feat/windows98`
**Objetivo:** agregar un interruptor que permita alternar entre el tema actual (CRT/VHS) y un tema Windows 98, sin duplicar el sitio, sin cambiar el contenido y sin romper el layout.

---

## 1. Contexto

| Dato | Valor |
|---|---|
| Framework | Next 16.2.9 (App Router, `output: "export"`) |
| Estilos | Tailwind CSS 4 + tokens HSL en `globals.css` |
| Componentes | shadcn/ui sobre Radix, `motion/react` |
| Deploy | GitHub Pages, workflow en push a `main` |
| Base path | `/mi-portfolio` |
| Tema actual | Brutalista CRT: fondo casi negro, rojo óxido, ámbar, grano, scanlines, bordes de 2px y sombras duras |

La paleta ya está centralizada en variables (`--background`, `--card`, `--border`, `--accent`, etc.) y los componentes consumen clases semánticas (`bg-card`, `text-foreground`, `border-border`). Eso permite cambiar de tema reasignando tokens en lugar de tocar cada archivo.

---

## 2. Alcance

**Entra**
- Interruptor visible en la navbar (`[ CRT ]` / `[ 98 ]`).
- Persistencia en `localStorage`.
- Tema Win98 aplicado como capa de CSS sobre los mismos componentes.
- Correcciones de accesibilidad del tema nuevo.

**No entra (v1)**
- Iconos de escritorio, boot screen, sonidos, reloj real en taskbar.
- Cambios de contenido, textos o estructura de secciones.
- Fuentes nuevas embebidas (se usa Tahoma con fallback del sistema).
- Tema oscuro/claro del sistema (`prefers-color-scheme`).

**Decisión de diseño:** el tema es un *skin*, no un sitio paralelo. El layout, la grilla, las animaciones y el contenido no cambian; solo cambia la piel.

---

## 3. Arquitectura de la solución

```
<html data-theme="w98">        ← se setea antes del primer paint
  └── globals.css
        ├── @theme inline          (sin cambios)
        ├── :root                  (tema CRT, actual)
        └── [data-theme="w98"]     (nuevo: tokens + overrides)
```

Tres capas:

1. **Tokens** — remapeo de colores. Cubre el 70% del cambio visual.
2. **Efectos y tipografía** — anular grano, scanlines, glows y cambiar familias.
3. **Cromo** — biseles, botones, tarjetas y ventanas. Es el 80% de la sensación Win98.

### Anti-parpadeo (FOUC)

El tema debe aplicarse **antes** del primer paint. Se resuelve con un script inline bloqueante en `layout.tsx`, no con `useEffect`.

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `try{if(localStorage.getItem('theme')==='w98'){document.documentElement.dataset.theme='w98'}}catch(e){}`,
  }}
/>
```

El HTML se renderiza sin atributo (CRT por defecto) y el script lo corrige antes de pintar. Cero mismatch de hidratación.

---

## 4. Fases

### Fase 0 — Preparación ✅ completada
**Estimación:** 2 h · **Riesgo:** bajo

- [x] Crear rama `feat/windows98`.
- [x] Confirmar baseline: `npm run build` y `npm run lint` en verde.
- [x] Capturar screenshots del sitio actual (1440px y 390px) como referencia.
- [x] Inventariar tokens y utilidades que habrá que sobreescribir.

**Resultado**
- `npm run build`: OK, 4 rutas estáticas generadas.
- `npm run lint`: 0 errores, 4 warnings preexistentes de `<img>`.
- Baseline visual en `docs/baseline/`:
  - `crt-desktop-1440.png` (1440 × 3772, 708 KB)
  - `crt-mobile-390.png` (390 × 6482, 540 KB)
- Inventario completo en el [Anexo A](#anexo-a--inventario-de-la-fase-0).

**Nota de método:** las capturas full-page necesitan scroll previo. Las secciones usan `whileInView` con `once: true`, así que si se captura sin recorrer la página, todo lo que está bajo el pliegue sale en negro. El script de captura hace scroll por bloques, vuelve arriba y recién entonces toma la foto.

---

### Fase 1 — Infraestructura del tema ✅ completada
**Estimación:** 4 h · **Riesgo:** bajo

- [x] Agregar bloque de tokens `[data-theme="w98"]` en `globals.css`.
- [x] Script anti-FOUC en `layout.tsx`.
- [x] Crear `src/components/ThemeSwitch.tsx`:
  - [x] botón real con `aria-pressed`.
  - [x] lee/escribe `localStorage` con la clave `theme`.
  - [x] sincroniza `document.documentElement.dataset.theme`.
  - [x] estado inicial consistente con el atributo ya aplicado.
- [x] Insertar el switch en la navbar (desktop y menú móvil).
- [x] Evitar `setState` en cascada durante el render (regla de React 19 / lint del proyecto).
- [x] Extraer el `boxShadow` del Hero a `--shadow-hard` (adelantado desde la Fase 3).

**Resultado**
- `src/app/globals.css`: bloque `[data-theme="w98"]` con los 20 tokens + `--shadow-hard` en `:root`.
- `src/app/layout.tsx`: script inline antes de `{children}` y `suppressHydrationWarning` en `<html>`.
- `src/components/ThemeSwitch.tsx`: control segmentado `CRT | 98` con `aria-pressed`, `localStorage` y sincronización entre pestañas vía evento `storage`.
- `src/components/Navbar.tsx`: switch en el nav de escritorio y en el menú móvil.

**Pruebas ejecutadas (Playwright)**
| Caso | Resultado |
|---|---|
| Estado inicial | `data-theme` ausente, fondo `rgb(19,17,16)`, `CRT:true / 98:false` |
| Click en 98 | `data-theme="w98"`, fondo `rgb(191,191,191)`, tarjetas en gris, `98:true`, `localStorage="w98"` |
| Recarga | Tema y `aria-pressed` se mantienen |
| Vuelta a CRT | Atributo eliminado, fondo original, `localStorage="crt"` |
| Consola | Sin errores ni warnings de hidratación |
| Menú móvil | Switch visible y funcional dentro del menú |

**Decisión técnica:** el estado del tema se lee con `useSyncExternalStore`, no con `useState` + `useEffect`. Así se evita el mismatch de hidratación (el servidor siempre asume CRT) y se cumple la regla de React 19 que prohíbe `setState` dentro de un efecto.

**Tokens base**

```css
[data-theme="w98"] {
  --background: 0 0% 75%;        /* #c0c0c0 */
  --foreground: 0 0% 0%;
  --card: 0 0% 75%;
  --card-foreground: 0 0% 0%;
  --popover: 0 0% 75%;
  --popover-foreground: 0 0% 0%;
  --primary: 240 100% 25%;       /* navy #000080 */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 87%;
  --secondary-foreground: 0 0% 0%;
  --muted: 0 0% 87%;
  --muted-foreground: 0 0% 25%;
  --accent: 240 100% 25%;
  --accent-foreground: 0 0% 100%;
  --border: 0 0% 50%;            /* #808080 */
  --input: 0 0% 50%;
  --ring: 240 100% 25%;
  --radius: 0;
}
```

**Criterios de aceptación**
- Cambiar el switch repinta la paleta al instante, sin recargar.
- Al recargar se mantiene la elección.
- No hay destello del tema anterior al cargar.
- Con JS deshabilitado el sitio sigue funcionando en CRT.

---

### Fase 2 — Neutralizar el CRT y cambiar tipografía ✅ completada
**Estimación:** 4 h · **Riesgo:** bajo

- [x] Ocultar las capas globales: `[data-theme="w98"] body::before`, `::after { display: none }` (grano y scanlines).
- [x] Desactivar `.crt-glow`, `.chromatic-hover`, `.flicker`, `.grid-bg`.
- [x] Ocultar `.terminal-cursor` (era decorativo y en gris claro quedaba como un bloque suelto).
- [x] Redefinir las variables de fuente para que las utilidades existentes tomen Tahoma:

```css
[data-theme="w98"] {
  --font-jetbrains-mono: Tahoma, "MS Sans Serif", "Segoe UI", sans-serif;
  --font-special-elite: Tahoma, "MS Sans Serif", "Segoe UI", sans-serif;
}
```

- [x] Normalizar `letter-spacing` de `.font-display` y de `h1`–`h3` (Special Elite usa tracking negativo).
- [x] Ocultar el halo difuso del Hero (`.crt-halo`, clase nueva en `Hero.tsx`).

**Resultado**
- `globals.css`: bloque de overrides **fuera de `@layer`** para ganarle a las utilidades de Tailwind.
- Las variables `--font-jetbrains-mono` y `--font-special-elite` se redefinen bajo `html[data-theme="w98"]` (especificidad `0,1,1`), así le ganan a la clase que inyecta `next/font` sin importar el orden de las hojas.
- `Hero.tsx`: el halo decorativo ahora tiene clase `crt-halo` y se oculta en Win98.

**Pruebas ejecutadas (Playwright, `getComputedStyle`)**
| Propiedad | CRT | Win98 |
|---|---|---|
| Tipografía del body | `JetBrains Mono` | `Tahoma` |
| Grano (`body::before`) | `block` | `none` |
| Scanlines (`body::after`) | `block` | `none` |
| `text-shadow` del nombre | dos capas rojas | `none` |
| `background-image` de `.grid-bg` | dos gradientes | `none` |
| `animation-name` de `.flicker` | `flicker` | `none` |
| Halo `.crt-halo` | `block` | `none` |
| `letter-spacing` de `h2` | `-0.9px` | `normal` |
| Errores de consola | — | ninguno |

**Decisión:** no se cambia el `font-size` base (sigue en 16px). Win98 usaba 12px, pero bajarlo reflowaría todo el layout y rompería el principio de "solo cambia la piel". Se compensa con Tahoma, que ya se lee como sistema.

**Pendiente para la Fase 3:** las sombras duras y los bordes de 2px siguen visibles, y en gris claro se leen más "neobrutalistas" que "Win98". Eso es exactamente lo que resuelve el bisel.

---

### Fase 3 — Cromo Win98 ✅ completada
**Estimación:** 1 día · **Riesgo:** medio

- [x] Convertir `.brutalist-border` en bisel elevado:

```css
[data-theme="w98"] .brutalist-border {
  border-color: transparent;
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #ffffff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
}
[data-theme="w98"] .brutalist-border:hover {
  transform: none;
  border-color: transparent;
  box-shadow: /* mismo bisel */;
}
```

- [x] Convertir `.brutalist-shadow` (botones) en bisel elevado + estado `:active` hundido.
- [x] Remapear los `border-2 border-border` sueltos (mosaicos, navbar, separadores) a bisel / gris de sistema.
- [x] ~~Sacar el `boxShadow` inline del Hero a un token~~ → adelantado y hecho en la Fase 1 (`--shadow-hard`).
- [x] Alternancia de fondos entre secciones: se dejó sutil (`bg-muted/20` sobre gris) porque no compite con los biseles.
- [x] Revisar `Badge` (hoy es outline) → campo hundido.
- [x] Revisar el foco: anillo punteado de 1px en lugar del ring ámbar.

**Resultado**
- Variables `--w98-hi`, `--w98-light`, `--w98-shadow`, `--w98-dark`, `--w98-raised` y `--w98-sunken`.
- `.brutalist-border` (tarjetas) → bisel elevado, sin borde y sin desplazamiento al hover.
- `.brutalist-shadow` (botones) → cara gris del sistema, bisel elevado, `:active` hundido con desplazamiento de 1px.
- El botón primario se distingue con el **anillo interior** del botón por defecto de Win98, no con color: en este tema todos los botones son grises.
- `.border-2` (mosaicos de skills, switch de tema, íconos de contacto, flechas del carrusel) recibió el mismo bisel, para que no queden planos al lado de las tarjetas.
- Navbar y cabecera del modal: fondo opaco, sin `backdrop-filter`.
- `Badge` y chip de impacto → campo hundido.
- Foco: `outline: 1px dotted` en lugar del ring ámbar.

**Sin salto de layout:** Tailwind usa `box-sizing: border-box`, así que quitar los 2px de borde no mueve nada: el contenido crece 4px y el tamaño externo se mantiene.

**Pruebas ejecutadas (Playwright, `getComputedStyle`)**
| Elemento | CRT | Win98 |
|---|---|---|
| Tarjeta — borde | `2px` | `0px` |
| Tarjeta — sombra | `rgb(73,67,54) 4px 4px` | `inset` en 4 capas |
| Botón — fondo | `rgb(189,60,40)` (rojo) | `rgb(191,191,191)` (gris) |
| Botón — texto | claro | `rgb(0,0,0)` |
| Overflow horizontal en 390px | — | `false` |
| Consola | — | sin errores |

**El tema CRT quedó intacto:** se verificó que tarjetas y botones conservan borde de 2px, sombra dura y colores originales.

**Puntos de atención**
- El bisel **no reemplaza** al borde: si se dejan ambos, se ve doble. Hay que anular `border-color`.
- `.brutalist-border:hover` mueve el elemento `-2px`; eso debe desactivarse en Win98.
- Las sombras duras de `Card` y `Button` comparten utilidad: cambiar una afecta a ambos, revisar los dos.

**Criterios de aceptación**
- Botones, tarjetas y navbar se leen como controles Win98.
- El layout no se mueve ni se desborda respecto del tema CRT.
- No quedan hovers "brutalistas" (desplazamiento + sombra de color).

---

### Fase 4 — Ventanas y taskbar (opcional) ✅ completada
**Estimación:** 1 día · **Riesgo:** medio-alto

- [x] Modal de proyectos (`ProjectView`) como ventana:
  - [x] titlebar con gradiente `#000080 → #1084d0`.
  - [x] botones `_ □ ×` (`×` funcional con `aria-label`; `_` y `□` decorativos con `aria-hidden`).
  - [x] barra de estado con el índice del proyecto (`01 / 03`).
- [x] Navbar como taskbar:
  - [x] botón Start con el logo `KG_` (logo de 4 colores vía `conic-gradient`).
  - [x] links como "tasks" con estado activo: resuelto con `aria-current` + scroll-spy (`IntersectionObserver`); la task activa se ve presionada en Win98.
  - [x] menú móvil como Start menu desplegable: sidebar azul `#000080` con "Windows98" vertical e ítems con hover navy.
- [x] Barra de progreso o reloj: descartado (no aporta).

**Criterios de aceptación**
- La ventana se cierra con `Esc` y con el botón, manteniendo la navegación por teclado actual.
- En móvil la taskbar no rompe el menú hamburguesa.
- Nada de esto afecta al tema CRT.

---

### Fase 5 — Accesibilidad y QA ✅ completada
**Estimación:** 4 h · **Riesgo:** bajo

- [x] `aria-pressed` correcto en el switch y etiqueta accesible (ya cumplido en `ThemeSwitch.tsx`).
- [x] Foco visible en ambos temas: regla global `a/button/[role="button"]:focus-visible` + foco punteado en Win98.
- [x] Contraste: `muted-foreground` 25% pasa AA (~5.6:1). Corregidas las notas en `muted-foreground/70` (~3.1:1 → fallaba) con clase `note-muted`.
- [x] `@media (prefers-reduced-motion: reduce)` + `<MotionConfig reducedMotion="user">` en `layout.tsx`.
- [x] `@media (forced-colors: active)`: restaura `border: 1px solid ButtonBorder` a los biseles y foco con `CanvasText`.
- [x] Sin scroll horizontal en 320, 390, 768, 1024 y 1440 px (corregido overflow de 5 px a 320 px: botones del footer con `flex-wrap`).
- [x] Imágenes de proyecto: las capturas tienen cabeceras de color (verde/navy); `gabinete3.png` es blanca y el carrusel ahora es un pozo hundido (`w98-well`) para enmarcarla.

**Pruebas ejecutadas (Playwright)**
| Caso | Resultado |
|---|---|
| Overflow 320/390/768/1024/1440 (w98 y CRT) | `false` en todos |
| Foco del primer enlace (Tab) | `outline` punteado 1px |
| Foco de tarjeta (`role=button`) | `outline` punteado 1px |
| Errores de consola | 0 |

**Criterios de aceptación**
- Navegación completa por teclado en ambos temas. ✅
- Ningún control queda invisible en alto contraste. ✅
- Sin overflow horizontal en ningún breakpoint. ✅

---

### Fase 6 — Cierre ✅ (excepto merge)
**Estimación:** 2 h · **Riesgo:** bajo

- [x] `npm run build` y `npm run lint` sin errores nuevos.
- [x] Screenshots finales de ambos temas (desktop y móvil) en `docs/final/`.
- [x] Nota en el README explicando el switch y cómo se persiste.
- [ ] Merge a `main` y verificación del deploy de GitHub Pages → **pendiente** (se hace push a `feat/windows98`).
- [x] Confirmar que el tema por defecto sigue siendo CRT para visitantes nuevos.

---

## 5. Estimación total

| Escenario | Fases | Estimación |
|---|---|---|
| **MVP usable** | 0 → 3 | ~2 días |
| **Completo** | 0 → 6 | ~4 días |

La Fase 4 es la única que puede recortarse sin afectar la funcionalidad del switch.

---

## 6. Archivos que se tocan

| Archivo | Cambio |
|---|---|
| `src/app/globals.css` | Bloque de tokens Win98 + overrides de utilidades |
| `src/app/layout.tsx` | Script anti-FOUC |
| `src/components/ThemeSwitch.tsx` | **Nuevo** |
| `src/components/Navbar.tsx` | Montar el switch; posible taskbar (Fase 4) |
| `src/components/sections/Hero.tsx` | Sacar el `boxShadow` inline a token |
| `src/components/ui/button.tsx` | Revisar variantes bajo el nuevo bisel |
| `src/components/ui/card.tsx` | Sin cambios de clase; hereda del override |
| `src/components/sections/ProjectView.tsx` | Ventana Win98 (Fase 4) |

Sin dependencias nuevas.

---

## 7. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Destello del tema anterior al cargar | Alto (se ve roto) | Script inline bloqueante antes del paint |
| Mismatch de hidratación | Medio | El HTML siempre renderiza sin atributo; el script lo ajusta |
| Tahoma no existe en macOS/Linux | Bajo | Fallback a `MS Sans Serif`, `Segoe UI`, `sans-serif` |
| Mezcla de dos estéticas retro | Medio | El default sigue siendo CRT; Win98 es un guiño opcional |
| Estilos inline hardcodeados | Bajo | Inventario en Fase 0; ya identificado el del Hero |
| Biseles invisibles en alto contraste | Medio | `@media (forced-colors: active)` con bordes reales |
| Regresión del tema actual | Bajo | Todos los overrides viven bajo `[data-theme="w98"]`; CRT no se toca |

---

## 8. Definición de terminado

- El switch funciona, persiste y no produce destellos.
- El tema CRT queda **byte por byte** igual que hoy.
- Win98 se ve coherente en navbar, hero, sobre mí, proyectos, modal y contacto.
- Build y lint en verde.
- Navegación por teclado completa en ambos temas.
- Deploy en `main` verificado.

---

## 9. Rollback

Todo el tema nuevo está contenido en:
1. Un bloque `[data-theme="w98"]` en `globals.css`.
2. Un componente nuevo (`ThemeSwitch.tsx`).
3. Dos líneas en `layout.tsx` y una en `Navbar.tsx`.

Revertir el merge devuelve el sitio exactamente al estado actual. No hay migraciones, ni datos, ni cambios de contenido.

---

## Anexo A — Inventario de la Fase 0

### A.1 Tokens a remapear

Todos viven en `:root` (`src/app/globals.css`) y se consumen vía `@theme inline`. Son 20.

| Token | CRT actual | Objetivo Win98 | Nota |
|---|---|---|---|
| `--background` | `18 8% 7%` | `0 0% 75%` | Gris de escritorio `#c0c0c0` |
| `--foreground` | `40 25% 88%` | `0 0% 0%` | Texto negro |
| `--card` | `18 8% 10%` | `0 0% 75%` | Tarjetas = cara del sistema |
| `--card-foreground` | `40 25% 88%` | `0 0% 0%` | |
| `--popover` | `18 8% 10%` | `0 0% 75%` | |
| `--popover-foreground` | `40 25% 88%` | `0 0% 0%` | |
| `--primary` | `8 65% 45%` | `240 100% 25%` | Navy `#000080` |
| `--primary-foreground` | `40 25% 92%` | `0 0% 100%` | |
| `--secondary` | `18 5% 15%` | `0 0% 87%` | `#dfdfdf` |
| `--secondary-foreground` | `40 25% 88%` | `0 0% 0%` | |
| `--muted` | `18 5% 15%` | `0 0% 87%` | Fondo alterno de secciones |
| `--muted-foreground` | `40 10% 60%` | `0 0% 25%` | Contraste sobre gris |
| `--accent` | `48 85% 55%` | `240 100% 25%` | Ámbar → navy |
| `--accent-foreground` | `18 8% 7%` | `0 0% 100%` | |
| `--destructive` | `0 80% 55%` | `0 100% 25%` | Rojo Win98 `#800000` |
| `--destructive-foreground` | `40 25% 92%` | `0 0% 100%` | |
| `--border` | `40 15% 25%` | `0 0% 50%` | `#808080` |
| `--input` | `40 15% 25%` | `0 0% 50%` | |
| `--ring` | `48 85% 55%` | `240 100% 25%` | Anillo de foco |
| `--radius` | `0` | `0` | Ya es cero: no hay que tocar bordes redondeados |

### A.2 Utilidades y capas globales

| Elemento | Usos | Acción en Win98 |
|---|---|---|
| `.chromatic-hover` | 13 | Anular `text-shadow` (la aberración cromática no existe en 98) |
| `.brutalist-border` | 3 | Sustituir borde + sombra dura por bisel elevado |
| `.brutalist-shadow` | 6 | Bisel elevado; `:active` hundido |
| `.crt-glow` | 3 | Anular |
| `.grid-bg` | 2 | Anular |
| `.flicker` | 5 | Anular animación |
| `.terminal-cursor` | 2 | Dejar visible y estático |
| `.link-underline` | 4 | Mantener; ajustar color al navy |
| `body::before` (grano) | 1 | `display: none` |
| `body::after` (scanlines) | 1 | `display: none` |
| `@keyframes scanline-drift` | 1 | Sin uso al anular la capa |
| `@keyframes flicker` | 1 | Sin uso |
| `@keyframes cursor-blink` | 1 | Sin uso |

### A.3 Clases estructurales con efecto en el tema

| Clase | Usos | Riesgo |
|---|---|---|
| `text-accent` | 48 | Alto: define casi todo el énfasis; pasa de ámbar a navy |
| `text-muted-foreground` | 29 | Medio: verificar contraste sobre `#c0c0c0` |
| `border-2` | 20 | Alto: en Win98 un borde 2px plano no existe; compite con el bisel |
| `border-t-2` | 5 | Bajo: separadores de sección |
| `border-b-2` | 4 | Bajo: navbar y cabeceras |
| `bg-card` | 4 | Bajo: hereda del token |
| `bg-muted/20` | 2 | Medio: alternancia de fondo en *Sobre mí* y *Contacto* |

### A.4 Valores hardcodeados

| Ubicación | Valor | Acción |
|---|---|---|
| `Hero.tsx:35` | `boxShadow: "6px 6px 0 0 hsl(8 65% 45%)"` | **Único color hardcodeado del proyecto.** Extraer a token en Fase 1 |
| `Hero.tsx:17` | `bg-primary/15 blur-3xl` | Halo CRT: anular en Win98 |
| `Navbar.tsx:18` | `bg-background/95 backdrop-blur-sm` | En 98 la barra debe ser opaca: `backdrop-blur: none` |
| `ProjectView.tsx:65,72,158,165` | `bg-background/80` | Overlays translúcidos: revisar legibilidad sobre gris |
| `ProjectView.tsx:200` | `border-accent/60 bg-accent/10` | Chip de impacto: pasa a navy translúcido |
| `Contact.tsx:71` | `bg-primary/10`, `group-hover:bg-accent/15` | Tintes sobre gris claro |
| `Projects.tsx:138` | `bg-background/70` | Overlay de hover en tarjetas |

### A.5 Tipografía

Las fuentes llegan por `next/font` y se exponen como variables que `@theme inline` mapea a `font-sans`, `font-mono` y `font-display`.

- `--font-jetbrains-mono` → body y todo el texto mono.
- `--font-special-elite` → títulos y `.font-display`.

Basta redefinir **esas dos variables** bajo `[data-theme="w98"]` para que toda la tipografía cambie sin tocar componentes. No se cargan fuentes nuevas.

### A.6 Hallazgos que ajustan el plan

1. **El único color hardcodeado es el del Hero.** El resto es 100% token-driven. Conviene moverlo a token en la **Fase 1** (no en la 3, como decía el plan original), porque bloquea cualquier override limpio.
2. **El navbar y el modal usan fondos semitransparentes con blur.** En Win98 no existe transparencia de chrome; hay que forzar opacidad total y quitar el blur.
3. **`text-accent` aparece 48 veces.** Es la clase de mayor impacto: al pasar de ámbar a navy, el sitio entero cambia de carácter. Es la señal más fuerte de que el theming por tokens va a funcionar.
4. **20 usos de `border-2` compiten con el bisel.** Hay que decidir por elemento: los que son "control" (botones, cards, inputs) llevan bisel; los que son "separador" (navbar, section) llevan línea plana de 1–2px.
5. **Las animaciones de entrada hacen que las capturas full-page salgan negras** si no se hace scroll previo. Documentado para no repetir el error en las comparaciones de Fase 3.
6. **`--radius` ya es `0`**, así que el tema nuevo no pelea con bordes redondeados de shadcn. Un problema menos.

### A.7 Reproducir el baseline

Las capturas se generan con Playwright, sirviendo el export estático:

```bash
npm run build
python -m http.server 8899 --directory out   # servido como /mi-portfolio
```

El script de captura debe: navegar, hacer scroll por bloques de ~70% del viewport, volver arriba, esperar ~900 ms y recién entonces tomar la foto con `fullPage: true`.
