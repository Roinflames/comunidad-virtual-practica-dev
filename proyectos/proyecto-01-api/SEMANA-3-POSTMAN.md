# Semana 3 - Documentacion y pruebas Postman

## Objetivo

Documentar la API del proyecto 01 y dejar preparada una bateria base de pruebas en Postman.

Esta semana no exige terminar toda la implementacion. El entregable correcto es:

- identificar los endpoints
- definir que recibe cada uno
- definir que devuelve cada uno
- probarlos en Postman cuando la API este disponible

## Base URL sugerida

```text
http://localhost:3000
```

En Postman conviene guardar esta variable:

- `baseUrl`: `http://localhost:3000`
- `token`: vacio al inicio

## Headers importantes

- `Content-Type: application/json`
- `Authorization: Bearer {{token}}`

El header `Authorization` se usa solo en las rutas protegidas de tareas.

## Endpoints a documentar y probar

### 1. Registro

**Endpoint**

```http
POST {{baseUrl}}/auth/registro
```

**Body JSON**

```json
{
  "nombre": "Javier Daza",
  "email": "javier@example.com",
  "password": "12345678"
}
```

**Respuesta esperada**

- `201 Created` si el usuario fue creado
- `400 Bad Request` si faltan campos o el email ya existe

**Que validar**

- crea usuario correctamente
- no acepta campos vacios
- devuelve JSON

### 2. Login

**Endpoint**

```http
POST {{baseUrl}}/auth/login
```

**Body JSON**

```json
{
  "email": "javier@example.com",
  "password": "12345678"
}
```

**Respuesta esperada**

- `200 OK` con token JWT
- `401 Unauthorized` si las credenciales son incorrectas

**Que validar**

- devuelve token al loguear bien
- rechaza password incorrecta
- el token se puede guardar en la variable `token`

### 3. Listar tareas

**Endpoint**

```http
GET {{baseUrl}}/tareas
```

**Header**

```http
Authorization: Bearer {{token}}
```

**Respuesta esperada**

- `200 OK` con arreglo de tareas del usuario
- `401 Unauthorized` si no hay token o es invalido

**Que validar**

- devuelve solo tareas del usuario autenticado
- no responde si falta token

### 4. Crear tarea

**Endpoint**

```http
POST {{baseUrl}}/tareas
```

**Header**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body JSON**

```json
{
  "titulo": "Documentar endpoints",
  "descripcion": "Preparar guia para Postman",
  "completada": false
}
```

**Respuesta esperada**

- `201 Created` con la tarea creada
- `400 Bad Request` si faltan datos
- `401 Unauthorized` si no hay token

**Que validar**

- crea la tarea
- genera identificador
- valida el campo `titulo`

### 5. Obtener tarea por ID

**Endpoint**

```http
GET {{baseUrl}}/tareas/1
```

**Respuesta esperada**

- `200 OK` si existe
- `404 Not Found` si no existe
- `401 Unauthorized` si no hay token

**Que validar**

- devuelve una sola tarea
- responde 404 con ID inexistente

### 6. Actualizar tarea

**Endpoint**

```http
PUT {{baseUrl}}/tareas/1
```

**Body JSON**

```json
{
  "titulo": "Documentar endpoints REST",
  "descripcion": "Actualizar guia y ejemplos",
  "completada": true
}
```

**Respuesta esperada**

- `200 OK` si actualiza
- `400 Bad Request` si el body es invalido
- `404 Not Found` si no existe
- `401 Unauthorized` si no hay token

**Que validar**

- actualiza datos correctamente
- cambia `completada`
- no permite actualizar tareas inexistentes

### 7. Eliminar tarea

**Endpoint**

```http
DELETE {{baseUrl}}/tareas/1
```

**Respuesta esperada**

- `200 OK` o `204 No Content` si elimina
- `404 Not Found` si no existe
- `401 Unauthorized` si no hay token

**Que validar**

- elimina la tarea
- no permite eliminar un ID inexistente

## Estructura sugerida de respuestas JSON

### Exito

```json
{
  "success": true,
  "data": {},
  "message": "Descripcion opcional"
}
```

### Error

```json
{
  "success": false,
  "error": "Descripcion del error",
  "code": 400
}
```

## Orden sugerido de pruebas en Postman

1. Ejecutar `POST /auth/registro`
2. Ejecutar `POST /auth/login`
3. Guardar el token
4. Ejecutar `POST /tareas`
5. Ejecutar `GET /tareas`
6. Ejecutar `GET /tareas/:id`
7. Ejecutar `PUT /tareas/:id`
8. Ejecutar `DELETE /tareas/:id`
9. Repetir algunas requests sin token para validar `401`

## Checklist de entrega de semana 3

- [ ] Documente todos los endpoints del proyecto 01
- [ ] Defini el body esperado de cada endpoint
- [ ] Defini los headers requeridos
- [ ] Defini los codigos HTTP esperados
- [ ] Prepare una coleccion de Postman
- [ ] Probe casos exitosos y casos de error cuando la API este disponible
