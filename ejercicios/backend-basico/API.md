# Semana 3 — Documentacion y Pruebas (API REST)

**Base:** Backend basico de Semana 2 (Express + CRUD en memoria)
**Servidor:** `http://localhost:3000`

## Convenciones REST aplicadas
- Rutas con recursos en plural (`/tareas`).
- Verbos HTTP correctos (GET, POST, PUT, DELETE).
- Codigos de estado coherentes (200, 201, 400, 404).
- Respuestas JSON con `success` y `data` o `error`.

## Como probar rapido
1. Levantar el servidor: `npm run dev`
2. Ejecutar requests en Postman usando la coleccion exportada.

## Formato de respuesta
**Exito:**
```json
{ "success": true, "data": { } }
```
**Error:**
```json
{ "success": false, "error": "mensaje" }
```

## Endpoints

### GET /health
**Descripcion:** Verifica que el servidor esta activo.

**Respuesta 200:**
```json
{ "success": true, "data": { "status": "ok" } }
```

---

### GET /tareas
**Descripcion:** Lista todas las tareas en memoria.

**Respuesta 200:**
```json
{ "success": true, "data": [] }
```

---

### POST /tareas
**Descripcion:** Crea una nueva tarea.

**Body:**
```json
{ "titulo": "Comprar pan", "descripcion": "Antes de las 6" }
```

**Respuesta 201:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "titulo": "Comprar pan",
    "descripcion": "Antes de las 6",
    "completada": false,
    "created_at": "2026-03-27T00:00:00.000Z",
    "updated_at": "2026-03-27T00:00:00.000Z"
  }
}
```

**Errores:**
- 400 si `titulo` no existe o no es texto.

---

### GET /tareas/:id
**Descripcion:** Obtiene una tarea por ID.

**Respuesta 200:**
```json
{ "success": true, "data": { "id": 1, "titulo": "Comprar pan", "descripcion": "", "completada": false, "created_at": "...", "updated_at": "..." } }
```

**Errores:**
- 404 si la tarea no existe.

---

### PUT /tareas/:id
**Descripcion:** Actualiza una tarea existente.

**Body (parcial permitido):**
```json
{ "titulo": "Comprar pan y leche", "completada": true }
```

**Respuesta 200:**
```json
{ "success": true, "data": { "id": 1, "titulo": "Comprar pan y leche", "descripcion": "", "completada": true, "created_at": "...", "updated_at": "..." } }
```

**Errores:**
- 400 si `titulo` viene vacio o no es texto.
- 404 si la tarea no existe.

---

### DELETE /tareas/:id
**Descripcion:** Elimina una tarea por ID.

**Respuesta 200:**
```json
{ "success": true, "data": { "id": 1, "titulo": "Comprar pan", "descripcion": "", "completada": false, "created_at": "...", "updated_at": "..." } }
```

**Errores:**
- 404 si la tarea no existe.

## Checklist de pruebas (Postman)
- [ ] `GET /health` retorna 200
- [ ] `GET /tareas` retorna 200
- [ ] `POST /tareas` retorna 201 y crea tarea
- [ ] `POST /tareas` sin `titulo` retorna 400
- [ ] `GET /tareas/:id` existente retorna 200
- [ ] `GET /tareas/:id` inexistente retorna 404
- [ ] `PUT /tareas/:id` actualiza y retorna 200
- [ ] `PUT /tareas/:id` con `titulo` vacio retorna 400
- [ ] `DELETE /tareas/:id` existente retorna 200
- [ ] `DELETE /tareas/:id` inexistente retorna 404

## Evidencia
Guardar la coleccion de Postman en `postman/semana-3.postman_collection.json`.
Capturas incluidas en `postman/`:
- `01-get-health-200.png`
- `02-get-tareas-200-vacio.png`
- `03-post-tareas-201.png`
- `04-get-tareas-200-con-datos.png`
- `05-get-tareas-id-200.png`
- `06-put-tareas-id-200.png`
- `07-put-tareas-id-200-completada.png`
- `08-delete-tareas-id-200.png`
- `09-post-tareas-400.png`
- `10-get-tareas-id-404.png`
- `11-put-tareas-id-404.png`
- `12-delete-tareas-id-404.png`
