# Programa de Practica — Comunidad Virtual

> Repositorio oficial del programa de practica para estudiantes de desarrollo de software.

---

## Que es Comunidad Virtual

**Comunidad Virtual** es una empresa de desarrollo de software enfocada en soluciones digitales para el mercado latinoamericano. Trabajamos en proyectos de backend, automatizacion, plataformas web y sistemas de gestion.

Este repositorio es el punto de entrada para los estudiantes que se suman a nuestro equipo como practicantes.

---

## Que es el Programa de Practica

El programa esta disenado para que estudiantes de Ingenieria en Informatica o carreras afines adquieran experiencia real en un entorno profesional. No es un curso: es trabajo real con code reviews, pull requests, issues, deploys y retroalimentacion directa del equipo.

**Duracion estimada:** 3 meses
**Modalidad:** Remota / Hibrida
**Nivel:** Basico-Intermedio

---

## Que aprenderan los alumnos

| Area | Tecnologias |
|---|---|
| Control de versiones | Git, GitHub Flow |
| Backend | Node.js (Express/Fastify) o Python (FastAPI) |
| Frontend | React o Ionic |
| APIs | REST, JSON, Postman |
| Base de datos | PostgreSQL, SQLite |
| DevOps basico | Docker, variables de entorno, deploy en Render/Railway |
| Flujo profesional | Issues, Pull Requests, Code Review |

---

## Estructura del repositorio

```
comunidad-virtual-practica-dev/
├── docs/                   → Documentacion del programa
│   ├── plan-practica.md    → Cronograma y objetivos por semana
│   ├── arquitectura.md     → Arquitectura de referencia de los proyectos
│   └── reglas-git.md       → Reglas de Git y flujo de trabajo del equipo
│
├── ejercicios/             → Ejercicios practicos por tema
│   ├── git-basico/         → Commits, branches, merge, conflictos
│   ├── debugging/          → Identificar y corregir errores en codigo real
│   └── refactor/           → Mejorar codigo existente con buenas practicas
│
├── proyectos/              → Proyectos guiados de mayor complejidad
│   ├── proyecto-01-api/        → API REST con autenticacion y base de datos
│   ├── proyecto-02-frontend/   → Interfaz web consumiendo una API
│   └── proyecto-03-automatizacion/ → Script o bot para una tarea repetitiva
│
└── templates/              → Plantillas de Issues y Pull Requests
    ├── issue_template.md
    └── pull_request_template.md
```

---

Nota: la semana 2 se trabaja en `ejercicios/backend-basico`, donde ya se exige aplicar las reglas de `docs/reglas-git.md`.

## Como contribuir

1. Clona este repositorio:
   ```bash
   git clone <url-del-repo>
   cd comunidad-virtual-practica-dev
   ```

2. Crea una rama con tu nombre y la tarea:
   ```bash
   git checkout -b feature/tu-nombre/nombre-tarea
   ```

3. Realiza tus cambios con commits descriptivos:
   ```bash
   git add .
   git commit -m "feat: agregar endpoint de usuarios"
   ```

4. Abre un Pull Request siguiendo la plantilla en `/templates/pull_request_template.md`

5. Espera el code review de un encargado antes de hacer merge

---

## Reglas basicas de Git

- **Nunca trabajes directamente en `main`**
- **Un commit = una idea**: no mezcles cambios de distintas funcionalidades
- **Mensajes de commit en minusculas y en español o ingles, siempre descriptivos**
- **Convenciones de prefijos:**
  - `feat:` nueva funcionalidad
  - `fix:` correccion de bug
  - `docs:` cambios en documentacion
  - `refactor:` mejora de codigo sin cambiar funcionalidad
  - `test:` agregar o modificar tests
- **No subas archivos `.env`, credenciales, ni binarios grandes**
- **Siempre sincroniza tu rama con `main` antes de abrir un PR:**
  ```bash
  git fetch origin
  git rebase origin/main
  ```

Referencia completa: [docs/reglas-git.md](docs/reglas-git.md)

---

## Contacto

**Comunidad Virtual**
Responsable del programa: Rodrigo Reyes
GitHub: [@roinflames](https://github.com/roinflames)
