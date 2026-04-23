# Solucion Base: Backend Basico

Esta carpeta incluye una implementacion de la API actualizada para la semana 4, con persistencia en SQLite.

Los datos de prueba se cargan una sola vez al inicializar la base por primera vez. Luego puedes volver a sembrarlos manualmente con `npm run db:seed` si lo necesitas.

## Ejecutar

```bash
cd ejercicios/backend-basico
npm install
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

- `src/data`: consultas SQL para tareas
- `src/db`: conexion, migraciones y seed
- `src/services`: validacion y reglas simples
- `src/controllers`: respuestas HTTP en JSON
- `src/app.js`: router basico
- `src/index.js`: arranque del servidor
