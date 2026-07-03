# Gabinete Psicologico - Sistema de Gestion Clinica Universitaria

## Descripcion General

Sistema integral de gestion clinica desarrollado para el Gabinete Psicologico de la Universidad Catolica Boliviana (UCB). La plataforma digitaliza y optimiza todos los procesos del departamento de atencion psicologica universitaria: desde el registro de pacientes y la gestion de sesiones terapeuticas, hasta la generacion automatizada de informes clinicos con inteligencia artificial y la visualizacion analitica mediante dashboards interactivos.

El sistema atiende dos poblaciones diferenciadas: **estudiantes universitarios** (atencion psicologica continua con sesiones, entrevistas clinicas y seguimiento de gravedad) y **pacientes externos** (estudiantes de secundaria que reciben orientacion vocacional). Cada flujo tiene sus propios formularios, reportes y logica de negocio especializada.

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│          React 19 + TypeScript + Vite + Tailwind        │
│              shadcn/ui + Recharts + Axios               │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API (JWT Auth)
┌──────────────────────▼──────────────────────────────────┐
│                      BACKEND                            │
│       Spring Boot 4 + Java 17 + Spring Security         │
│          Spring Data JPA + Flyway Migrations            │
├─────────────────┬───────────────────────────────────────┤
│   PostgreSQL    │          Google Gemini AI              │
│   (Database)    │     (Spring AI - gemini-2.5-flash)     │
└─────────────────┴───────────────────────────────────────┘
```

**Tipo de arquitectura:** Monolito modular (backend) + SPA (frontend), comunicados via REST API con autenticacion JWT stateless.

---

## Stack Tecnologico

### Backend
| Tecnologia | Version | Proposito |
|---|---|---|
| Java | 17 | Lenguaje principal |
| Spring Boot | 4.0.2 | Framework web |
| Spring Security | - | Autenticacion y autorizacion JWT |
| Spring Data JPA | - | ORM y acceso a datos |
| Spring AI | 2.0.0-M2 | Integracion con IA generativa |
| PostgreSQL | - | Base de datos relacional |
| Flyway | - | Migraciones de base de datos (16 versiones) |
| JJWT | 0.12.6 | Generacion y validacion de tokens JWT |
| Lombok | - | Reduccion de boilerplate |
| Sentry | 8.43.1 | Monitoreo de errores en produccion |

### Frontend
| Tecnologia | Version | Proposito |
|---|---|---|
| React | 19.2.0 | Biblioteca UI |
| TypeScript | 5.9.3 | Tipado estatico |
| Vite | 8.0.0-beta.13 | Build tool con HMR |
| Tailwind CSS | 4.2.1 | Estilos utilitarios |
| shadcn/ui + Radix UI | - | Componentes accesibles |
| Recharts | 3.8.0 | Graficas y visualizaciones |
| React Router | 7.6.0 | Enrutamiento SPA |
| Axios | 1.9.0 | Cliente HTTP |
| docxtemplater | 3.68.3 | Generacion de documentos Word |
| ExcelJS | 4.4.0 | Generacion de hojas de calculo |
| jsPDF + html2canvas | - | Exportacion de graficas a PDF |
| Sentry React | 10.59.0 | Monitoreo de errores frontend |

---

## Principales Features

### 1. Gestion de Pacientes Universitarios
- Registro completo con formulario de **8 pasos**: datos personales, antecedentes clinicos, historia familiar, sintomatologia, vida universitaria, habitos, historia clinica narrativa, acuerdos y evaluacion de gravedad/tipologia.
- Busqueda unificada por nombre, celular o fecha.
- Asignacion y transferencia de pacientes entre psicologos.
- Soft-delete para mantener integridad de datos historicos.
- Vinculacion con carreras universitarias.

### 2. Gestion de Pacientes Externos (Orientacion Vocacional)
- Registro de estudiantes de secundaria con datos escolares.
- Entrevista de orientacion vocacional en multiples pasos: motivacion personal, trayectoria educativa y objetivos profesionales.
- Cuestionario estructurado con respuestas almacenadas en formato JSON.
- CRUD completo con edicion y seguimiento de orientaciones.

### 3. Sesiones Terapeuticas y Seguimiento Clinico
- Registro de sesiones con hora de inicio, fin y duracion automatica.
- Historial clinico por sesion con numero de sesion, narrativa clinica, gravedad y tipologia.
- Entrevista psicologica inicial vinculada a la primera sesion: antecedentes, historia familiar, relato universitario, habitos y sintomas.
- Escalas de evaluacion: estres, ansiedad y depresion (escala 12-48 por dimension).
- Continuacion de sesiones con vista de historial completo del paciente.

### 4. Inteligencia Artificial Integrada
- **Resumenes clinicos automaticos**: analiza entrevistas e historiales clinicos para generar descripcion del paciente y problematica principal (maximo 2 oraciones).
- **Informes de orientacion vocacional**: genera conclusiones sobre el perfil vocacional y recomendaciones personalizadas en lenguaje psicologico profesional.
- **Extraccion de problematicas frecuentes**: analiza multiples pacientes para identificar y rankear las problematicas mas comunes.
- Proveedor: Google Gemini (gemini-2.5-flash) via Spring AI.
- Respuestas estructuradas en JSON con fallback de extraccion por regex.

### 5. Dashboard Analitico con 28+ Graficas
- **Sesiones por mes** y por psicologo (area/barra).
- **Nuevos vs reingresos** de pacientes.
- **Distribucion de gravedad** de casos.
- **Tipologias por genero** (radar/barra).
- **Pacientes por carrera**, semestre, departamento.
- **Distribucion por genero y edad**.
- **Scores promedio** de estres, ansiedad y depresion.
- **Horas designadas** por turno y psicologo.
- **Casos por situacion** (activo, dado de alta, derivado, etc.).
- Filtrado por rango de fechas personalizable.
- Selector de periodo: semanal, mensual, semestral, anual o personalizado.

### 6. Generacion de Reportes y Exportacion
- **Reporte Word**: documento profesional generado con `docxtemplater`, incluye resumen de actividades del psicologo, entrevistas y orientaciones por rango de fechas. Soporte para imagenes embebidas.
- **Reporte Excel individual**: exportacion de datos completos del paciente (datos personales, sesiones, metricas) con `ExcelJS`. Filtrado por rango de fechas.
- **Reporte de Orientacion Vocacional Word**: informe individual del paciente externo con resultados, conclusiones y recomendaciones generadas por IA.
- **Exportacion de graficas a PDF**: captura todas las graficas del dashboard en formato PDF landscape a 2 columnas usando `html2canvas` + `jsPDF`.

### 7. Gestion de Actividades Psicologicas
- Registro de talleres, charlas y actividades realizadas por los psicologos.
- Campos: titulo, objetivo, poblacion objetivo, numero de asistentes, resumen y resultados.
- Subida de archivos de evidencia (fotos, documentos) con soporte multipart.
- Listado paginado con 30 items por pagina.
- CRUD completo con confirmacion de eliminacion.

### 8. Panel de Administracion
- **Gestion de psicologos**: alta, baja (soft-delete), edicion, toggle de cuenta de usuario.
- **Gestion de usuarios**: creacion de cuentas admin, edicion y eliminacion.
- **Gestion de carreras**: CRUD de programas academicos vinculados a departamentos.
- **Horas designadas**: configuracion de horas de trabajo por psicologo, anio, mes y turno.
- Acceso restringido exclusivamente al rol ADMIN.

### 9. Autenticacion y Seguridad
- Autenticacion basada en JWT con tokens stateless.
- Hashing de contrasenas con BCrypt.
- Control de acceso basado en roles: **ADMIN** y **PSICOLOGO**.
- Filtro de autenticacion JWT en cada request.
- Interceptores Axios: inyeccion automatica de token, validacion de expiracion, redireccion a login en 401.
- Seeder automatico de cuenta admin al iniciar la aplicacion.
- CORS configurado para origenes especificos (desarrollo y produccion).

### 10. Busqueda Unificada
- Busqueda cross-type que consulta simultaneamente pacientes universitarios y externos.
- Filtros por nombre, celular y fecha.
- Resultados mixtos con indicador de tipo de paciente.
- Navegacion directa al historial o detalle desde los resultados.

---

## Modelo de Datos (15 entidades)

```
Person ──► Psicologo ──► Usuario
  │
  └──► Paciente
         ├──► PacienteUniversitario ──► SesionPaciente ──► EntrevistaPsicologica
         │         │                         └──► HistorialClinico
         │         └──► EstudianteCarrera ──► Carrera
         │
         └──► PacienteExterno ──► OrientacionVocacional

Psicologo ──► ActividadPsicologo ──► ActividadEvidencia
Psicologo ──► HorasDesignadasAp
```

- Herencia polimorfca de pacientes (universitario/externo) desde entidad base.
- Operaciones en cascada: eliminar paciente elimina sesiones, entrevistas e historiales.
- Campos JSONB en PostgreSQL para datos flexibles (acuerdos, tipologias, respuestas de orientacion).
- 16 migraciones Flyway con seeding de carreras UCB pre-cargadas.

---

## Flujos Principales

### Flujo de Atencion Universitaria
1. Psicologo registra paciente con entrevista completa (8 pasos) en una sola transaccion.
2. Se crean automaticamente: paciente, sesion inicial, entrevista psicologica e historial clinico.
3. En sesiones posteriores, se registra historial clinico con gravedad y tipologia.
4. La IA genera resumenes clinicos automaticos bajo demanda.
5. Se exportan reportes individuales (Excel) o consolidados (Word).

### Flujo de Orientacion Vocacional
1. Psicologo registra paciente externo con datos escolares.
2. Se completa entrevista de orientacion vocacional (motivacion, estudios, objetivos).
3. La IA genera informe con conclusiones y recomendaciones.
4. Se genera reporte Word con fecha legal dinamica.

---

## Metricas del Proyecto

- **~40+ endpoints REST** en el backend.
- **28+ componentes de graficas** personalizadas.
- **40+ componentes UI** de shadcn/ui.
- **15+ formularios** con validacion y flujos multi-paso.
- **16 migraciones** de base de datos.
- **4 formatos de exportacion**: Word, Excel, PDF de graficas, informes IA.
- **2 servicios de IA** para generacion automatizada de contenido clinico.

---

## Despliegue

- **Frontend**: Desplegado en servidor UCB (`gabinete-psi-f.alexa.tja.ucb.edu.bo`).
- **Backend**: API REST en puerto 8081.
- **Base de datos**: PostgreSQL con migraciones automaticas via Flyway.
- **Monitoreo**: Sentry integrado en frontend y backend para tracking de errores en produccion.
- **Variables de entorno**: configuracion externalizada para credenciales, claves JWT, API keys de IA y DSN de Sentry.
