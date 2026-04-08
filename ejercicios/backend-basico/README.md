# Ejercicio: Backend Basico

**Objetivo:** Construir una API CRUD en memoria aplicando desde el inicio las reglas de ramas, commits y Pull Requests del programa.

**Nivel:** Principiante - Basico
**Duracion estimada:** 4-6 horas
**Semana del programa:** 2
**Stack sugerido:** Node.js + Express o Python + FastAPI

---

## Descripcion

En esta semana el estudiante debe levantar un servidor HTTP simple y exponer un CRUD de tareas en memoria. No se usa base de datos todavia: el foco esta en entender rutas, estructura minima del backend y disciplina de trabajo con Git.

---

## Reglas aplicadas desde esta semana

Todo el trabajo de esta entrega debe seguir `docs/reglas-git.md`.

- La rama debe llamarse `feature/tu-nombre/backend-basico`
- No se trabaja directamente en `main`
- Cada commit debe usar prefijos validos (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- El PR debe abrirse usando `templates/pull_request_template.md`
- Antes de pedir revision, la rama debe sincronizarse con `main`

---

## Requisitos funcionales

Implementa una API con estos endpoints:

- `GET /health` devuelve un estado simple del servidor
- `GET /tareas` lista todas las tareas en memoria
- `GET /tareas/:id` obtiene una tarea por id
- `POST /tareas` crea una tarea
- `PUT /tareas/:id` actualiza una tarea existente
- `DELETE /tareas/:id` elimina una tarea

Modelo sugerido:

```json
{
  "id": 1,
  "titulo": "Preparar entrega",
  "completada": false
}
```

---

## Requisitos tecnicos

- [ ] El proyecto corre localmente con un comando claro (`npm run dev`, `npm start`, `uvicorn`, etc.)
- [ ] La API responde en JSON
- [ ] Se usan codigos HTTP correctos (`200`, `201`, `400`, `404`)
- [ ] Hay validacion minima en `POST` y `PUT`
- [ ] Los datos se mantienen en memoria durante la ejecucion
- [ ] Existe un `README.md` dentro del proyecto o carpeta de solucion con pasos de ejecucion

---

## Estructura minima sugerida

```text
backend-basico/
├── src/
│   ├── app.(js|py)
│   ├── routes/
│   └── data/
├── README.md
└── .gitignore
```

No es obligatorio copiar esta estructura exacta, pero la solucion debe ser ordenada y facil de revisar.

---

## Entrega

1. Crea una rama `feature/tu-nombre/backend-basico`
2. Desarrolla la solucion en una carpeta propia de trabajo
3. Haz commits pequenos y descriptivos
4. Sincroniza tu rama con `main`
5. Abre un Pull Request

---

## Checklist del PR

- [ ] El titulo del PR describe el cambio
- [ ] La descripcion explica como ejecutar y probar la API
- [ ] Se incluyen ejemplos de request o respuestas JSON
- [ ] No se suben dependencias pesadas ni archivos generados
- [ ] El historial de commits es entendible

---

## Soluciones de referencia

- Solucion base (HTTP nativo): `ejercicios/backend-basico/src/*`
- Solucion alternativa (Express, Wellington): `ejercicios/backend-basico/soluciones/wellington-semana-4/`

---
## Semana 3 — API REST (Documentacion y Pruebas)
- Ver `API.md` para documentacion de endpoints y checklist
- Exportar coleccion Postman en `postman/semana-3.postman_collection.json`
- Evidencias (capturas) disponibles en `postman/`
