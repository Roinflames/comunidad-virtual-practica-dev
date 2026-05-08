# Proyecto 01 — API REST

**Objetivo:** Construir una API REST funcional con autenticacion, CRUD completo y base de datos persistente.

**Nivel:** Basico-Intermedio
**Semana del programa:** 5
**Stack:** Node.js + Express + PostgreSQL

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

## Instalacion y uso

### 1) Variables de entorno
Crear `.env` (o copiar desde `.env.example`) con tus credenciales:
```
PORT=3000
PGUSER=tu_usuario
PGPASSWORD=tu_password
PGDATABASE=practica_backend
PGHOST=localhost
PGPORT=5432
JWT_SECRET=tu_clave_super_secreta
```

### 2) Instalar dependencias
```
npm install
```

### 3) Ejecutar migracion (crear tablas)
```
psql -h <PGHOST> -U <PGUSER> -d <PGDATABASE> -f src/db/schema.sql
```

### 4) Levantar servidor
```
npm run dev
```

### 5) Probar (Postman o curl)

**Registro**
```
POST http://localhost:3000/auth/registro
{
  "nombre": "Wellington",
  "email": "wr@gmail.com",
  "password": "123456"
}
```

**Login**
```
POST http://localhost:3000/auth/login
{
  "email": "wr@gmail.com",
  "password": "123456"
}
```

**Usar token en tareas**
Header:
```
Authorization: Bearer <TOKEN>
```

Ejemplo:
```
POST http://localhost:3000/tareas
{
  "titulo": "Estudiar",
  "descripcion": "JWT y CRUD"
}
```

---

## Criterios de Evaluacion

- [ ] Todos los endpoints funcionan correctamente (probados en Postman)
- [ ] La autenticacion protege las rutas correctamente
- [ ] El codigo sigue la estructura de capas definida en `docs/arquitectura.md`
- [ ] Los commits siguen las convenciones de `docs/reglas-git.md`
- [ ] El README del proyecto explica como instalarlo y probarlo

---

## Evidencias (Postman)

- `evidencias/01-auth-registro-400.png`
- `evidencias/02-auth-registro-201.png`
- `evidencias/04-tareas-get-id-200.png`
- `evidencias/05-auth-login-200.png`
- `evidencias/06-tareas-post-201.png`
- `evidencias/07-tareas-get-200-con-datos.png`
- `evidencias/08-tareas-put-200.png`
- `evidencias/09-tareas-delete-200.png`

---

## Como entregar

1. Crea una rama `feature/tu-nombre/proyecto-01-api`
2. Trabaja dentro de esta carpeta (`proyectos/proyecto-01-api/`)
3. Al terminar, abre un Pull Request con el template correspondiente
