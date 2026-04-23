# Proyecto 01 - API REST

API REST de tareas con usuarios, autenticacion JWT, validacion de entradas y persistencia en SQLite.

## Requisitos cubiertos

- Estructura por capas: `routes -> controllers -> services -> models`
- Registro y login con password hasheado
- JWT firmado con `crypto` nativo
- CRUD de tareas protegido por autenticacion
- Validacion de entradas en todos los endpoints
- Respuestas JSON con formato estandar
- `.env.example`, `.gitignore`, migraciones y seed opcional

## Estructura

```text
proyecto-01-api/
|-- src/
|   |-- config/
|   |-- controllers/
|   |-- db/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   `-- index.js
|-- migrations/
|-- seeds/
|-- db/
|-- .env.example
|-- .gitignore
|-- Dockerfile
`-- package.json
```

## Instalar y ejecutar

```bash
cd proyectos/proyecto-01-api
npm install
npm start
```

Servidor por defecto:

```text
http://localhost:3000
```

## Variables de entorno

1. Copia `.env.example` como `.env`
2. Ajusta los valores si lo necesitas

Variables principales:

```env
PORT=3000
DATABASE_URL=./db/proyecto-01-api.sqlite
JWT_SECRET=cambia-este-secreto
JWT_EXPIRES_IN=3600
```

## Endpoints

### Auth

- `POST /auth/registro`
- `POST /auth/login`

### Tareas

Todas requieren:

```http
Authorization: Bearer <token>
```

- `GET /tareas`
- `POST /tareas`
- `GET /tareas/:id`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

## Ejemplos

Registro:

```bash
curl -X POST http://localhost:3000/auth/registro ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Javier Daza\",\"email\":\"javier@example.com\",\"password\":\"12345678\"}"
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"javier@example.com\",\"password\":\"12345678\"}"
```

Crear tarea:

```bash
curl -X POST http://localhost:3000/tareas ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer TU_TOKEN" ^
  -d "{\"titulo\":\"Documentar endpoints\",\"descripcion\":\"Preparar guia para Postman\",\"completada\":false}"
```

## Scripts

```bash
npm start
npm run db:migrate
npm run db:seed
```

`npm start` ejecuta migraciones antes de levantar el servidor.

## Estado de semana 5

- [x] Desarrollo del `proyecto-01-api`
- [x] Autenticacion basica con JWT
- [x] Validacion de entradas
- [x] README listo para review

Para la parte de code review con encargado, el siguiente paso fuera de este cambio es abrir la rama y el Pull Request siguiendo `docs/reglas-git.md`.
