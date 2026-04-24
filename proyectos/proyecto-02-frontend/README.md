# Proyecto 02 - Frontend

Base de frontend para la semana 6: una interfaz web simple que consume la API del proyecto 01 con login, registro y dashboard de tareas.

## Alcance de semana 6

- Pantalla de login y registro
- Dashboard con listado de tareas
- Crear tarea desde la UI
- Marcar tarea como completada o pendiente
- Eliminar tarea
- Guardar JWT en `localStorage`
- Mostrar estados de carga y error en pantalla

La idea es dejar la base funcional para que en semana 7 se profundice el proyecto de frontend completo.

## Requisitos

- Tener disponible la API del proyecto 01
- Node.js 18+ para levantar este frontend estatico

## Configuracion

1. Copia `.env.example` como `.env`
2. Ajusta `API_BASE_URL` si tu API corre en otra URL

Variables:

```env
PORT=4173
API_BASE_URL=http://localhost:3000
```

## Ejecutar

```bash
cd proyectos/proyecto-02-frontend
npm start
```

Frontend por defecto:

```text
http://localhost:4173
```

## Estructura

```text
proyecto-02-frontend/
|-- src/
|   |-- components/
|   |-- services/
|   |-- utils/
|   |-- main.js
|   `-- styles.css
|-- .env.example
|-- .gitignore
|-- index.html
|-- package.json
|-- server.js
`-- README.md
```

## Flujo cubierto

1. Registro de usuario
2. Login
3. Guardado del token en `localStorage`
4. Listado de tareas del usuario autenticado
5. Crear tarea
6. Actualizar estado de tarea
7. Eliminar tarea
8. Cerrar sesion

## Notas

- Las llamadas HTTP estan encapsuladas en `src/services/api.js`
- Si el token es invalido o expira, la UI vuelve al login
- Si la API no esta disponible, se muestra el error en pantalla
- Esta entrega usa HTML, CSS y JavaScript vanilla para cumplir el foco de semana 6
