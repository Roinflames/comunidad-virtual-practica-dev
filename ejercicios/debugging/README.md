# Ejercicio: Debugging

**Objetivo:** Identificar, analizar y corregir errores en codigo real usando herramientas de debugging.

**Nivel:** Basico-Intermedio
**Duracion estimada:** 3-4 horas
**Semana del programa:** 8

---

## Que es debugging

Debugging es el proceso de encontrar y corregir errores (bugs) en el codigo. Un buen desarrollador no solo sabe escribir codigo, sino tambien leer mensajes de error, interpretar stack traces y rastrear el origen del problema.

---

## Herramientas

### Node.js
- `console.log()` / `console.error()` — lo mas basico
- `node --inspect` + Chrome DevTools — breakpoints visuales
- `debugger` — pausa la ejecucion en el codigo

### Python
- `print()` — lo basico
- `pdb` — debugger interactivo de Python (`import pdb; pdb.set_trace()`)
- VS Code debugger — breakpoints graficos

### Navegador
- DevTools → pestaña Console
- DevTools → pestaña Sources (breakpoints en JS del frontend)
- DevTools → pestaña Network (para ver requests/responses)

---

## Como leer un Stack Trace

```
TypeError: Cannot read properties of undefined (reading 'name')
    at getUserName (/app/src/services/user.service.js:14:20)
    at UserController.getProfile (/app/src/controllers/user.controller.js:32:18)
    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
```

**Como leerlo:**
1. Primera linea: tipo de error y mensaje
2. Segunda linea: donde ocurrio (archivo + linea + columna) ← **empieza aqui**
3. Las siguientes son el call stack (quien llamo a quien)

---

## Ejercicio 1 — Encontrar el bug

El siguiente codigo tiene un bug. Identifica que hace mal, por que falla y corrigelo:

```javascript
function calcularPromedio(notas) {
  let suma = 0;
  for (let i = 0; i <= notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
}

console.log(calcularPromedio([7, 8, 6, 9]));
```

**Preguntas a responder en tu PR:**
- Cual es el bug?
- En que linea ocurre?
- Por que genera ese resultado incorrecto?
- Como lo corregiste?

---

## Ejercicio 2 — Errores silenciosos

```javascript
async function obtenerUsuario(id) {
  const response = await fetch(`/api/usuarios/${id}`);
  const data = response.json();  // bug aqui
  return data.nombre;
}
```

Identifica por que este codigo puede fallar de manera no evidente y corrigelo.

---

## Ejercicio 3 — Debugging con logs

Dado un endpoint que a veces devuelve datos incorrectos, agrega logs estrategicos para rastrear el problema:

```javascript
app.get('/productos', async (req, res) => {
  const categoria = req.query.categoria;
  const productos = await db.query('SELECT * FROM productos WHERE categoria = ?', [categoria]);
  const activos = productos.filter(p => p.activo);
  const ordenados = activos.sort((a, b) => a.precio - b.precio);
  res.json(ordenados);
});
```

**Tarea:** agrega `console.log` en los puntos correctos para poder diagnosticar si el problema es en la query, el filtro o el ordenamiento.

---

## Entrega

Crea una rama `fix/tu-nombre/ejercicio-debugging`, sube tus soluciones y abre un PR explicando cada bug encontrado.

---

## Archivos de referencia en este repo

Este repositorio incluye una posible resolucion del ejercicio en:

- `ejercicio-1-promedio.js`
- `ejercicio-2-async.js`
- `ejercicio-3-logs.js`
- `SOLUCIONES.md`
