# Ejercicio: Backend Basico (Node)

**Objetivo:** Crear un servidor HTTP simple con rutas, middlewares y respuestas JSON.
**Semana del programa:** 2
**Stack:** Node.js + Express

---

## Requisitos

- Servidor Express escuchando en `http://localhost:3000`
- Middleware de JSON activo
- CRUD en memoria de tareas (`tareas`)
- Respuestas JSON con formato:
  - `success: true | false`
  - `data` o `error`

---

## Endpoints requeridos

- `GET /health` -> `{ success: true, data: { status: "ok" } }`
- `GET /tareas` -> lista de tareas
- `POST /tareas` -> crea tarea
- `GET /tareas/:id` -> obtiene una tarea
- `PUT /tareas/:id` -> actualiza tarea
- `DELETE /tareas/:id` -> elimina tarea

---

## Como ejecutar

```bash
cd ejercicios/backend-basico
npm install
npm run dev
```

---

## Criterios de evaluacion

- [ ] El servidor responde en `/health`
- [ ] CRUD completo funciona con datos en memoria
- [ ] Respuestas JSON consistentes y codigos HTTP correctos
- [ ] Se uso middleware y rutas separadas (minimo en el mismo archivo)
