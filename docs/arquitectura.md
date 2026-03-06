# Arquitectura de Referencia — Proyectos de Practica

> Este documento describe la arquitectura estandar que seguiran los proyectos del programa. Los practicantes deben leerlo antes de comenzar cualquier proyecto.

---

## Principios Generales

- **Separacion de responsabilidades**: cada capa tiene una funcion especifica y no conoce los detalles de las otras.
- **Variables de entorno**: ningun valor sensible (passwords, tokens, URLs de BD) va en el codigo. Todo en `.env`.
- **Codigo legible**: preferir claridad sobre brevedad. Un nombre de variable descriptivo vale mas que un comentario.
- **Un endpoint = una responsabilidad**: las rutas no contienen logica de negocio; eso va en servicios.

---

## Arquitectura Backend (API REST)

```
proyecto-01-api/
├── src/
│   ├── routes/         → Definicion de rutas HTTP (GET, POST, PUT, DELETE)
│   ├── controllers/    → Reciben el request, llaman al servicio, devuelven response
│   ├── services/       → Logica de negocio (validaciones, calculos, reglas)
│   ├── models/         → Definicion de entidades y acceso a base de datos
│   ├── middlewares/    → Autenticacion, logging, manejo de errores
│   └── index.js        → Punto de entrada del servidor
├── .env.example        → Variables de entorno requeridas (sin valores reales)
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

### Flujo de un Request

```
Cliente → Ruta → Middleware → Controller → Service → Model → BD
                                                  ↑
                                         (respuesta sube
                                          por la misma cadena)
```

---

## Arquitectura Frontend

```
proyecto-02-frontend/
├── src/
│   ├── components/     → Componentes reutilizables (botones, cards, inputs)
│   ├── pages/          → Vistas completas (Home, Login, Dashboard)
│   ├── services/       → Llamadas a la API (fetch/axios encapsulado)
│   ├── hooks/          → Logica de estado y efectos reutilizables (React)
│   ├── utils/          → Funciones auxiliares puras
│   └── App.jsx         → Componente raiz y definicion de rutas
├── public/
├── .env.example
├── .gitignore
└── README.md
```

---

## Base de Datos

Para los proyectos del programa se usara **SQLite** (sin servidor, archivo local) o **PostgreSQL** (para proyectos mas avanzados).

### Reglas:
- Toda tabla debe tener un campo `id` (autoincremental o UUID), `created_at` y `updated_at`.
- Las migraciones van en un archivo dedicado (`migrations/`), nunca ejecutadas manualmente en produccion.
- Los datos de prueba van en un archivo `seed.js` o `seed.sql` separado del esquema.

---

## Variables de Entorno

Cada proyecto debe tener un archivo `.env.example` commiteado con todas las variables necesarias (sin valores reales):

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DATABASE_URL=./db.sqlite

# Autenticacion
JWT_SECRET=tu_secreto_aqui
API_KEY=tu_api_key_aqui
```

El archivo `.env` real **nunca se commitea** (esta en `.gitignore`).

---

## Convenciones de Codigo

### Nombrado
- Variables y funciones: `camelCase`
- Clases y componentes: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case.js`

### Estructura de respuesta API
```json
{
  "success": true,
  "data": { ... },
  "message": "Descripcion opcional"
}
```

En caso de error:
```json
{
  "success": false,
  "error": "Descripcion del error",
  "code": 400
}
```

---

## Docker (Basico)

Cada proyecto debe poder correr con Docker para garantizar paridad entre entornos:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

Para levantar:
```bash
docker build -t nombre-proyecto .
docker run -p 3000:3000 --env-file .env nombre-proyecto
```
