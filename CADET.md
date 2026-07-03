# CADET — Sistema de Gestión Integral del Colegio de Psicólogos

## Descripción general

**CADET** es una plataforma web integral diseñada para digitalizar y centralizar la operación completa del Colegio de Administradores de Empresas de Tarija: gestión de socios, afiliación digital, cobros y finanzas, agenda, contenido institucional (CMS público), una oficina virtual para cada colegiado y una oficina panel de administración.

El sistema reemplaza procesos manuales (planillas, formularios en papel, cobros presenciales, agendamiento telefónico) por flujos automatizados accesibles desde cualquier dispositivo, con roles diferenciados para **administración**, **socios colegiados** y **público general**.

---

## Áreas funcionales principales

### 1. Sitio público institucional (Landing + CMS)
Portal público con landing informativa, directorio de psicólogos colegiados, catálogo de beneficios, sección de noticias/blog gestionada desde un CMS interno, páginas legales, formulario de contacto y sección "Nosotros".

### 2. Módulo financiero
- **Estado de cuenta** por socio con generación automática y programada de cargos.
- **Transacciones de pago** con lógica de cobro **FIFO** sobre deudas pendientes.
- **Scheduler** para generación automática de cargos periódicos.

### 3. Oficina virtual del colegiado
Cada socio dispone de:
- **Perfil público** editable (bio, especialidades, contacto profesional).
- **Perfil institucional** separado del perfil público.
- **Documentos** (subida, listado, actualización, borrado).
- **Consultorio virtual** con acceso a agenda clínica y pacientes.
- Dashboard personal.

### 4. Panel administrativo
Dashboard central con módulos de **socios**, **finanzas**, **posts**, **documentos**, **buzon**,**CMS** y métricas operativas.

### 5. Autenticación y seguridad
- Login por credenciales con JWT (email separado del login).
- Recuperación de contraseña por correo.
- Roles diferenciados (admin, socio, público).

---

## Arquitectura

### Alto nivel
```
┌─────────────────┐       ┌────────────────────┐       ┌──────────────┐
│  React SPA      │──────▶│  Spring Boot API   │──────▶│  PostgreSQL  │
│  (Nginx)        │  JWT  │  (REST + JPA)      │       │  (Flyway)    │
└─────────────────┘       └────────┬───────────┘       └──────────────┘
                                   │
                          ┌────────┼────────┐
                          ▼        ▼        ▼
                       ┌──────┐ ┌──────┐ ┌────────┐
                       │MinIO │ │SMTP  │ │imgproxy│
                       │(S3)  │ │Mail  │ │        │
                       └──────┘ └──────┘ └────────┘
```

### Backend — organización modular por dominio
Estructura de paquetes en `app.*` — cada módulo con su propia jerarquía `controller / dto / entity / repository / service`:

| Módulo | Responsabilidad |
|---|---|
| `auth` | JWT, OAuth2 Google, security filters, recuperación de contraseña |
| `socio` | Gestión de colegiados, afiliaciones aprobadas |
| `afiliacion` | Solicitudes de nuevos afiliados (leads + completas) |
| `finanza` | Cuotas, estados de cuenta, transacciones, scheduler de cobros |
| `perfil` | Perfiles públicos/institucionales, documentos |
| `cms` | Páginas gestionadas y contenido dinámico |
| `posts` | Noticias/blog |
| `contacto` | Formulario público de contacto |
| `catalogo` | Catálogos maestros (especialidades, etc.) |
| `core` | Entidades transversales |
| `common` | Excepciones globales, filtros, utilidades compartidas |
| `solicitudemail` | Notificaciones por correo (solicitudes) |
| `config` | Configuración Spring (CORS, security, MinIO, mail) |

### Frontend — feature-based con capa compartida
```
src/
├── features/
│   ├── public/          → landing, directorio, noticias, afiliación, contacto…
│   ├── admin/           → dashboard, socios, finanzas, reservas, CMS
│   ├── virtual-office/  → perfil, consultorio, dashboard del socio
│   └── auth/            → login, registro, recuperación
├── shared/
│   ├── api/             → axios client + un service por módulo (barrel export)
│   ├── types/           → DTOs compartidos (api.types.ts)
│   ├── constants/       → routes.ts (front), api-routes.ts (endpoints)
│   └── ...
├── router/              → React Router v7
├── components/          → UI base (shadcn/ui sobre Radix)
├── hooks/, lib/, config/, styles/
```

Alias `@/` → `src/`. Servicios importan un **apiClient Axios** único con interceptores JWT.

---

## Stack tecnológico

### Backend
- **Java 21** + **Spring Boot 3.5**
- **Spring Web** (REST), **Spring Data JPA**, **Spring Security**
- **PostgreSQL** + **Flyway** (migraciones versionadas)
- **JWT (jjwt 0.12)** para auth stateless
- **OAuth2 Client** (Google)
- **MinIO SDK 8.5** (almacenamiento S3-compatible de archivos y documentos)
- **imgproxy** para procesamiento/optimización de imágenes bajo demanda
- **Spring Mail** para notificaciones
- **ZXing** (generación de QR)
- **JAI ImageIO** (procesamiento de imágenes)
- **springdoc-openapi** (documentación Swagger)
- **Sentry** (error tracking)
- **Spring Actuator** (health checks)
- **spring-dotenv** (carga de `.env`)

### Frontend
- **React 19** + **TypeScript 5.9**
- **Vite (rolldown-vite)** como bundler
- **React Router v7**
- **Tailwind CSS 4** + **shadcn/ui** sobre **Radix UI** primitives
- **React Hook Form** + **Zod** (formularios tipados y validados)
- **Axios** (cliente HTTP con interceptores)
- **TipTap 3** (editor rich-text para CMS)
- **React Leaflet** (mapas del directorio)
- **PDF.js / react-pdf-viewer** (visor de documentos)
- **date-fns**, **Embla Carousel**, **Motion**, **Lucide Icons**
- **Sentry React** (monitoreo)

### Infraestructura
- **Docker Compose** para orquestación (backend, frontend con Nginx, MinIO)
- **Dokploy** como PaaS de despliegue (red externa `dokploy-network`)
- **Nginx** sirviendo el build estático del frontend
- **PostgreSQL** gestionado como servicio de Dokploy
- Storage separado (`docker-compose.storage.yml`) para MinIO + imgproxy

---

## Patrones y decisiones destacadas

- **Separación por dominio (DDD-lite):** cada módulo backend es un slice vertical independiente con sus propios controllers/DTOs/entidades/repos/servicios.
- **DTOs explícitos** en todas las fronteras HTTP (nunca se exponen entidades JPA).
- **Migraciones controladas** con Flyway — sin `ddl-auto` en producción.
- **Uploads multipart** estandarizados (`Content-Type: multipart/form-data`) para afiliaciones y documentos, con MinIO como store.
- **Cobro FIFO** en transacciones financieras: los pagos se aplican en orden a las deudas más antiguas.
- **Scheduler** para generación automática de cargos mensuales.
- **Feature-based frontend** con barrel exports por servicio y tipado end-to-end (DTOs compartidos entre back y front).
- **JWT en interceptor Axios único** — desacopla auth de cada llamada.
- **imgproxy firmado** para servir avatares y documentos optimizados sin exponer el bucket directamente.

---

## Métricas del proyecto

- **~15 módulos de dominio** en el backend, cada uno con controller + service + repository + DTOs.
- **~20 features** en el frontend distribuidas en público / admin / oficina virtual / auth.
- **3 roles principales** con vistas y permisos diferenciados.
- **Multi-tenant funcional** (público general, socios, administración) en una sola aplicación.

---

## Mi rol

Diseño e implementación **full-stack** end-to-end: modelado de dominio, esquema PostgreSQL con migraciones Flyway, APIs REST con Spring Boot, integración con MinIO/imgproxy/SMTP, autenticación JWT + OAuth2, SPA en React 19 + TypeScript, sistema de diseño con Tailwind + shadcn/ui, y despliegue en Docker/Dokploy.
