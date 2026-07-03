# Sistema de Orientación Vocacional UCB

Plataforma full-stack de orientación vocacional desarrollada para la **Universidad Católica Boliviana (UCB)**, orientada a automatizar la administración de tests psicométricos (MIDAS y CHASIDE) durante campañas itinerantes en colegios, procesar los resultados, generar reportes analíticos y entregar recomendaciones de carrera personalizadas a cada estudiante.

---

## Resumen ejecutivo

El sistema digitaliza por completo el proceso de orientación vocacional que la UCB ejecuta en colegios de Bolivia: desde el diseño y programación de campañas, pasando por la toma de tests desde el celular del estudiante mediante un simple código QR, hasta la generación de reportes agregados por colegio, campaña e individuo. La plataforma sustituye procesos manuales (formularios en papel, tabulación en Excel, entrega física de resultados) por un flujo end-to-end con envío automático de resultados por correo, exportación masiva en PDF/Excel/ZIP y un panel administrativo con analíticas en tiempo real.

- **Público objetivo:** estudiantes de secundaria, personal de orientación vocacional UCB y coordinadores de colegios.
- **Escala esperada:** múltiples campañas simultáneas, decenas de colegios por gestión y miles de respuestas de estudiantes.
- **Modelo:** SaaS interno multi-tenant a nivel de campaña, con acceso público (sin login) para estudiantes vía hash URL / QR.

---

## Arquitectura general

Arquitectura cliente-servidor desacoplada, con despliegue en contenedores Docker independientes.

```
┌────────────────────┐        HTTPS / JWT         ┌─────────────────────┐
│  React 19 SPA      │  ────────────────────────► │  Spring Boot 4 API  │
│  (Vite + TS + TW)  │  ◄──── JSON REST ────────  │  (Java 21)          │
│  Nginx Alpine      │                            │  Eclipse Temurin JRE│
└────────────────────┘                            └──────────┬──────────┘
                                                             │ JPA / HikariCP
                                                             ▼
                                                  ┌─────────────────────┐
                                                  │  PostgreSQL 15      │
                                                  │  Flyway migrations  │
                                                  │  JSONB (baremos)    │
                                                  └─────────────────────┘
                       ▲                                     │
                       │ OAuth2 Google                       │ SMTP async
                       │ Passwordless OTP                    ▼
                       │                          ┌─────────────────────┐
                       └──────────────────────────│  Gmail SMTP (TLS)   │
                                                  └─────────────────────┘
```

**Patrón:** arquitectura en capas (controllers → services → repositories → entities) con DTOs y MapStruct en el back, y patrón contexts + hooks + services en el front. Autenticación stateless vía JWT para permitir escalado horizontal.

---

## Stack tecnológico

### Backend
- **Java 21** (LTS) + **Spring Boot 4.0.3**
- **Spring Data JPA / Hibernate 6** con soporte nativo de `JSONB`
- **Spring Security 6** — filtros JWT + OAuth2 Client (Google)
- **JJWT 0.12.6** para emisión y validación de tokens
- **PostgreSQL 15 Alpine** + **HikariCP** (pool tuneado)
- **Flyway 11** — 16+ migraciones versionadas
- **MapStruct 1.6** + **Lombok** — mappers y reducción de boilerplate
- **Spring Boot Mail** con `@EnableAsync` para envíos no bloqueantes
- **SpringDoc OpenAPI 3** — documentación Swagger auto-generada
- **spring-dotenv** para gestión de variables de entorno
- **Docker multi-stage build** (Maven builder → JRE Alpine, usuario no-root)

### Frontend
- **React 19.2** + **TypeScript 5.9** (strict mode)
- **Vite 7.3** con Fast Refresh
- **Tailwind CSS 4.2** (`@tailwindcss/vite`)
- **React Router DOM 7.13** con rutas protegidas y públicas
- **jsPDF 4 + jspdf-autotable 5** — generación de reportes PDF
- **XLSX 0.18** — exportación Excel
- **JSZip 3.10** — descarga masiva empaquetada
- **qrcode.react 4** — QR dinámicos para acceso público a tests
- **lucide-react** — iconografía SVG
- **ESLint 9** + plugins de TypeScript / React Hooks
- **Nginx Alpine** como servidor estático con fallback SPA

### Infraestructura
- **Docker Compose** — orquestación de DB + servicios
- **Volúmenes persistentes** para datos de PostgreSQL
- Variables de entorno separadas por ambiente (`.env`, `application.properties`, `VITE_*`)

---

## Modelo de dominio

Entidades núcleo gestionadas por el sistema:

| Entidad | Descripción |
|---|---|
| **Gestion** | Año/período académico (2025, 2026…). Solo una activa a la vez. |
| **Colegio** | Institución educativa (nombre, tipo, ciudad). |
| **Campana** | Campaña de orientación con fecha, horarios y estado (programada/activa/finalizada). |
| **Formulario** | Plantilla de test psicométrico (MIDAS o CHASIDE) con `estructura_baremos` y `story_telling` en JSONB. |
| **CampanaFormulario** | Relación many-to-many entre campaña y formularios, con orden secuencial. |
| **CampanaFormularioColegio** | Ventana de disponibilidad por colegio con `starts_at`, `expires_at` y **hash URL única** para acceso público. |
| **Persona** | Estudiante que rinde el test (nombres, cédula, celular, email). |
| **Respuesta** | Envío del estudiante con `payload_crudo` (respuestas) y `resultado_procesado` (scores + carreras sugeridas) en JSONB. |
| **Usuario** | Operador del sistema con rol `ADMIN`, `OPERADOR` o `GERENCIAL`. |
| **VerificationCode** | Códigos OTP de 6 dígitos con expiración de 10 min para login passwordless. |

Todas las entidades usan **UUID** como PK (`gen_random_uuid()`), **soft deletes** vía `is_deleted` y columnas de auditoría (`created_at`, `updated_at`).

---

## Funcionalidades principales

### 1. Autenticación robusta y flexible
- **Login passwordless por OTP:** el operador solicita un código de 6 dígitos que llega por email y expira en 10 minutos. Cero contraseñas almacenadas.
- **OAuth2 con Google:** flujo server-side completo, `OAuth2AuthenticationSuccessHandler` que emite el JWT y redirige al frontend.
- **JWT stateless** (HMAC 256 bits, expiración 24 h) con claims de `idUsuario`, `email` y `rol`.
- **Interceptor de 401** en el frontend que dispara logout automático.
- **Timeout por inactividad de 30 min** con modal de advertencia a los 28 min y cuenta regresiva de 2 min.
- **Rutas protegidas** vía `<ProtectedRoute>` y `<PublicRoute>` en React Router.

### 2. RBAC (Control de acceso por roles)
Tres roles con permisos diferenciados enforced a nivel de endpoint (Spring Security) y a nivel de UI (hook `usePermissions`):
- **ADMIN** — control total, gestión de usuarios y roles.
- **OPERADOR** — gestión de campañas, colegios y reportes.
- **GERENCIAL** — vista de solo lectura sobre analíticas y reportes.

### 3. Gestión de campañas itinerantes multi-colegio
- Una campaña puede visitar **múltiples colegios**, cada uno con su propia ventana de tiempo (`starts_at` / `expires_at`).
- Generación automática de **hash URL única e inadivinable** por combinación `(campaña, formulario, colegio)`.
- Estados de campaña con validaciones (`programada` → `activa` → `finalizada`).
- Validación de zona horaria de Bolivia (`America/La_Paz`).
- Excepciones de dominio específicas: `FormularioExpiredException`, `CampanaInactivaException`, `CampanaReprogramacionInvalidaException`.

### 4. Toma pública del test (sin login)
- El estudiante escanea un **código QR** que apunta a `/c/{hash}`.
- Flujo multi-paso gestionado por el hook maestro `useFormularioVocacional` (25 KB de lógica):
  1. **Storytelling** — pantallas personalizables de bienvenida, instrucciones y motivación.
  2. **Test dinámico** — una pregunta por pantalla con auto-avance al seleccionar.
  3. **Datos personales** — captura y validación (cédula, celular, email).
  4. **Éxito** — confirmación al enviar.
- Diseño **mobile-first** optimizado para celulares (touch targets ≥ 48 px).
- Detección automática de tests expirados / campañas inactivas con pantallas de error informativas.

### 5. Motor de cálculo psicométrico
`ResultadoCalculadorService` con estrategias enchufables para dos tests estándar:
- **MIDAS** — Inteligencias múltiples (escala Likert 0-5), score porcentual, top 3 inteligencias.
- **CHASIDE** — Intereses y aptitudes (escala dicotómica 0/1), subtotales por área, top 2 perfiles.
- **Baremos configurables** almacenados como JSONB en el formulario (extensible sin cambiar código).
- **Mapeo automático** de puntajes a carreras UCB recomendadas.
- Persistencia dual: `payload_crudo` (respuestas del estudiante) + `resultado_procesado` (scores + carreras).

### 6. Notificaciones por email
- `EmailService` con `@Async` para no bloquear la respuesta HTTP.
- **Emails HTML branded UCB** con:
  - Header institucional (colores azul + dorado).
  - Barras de progreso por dimensión / inteligencia.
  - Listado de carreras UCB recomendadas.
  - Diseño responsivo.
- SMTP configurable (Gmail / Google Workspace) sobre TLS puerto 587.

### 7. Sistema de reportes avanzado
Tres tipos de reporte por cada test (MIDAS y CHASIDE):
- **Consolidado** — puntajes agregados por dimensión.
- **Puntuaciones** — puntajes crudos por estudiante.
- **Personal** — perfil individual con top/bottom y gráficos de barras.

Vistas específicas para:
- Reporte por **campaña-formulario**.
- Reporte por **colegio**.
- Reporte **individual por estudiante**.

**Formatos de exportación:**
- **PDF individual** con `pdfGenerator.ts` (28 KB) — headers/footers UCB, gráficos SVG de barras dibujados directamente en el PDF, tablas con `jspdf-autotable`.
- **Excel (XLSX)** — hojas estructuradas por tipo de reporte.
- **ZIP masivo** con estructura jerárquica: `Reporte_{campaña}/{TIPO_TEST}/{Consolidado|Puntuaciones|Personal}/{estudiante}.pdf`.

### 8. Constructor visual de formularios
- **FormBuilderModal** para crear/editar tests sin escribir JSON.
- Editor inline de preguntas, opciones y puntajes.
- Gestión visual de baremos (mapeo pregunta → dimensión).
- Preview del cuestionario antes de publicar.
- Edición separada del **storytelling** por formulario (bienvenida, transiciones, despedida, imágenes por paso).

### 9. Dashboard analítico
- **Resumen general:** total de tests, estudiantes, campañas activas.
- **Tests por mes** — tendencia de últimos 12 meses.
- **Top colegios** por volumen de respuestas.
- **Campañas recientes** con estado.
- Gráficos SVG customs (sin dependencias pesadas de charting).
- **Auto-refresh silencioso cada 15 s** vía `useAutoRefresh`.

### 10. Generación de QR y links compartibles
- QR dinámico por cada `(campaña, formulario, colegio)` — descargable como PNG.
- Link copiable al portapapeles.
- Acceso público sin autenticación (protegido por hash inadivinable).

### 11. Multi-idioma visual y branding
- **Tema claro/oscuro** con toggle persistente en localStorage.
- Paleta oficial UCB (azul `#00428A` + dorado `#FDBB30`).
- Tipografía **Montserrat**.
- Aplicación consistente del branding en UI, PDFs y emails.

### 12. Documentación API
- **Swagger UI** en `/swagger-ui.html` (auto-generado, deshabilitado en producción).
- OpenAPI 3 con `springdoc-openapi`.

---

## Endpoints principales del backend

| Área | Base path | Endpoints destacados |
|---|---|---|
| Autenticación | `/api/auth` | `send-code`, `verify-code`, `validate`, `me` |
| Campañas | `/api/v1/campanas` | CRUD + filtrado por gestión |
| Formularios | `/api/v1/formularios` | CRUD de plantillas de test |
| Campaña-Formulario | `/api/v1/campana-formularios` | Asignación de tests + generación de hashes |
| Test público | `/api/v1/public/test/{hashUrl}` | Submit sin auth |
| Respuestas | `/api/v1/respuestas` | Consulta por persona / campaña-formulario |
| Reportes MIDAS | `/api/v1/reportes/midas` | `puntuaciones`, `consolidado`, `personal`, `colegio/*` |
| Reportes CHASIDE | `/api/v1/reportes/chaside` | Estructura análoga |
| Colegios | `/api/v1/colegios` | CRUD |
| Gestiones | `/api/v1/gestiones` | CRUD + `/activa` |
| Usuarios | `/api/v1/usuarios` | CRUD *(solo ADMIN)* |
| Dashboard | `/api/v1/dashboard` | `resumen`, `tests-por-mes`, `top-colegios`, `campanas-recientes` |

---

## Estructura del proyecto

### Backend (`orientacion-vocacional/`)
```
com.ucb.orientacion_vocacional/
├── auth/                       (controller, dto, entity, security, service, util)
├── common/                     (config, exception, util)
└── modules/
    ├── campanas/               (campañas, formularios, respuestas, reportes MIDAS/CHASIDE)
    ├── colegios/
    ├── gestiones/
    ├── usuarios/
    └── dashboard/
```

### Frontend (`orientacionvocacional-front/`)
```
src/
├── config/         (api.ts, apiConfig, constants)
├── types/          (13 archivos de tipos TS)
├── services/       (13 servicios HTTP)
├── context/        (AuthContext, ThemeContext)
├── hooks/          (useAuth, useFormularioVocacional, useInactivityTimer, usePermissions…)
├── components/     (auth, dashboard, formulario, formularios, reportes, campanas, admin, ui…)
├── layouts/        (AuthLayout, DashboardLayout)
├── pages/          (16 páginas)
├── router/         (AppRouter con guards)
└── utils/          (pdfGenerator 28 KB, validations)
```

- **~10.700 líneas** de TypeScript / TSX en 106 archivos.
- Bundle final **~150 KB gzipped**.

---

## Buenas prácticas y decisiones técnicas

- **Arquitectura limpia por capas** con separación estricta controller / service / repository.
- **DTOs + MapStruct** para desacoplar entidades JPA del contrato HTTP.
- **JSONB para baremos y storytelling** — flexibilidad de esquema sin sacrificar integridad relacional.
- **Excepciones de dominio tipadas** + `GlobalExceptionHandler` con formato de error consistente.
- **Async + scheduling** (`@EnableAsync`, `@EnableScheduling`) para procesos no bloqueantes.
- **Flyway** como single source of truth del esquema (`ddl-auto: validate`).
- **HikariCP tuneado** (20 max, 5 min idle, leak detection).
- **Docker multi-stage** con usuario no-root y JRE Alpine (imagen mínima).
- **Frontend sin Redux** — Context API + hooks personalizados suficientes para el scope.
- **Fetch wrapper centralizado** (`apiRequest<T>`) con inyección automática de token e interceptor de 401.
- **Diseño accesible** — touch targets ≥ 48 px, contraste WCAG AA, navegación por teclado, dark mode.
- **Zero password storage** — solo OTP + OAuth2.

---

## Diferenciadores clave

1. **Passwordless-first** — sin base de datos de contraseñas que comprometer.
2. **Constructor visual de tests** — personal no técnico puede crear formularios y storytelling.
3. **Campañas itinerantes multi-colegio** con ventanas de tiempo independientes y URLs únicas.
4. **Batch export en ZIP** con estructura de carpetas por campaña y tipo de test.
5. **Gestión de inactividad en tiempo real** — modal con countdown para evitar cierre abrupto.
6. **Reportes psicométricos automatizados** con recomendación de carreras y envío por email.
7. **Multi-tenancy suave** — separación de datos por campaña, colegio y gestión académica.

---

## Roles del proyecto

- **Diseño de arquitectura full-stack** (frontend, backend, base de datos, despliegue).
- **Modelado de dominio** psicométrico y de campañas educativas.
- **Implementación de seguridad** (JWT, OAuth2, RBAC, OTP, inactivity timeout).
- **Motor de cálculo** MIDAS/CHASIDE con baremos configurables.
- **Generación de PDFs institucionales** con gráficos SVG embebidos.
- **UX mobile-first** para estudiantes rindiendo el test desde el celular.
- **Contenerización y despliegue** con Docker multi-stage.

---

## Estado

Plataforma **production-ready**: contenerizada, migraciones versionadas, documentación OpenAPI, manejo global de errores, autenticación endurecida y suite completa de reportes para el flujo real de orientación vocacional UCB.
