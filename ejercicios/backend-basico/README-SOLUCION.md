# Solucion Base: Backend Basico

Esta carpeta incluye una implementacion minima de la API pedida para la semana 2.

## Ejecutar

```bash
cd ejercicios/backend-basico
npm start
```

Servidor por defecto:

```text
http://localhost:3000
```

## Endpoints

### Health

```bash
curl http://localhost:3000/health
```

### Listar tareas

```bash
curl http://localhost:3000/tareas
```

### Crear tarea

```bash
curl -X POST http://localhost:3000/tareas ^
  -H "Content-Type: application/json" ^
  -d "{\"titulo\":\"Practicar API\",\"completada\":false}"
```

### Actualizar tarea

```bash
curl -X PUT http://localhost:3000/tareas/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"titulo\":\"Practicar API actualizada\",\"completada\":true}"
```

### Eliminar tarea

```bash
curl -X DELETE http://localhost:3000/tareas/1
```

## Estructura

- `src/data`: almacenamiento en memoria
- `src/services`: validacion y reglas simples
- `src/controllers`: respuestas HTTP en JSON
- `src/app.js`: router basico
- `src/index.js`: arranque del servidor
