# Proyecto 01 — API REST

**Objetivo:** Construir una API REST funcional con autenticacion, CRUD completo y base de datos persistente.

**Nivel:** Basico-Intermedio
**Semana del programa:** 5
**Stack sugerido:** Node.js + Express + SQLite (o Python + FastAPI + SQLite)

---

## Descripcion

Desarrollaras una API para gestionar una lista de tareas (TODO list) con usuarios. Cada usuario puede crear, leer, actualizar y eliminar sus propias tareas.

---

## Requisitos Funcionales

### Autenticacion
- `POST /auth/registro` — crear cuenta con nombre, email y password
- `POST /auth/login` — autenticarse y recibir un token JWT
- Las rutas de tareas requieren token valido en el header `Authorization: Bearer <token>`

### Tareas (requieren autenticacion)
- `GET /tareas` — listar todas las tareas del usuario autenticado
- `POST /tareas` — crear una tarea nueva
- `GET /tareas/:id` — obtener una tarea por ID
- `PUT /tareas/:id` — actualizar una tarea
- `DELETE /tareas/:id` — eliminar una tarea

### Modelo de datos

**Usuario:**
```
id, nombre, email, password (hash), created_at
```

**Tarea:**
```
id, titulo, descripcion, completada (bool), usuario_id, created_at, updated_at
```

---

## Requisitos Tecnicos

- [ ] Estructura por capas: routes → controllers → services → models
- [ ] Passwords hasheados (nunca en texto plano)
- [ ] Validacion de entradas en todos los endpoints
- [ ] Respuestas JSON con formato estandar (`success`, `data`, `error`)
- [ ] Codigos HTTP correctos (200, 201, 400, 401, 404, 500)
- [ ] Archivo `.env.example` con todas las variables necesarias
- [ ] `.gitignore` que excluya `.env`, `node_modules`, archivos de BD

---

## Criterios de Evaluacion

- [ ] Todos los endpoints funcionan correctamente (probados en Postman)
- [ ] La autenticacion protege las rutas correctamente
- [ ] El codigo sigue la estructura de capas definida en `docs/arquitectura.md`
- [ ] Los commits siguen las convenciones de `docs/reglas-git.md`
- [ ] El README del proyecto explica como instalarlo y probarlo

---

## Material de Semana 3

Para la semana 3 se debe documentar y probar esta API antes de implementarla completa.

- Guia de endpoints y pruebas: `SEMANA-3-POSTMAN.md`
- Coleccion base de Postman: `postman/proyecto-01-api.postman_collection.json`

---

## Como entregar

1. Crea una rama `feature/tu-nombre/proyecto-01-api`
2. Trabaja dentro de esta carpeta (`proyectos/proyecto-01-api/`)
3. Al terminar, abre un Pull Request con el template correspondiente
