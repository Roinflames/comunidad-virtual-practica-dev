# Backend Basico - Semana 4

Esta version lleva el CRUD de tareas de la semana 2 a lo que pide la semana 4: persistencia real con `SQLite`, migraciones y datos de prueba.

## Requisitos cubiertos

- CRUD persistente en base de datos
- Operaciones SQL base: `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- Conexion desde Node.js a SQLite
- Migracion inicial en `migrations/`
- Datos de prueba en `seeds/`

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

Base de datos por defecto:

```text
ejercicios/backend-basico/db/tasks.sqlite
```

Puedes cambiar la ruta con la variable `DATABASE_URL`.

## Scripts utiles

```bash
npm run db:migrate
npm run db:seed
```

`npm start` ejecuta migraciones y solo carga seeds automaticamente la primera vez que se crea la base.

## Endpoints

- `GET /health`
- `GET /tareas`
- `GET /tareas/:id`
- `POST /tareas`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

Modelo actual:

```json
{
  "id": 1,
  "titulo": "Preparar entrega",
  "completada": false,
  "created_at": "2026-04-16 04:00:00",
  "updated_at": "2026-04-16 04:00:00"
}
```

## Ejemplos

Crear tarea:

```bash
curl -X POST http://localhost:3000/tareas ^
  -H "Content-Type: application/json" ^
  -d "{\"titulo\":\"Practicar SQL\",\"completada\":false}"
```

Actualizar tarea:

```bash
curl -X PUT http://localhost:3000/tareas/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"titulo\":\"Practicar SQL y migraciones\",\"completada\":true}"
```

## Estructura

- `src/data`: acceso a datos en SQLite
- `src/db`: conexion e inicializacion de base de datos
- `src/services`: validacion y reglas simples
- `src/controllers`: respuestas HTTP en JSON
- `src/scripts`: scripts manuales de migracion y seed
- `migrations/`: esquema SQL versionado
- `seeds/`: datos de prueba

## Entrega

1. Crea una rama `feature/tu-nombre/backend-basico`
2. Desarrolla la solucion en una carpeta propia de trabajo
3. Haz commits pequenos y descriptivos
4. Sincroniza tu rama con `main`
5. Abre un Pull Request

## Checklist del PR

- [ ] El titulo del PR describe el cambio
- [ ] La descripcion explica como ejecutar y probar la API
- [ ] Se incluyen ejemplos de request o respuestas JSON
- [ ] No se suben dependencias pesadas ni archivos generados
- [ ] El historial de commits es entendible

## Soluciones de referencia

- Solucion base (HTTP nativo): `ejercicios/backend-basico/src/*`
- Solucion alternativa (Express, Wellington): `ejercicios/backend-basico/soluciones/wellington/`

## Semana 3 - API REST (Documentacion y Pruebas)

- Ver `API.md` para documentacion de endpoints y checklist
- Exportar coleccion Postman en `postman/semana-3.postman_collection.json`
- Evidencias (capturas) disponibles en `postman/`
