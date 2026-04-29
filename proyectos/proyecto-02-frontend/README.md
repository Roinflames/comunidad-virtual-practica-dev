# Proyecto 02 — Frontend

**Objetivo:** Construir una interfaz web que consuma la API del Proyecto 01, con login, listado y gestion de tareas.

**Nivel:** Basico-Intermedio
**Semana del programa:** 7
**Stack sugerido:** React (Vite) o Ionic + React
**Prerrequisito:** tener el Proyecto 01 funcionando localmente

---

## Descripcion

Desarrollaras la capa visual para la API de tareas construida en el proyecto anterior. Los usuarios podran registrarse, iniciar sesion, y gestionar sus tareas desde el navegador.

---

## Pantallas Requeridas

### Pagina de Login / Registro
- Formulario de login (email + password)
- Link o tab para cambiar a registro
- Validacion de campos antes de enviar
- Manejo de errores (credenciales incorrectas, email ya existe)
- Redireccion al Dashboard si el login es exitoso

### Dashboard (requiere sesion iniciada)
- Listado de tareas del usuario autenticado
- Formulario para agregar una nueva tarea (titulo + descripcion)
- Boton para marcar tarea como completada / pendiente
- Boton para eliminar tarea
- Indicador visual de estado de cada tarea (completada / pendiente)
- Boton de cerrar sesion

---

## Requisitos Tecnicos

- [ ] El token JWT se guarda en `localStorage` y se envia en cada request
- [ ] Si el token vence o es invalido, redirigir automaticamente al login
- [ ] Las llamadas a la API estan encapsuladas en `/services/api.js` (no hacer fetch directo desde componentes)
- [ ] Manejo de estados de carga (loading) y error en la UI
- [ ] Variables de entorno para la URL base de la API (`.env.example`)
- [ ] La app no se rompe si la API no esta disponible: mostrar mensaje de error

---

## Diseño

No hay requisitos de diseño especifico, pero se esperan:
- Estructura visual ordenada y limpia
- Diferenciacion visual entre tareas completadas y pendientes
- Formularios con feedback claro (errores, exito)
- Responsive basico (que funcione en pantallas de 768px+)

---

## Criterios de Evaluacion

- [ ] El flujo completo funciona: registro → login → crear tarea → completar → eliminar → logout
- [ ] Los errores de la API se muestran en pantalla (no solo en consola)
- [ ] El codigo de llamadas a la API esta separado de los componentes
- [ ] Los commits siguen las convenciones de `docs/reglas-git.md`

---

## Implementado

- Registro de usuario conectado a la API
- Inicio de sesion con JWT
- Persistencia de sesion con `localStorage`
- Creacion de tareas
- Edicion inline de titulo y descripcion
- Cambio de estado pendiente/completada
- Eliminacion de tareas
- Cierre de sesion
- Dashboard visual con resumen de tareas
- Llamadas HTTP centralizadas en `src/services/api.js`

---

## Configuracion Local

1. Copia `.env.example` a `.env`
2. Verifica que la API del proyecto 01 este corriendo
3. Instala dependencias y levanta el frontend:

```bash
npm install
npm run dev
```

Variable importante:

- `VITE_API_BASE_URL`: URL base de la API del proyecto 01

Ejemplo:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Flujo Probado

Flujo validado manualmente:

- Registro
- Login
- Recarga con sesion persistida
- Crear tarea
- Editar tarea
- Completar tarea
- Volver a pendiente
- Eliminar tarea
- Logout

Evidencia escrita:

- `proyectos/proyecto-02-frontend/evidencias/flujo-manual-semana-7.md`

---

## Como entregar

1. Crea una rama `feature/tu-nombre/proyecto-02-frontend`
2. Trabaja dentro de esta carpeta (`proyectos/proyecto-02-frontend/`)
3. Al terminar, abre un Pull Request con el template correspondiente
