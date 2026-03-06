# Plan de Practica — Comunidad Virtual

> Cronograma orientativo de 12 semanas. Puede ajustarse segun el ritmo del estudiante y las necesidades del equipo.

---

## Objetivo General

Al finalizar el programa, el estudiante sera capaz de integrarse a un equipo de desarrollo profesional, trabajar con repositorios Git, construir y consumir APIs REST, y desplegar aplicaciones en entornos reales.

---

## Semana a Semana

### Semana 1 — Onboarding y Git
- Configuracion del entorno de desarrollo
- Introduccion a Git: clone, add, commit, push, pull
- Flujo de trabajo: branches, merge, pull requests
- Ejercicio: `ejercicios/git-basico`

### Semana 2 — Backend Basico
- Introduccion a Node.js o Python
- Crear un servidor HTTP simple
- Rutas, middlewares, respuestas JSON
- Ejercicio: crear un CRUD basico en memoria

### Semana 3 — APIs REST
- Que es una API REST y sus convenciones
- Verbos HTTP, codigos de estado, headers
- Postman para probar endpoints
- Ejercicio: documentar y probar la API del proyecto 01

### Semana 4 — Base de Datos
- Introduccion a SQL (SELECT, INSERT, UPDATE, DELETE)
- Conexion desde el backend (SQLite o PostgreSQL)
- Migraciones y datos de prueba
- Ejercicio: integrar persistencia al CRUD de semana 2

### Semana 5 — Proyecto 01: API REST
- Desarrollo guiado del `proyecto-01-api`
- Autenticacion basica (JWT o API Key)
- Validacion de entradas
- Code review con encargado

### Semana 6 — Frontend Basico
- HTML, CSS, JavaScript esencial
- Introduccion a React o Ionic
- Componentes, props, estado
- Ejercicio: crear una pantalla que consuma la API del proyecto 01

### Semana 7 — Proyecto 02: Frontend
- Desarrollo del `proyecto-02-frontend`
- Manejo de errores en UI
- Formularios y validaciones
- Code review con encargado

### Semana 8 — Debugging y Calidad de Codigo
- Leer logs y entender stack traces
- Herramientas de debugging (breakpoints, console, devtools)
- Ejercicio: `ejercicios/debugging`
- Introduccion a linters y formatters

### Semana 9 — Refactoring y Buenas Practicas
- Que es codigo limpio y por que importa
- Naming, funciones pequenas, separacion de responsabilidades
- Ejercicio: `ejercicios/refactor`
- DRY, KISS, YAGNI explicados con ejemplos reales

### Semana 10 — DevOps Basico
- Variables de entorno y archivos `.env`
- Introduccion a Docker: imagen, contenedor, Dockerfile
- Deploy en Render o Railway
- Ejercicio: dockerizar el proyecto 01 y desplegarlo

### Semana 11 — Proyecto 03: Automatizacion
- Desarrollo del `proyecto-03-automatizacion`
- Scripts, tareas programadas o bots simples
- Integracion con APIs externas
- Code review con encargado

### Semana 12 — Cierre y Demo
- Demo final de los 3 proyectos
- Retrospectiva del programa
- Feedback bilateral
- Emision de constancia de practica (si corresponde)

---

## Criterios de Evaluacion

| Criterio | Peso |
|---|---|
| Calidad del codigo (naming, estructura, comentarios) | 25% |
| Uso correcto de Git (branches, commits, PRs) | 20% |
| Funcionalidad de los proyectos entregados | 30% |
| Participacion en code reviews | 15% |
| Cumplimiento de plazos y comunicacion | 10% |

---

## Recursos Recomendados

- [Pro Git Book](https://git-scm.com/book/es/v2) — gratuito, en español
- [Node.js Docs](https://nodejs.org/en/docs/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [Docker Getting Started](https://docs.docker.com/get-started/)
