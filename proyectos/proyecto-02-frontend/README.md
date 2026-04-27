# Proyecto 02 - Frontend

Frontend completo del proyecto 02 para la semana 7. Esta version usa React + Vite y consume la API del proyecto 01 con autenticacion JWT y gestion de tareas por usuario.

## Objetivo

Construir la interfaz web del sistema de tareas para que un usuario pueda:

- registrarse
- iniciar sesion
- ver sus tareas
- crear nuevas tareas
- marcar tareas como completadas o pendientes
- eliminar tareas
- cerrar sesion

## Stack

- React
- Vite
- CSS vanilla

## Requisitos

- Node.js 18+
- API `proyecto-01-api` corriendo localmente

## Configuracion

1. Copia `.env.example` como `.env`
2. Ajusta la URL base de la API si hace falta

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Ejecutar

```bash
cd proyectos/proyecto-02-frontend
npm install
npm run dev
```

App por defecto:

```text
http://localhost:4173
```

## Estructura

```text
proyecto-02-frontend/
|-- public/
|-- src/
|   |-- components/
|   |   |-- FeedbackBanner.jsx
|   |   |-- TaskComposer.jsx
|   |   `-- TaskItem.jsx
|   |-- hooks/
|   |   |-- useAuth.js
|   |   `-- useTasks.js
|   |-- pages/
|   |   |-- AuthPage.jsx
|   |   `-- DashboardPage.jsx
|   |-- services/
|   |   `-- api.js
|   |-- utils/
|   |   `-- storage.js
|   |-- App.jsx
|   |-- main.jsx
|   `-- styles.css
|-- .env.example
|-- .gitignore
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

## Requisitos tecnicos cubiertos

- Token JWT guardado en `localStorage`
- Redireccion al login cuando la API responde `401`
- Llamadas HTTP separadas en `src/services/api.js`
- Manejo de estados de carga y error en la UI
- Variables de entorno para la URL base de la API
- Mensaje de error claro si la API no esta disponible

## Flujo esperado para review

1. Registro
2. Login
3. Crear tarea
4. Marcar tarea como completada
5. Eliminar tarea
6. Logout

## Notas

- Esta entrega reemplaza la base de semana 6 por una estructura alineada a la arquitectura pedida para semana 7.
- El siguiente paso fuera de este cambio es abrir el Pull Request con capturas de la UI y review del encargado.
