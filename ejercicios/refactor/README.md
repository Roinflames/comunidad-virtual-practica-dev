# Ejercicio: Refactoring

**Objetivo:** Mejorar codigo existente sin cambiar su funcionalidad, aplicando principios de codigo limpio.

**Nivel:** Intermedio
**Duracion estimada:** 3-4 horas
**Semana del programa:** 9

---

## Que es refactoring

Refactoring es el proceso de reestructurar codigo existente sin cambiar su comportamiento externo. El objetivo es hacerlo mas legible, mantenible y eficiente.

**Regla de oro:** antes de refactorizar, asegurate de que hay tests que verifiquen el comportamiento actual.

---

## Principios a aplicar

### DRY — Don't Repeat Yourself
Si copias y pegas codigo, algo esta mal. Extrae la logica repetida a una funcion.

### KISS — Keep It Simple, Stupid
La solucion mas simple que funcione es la correcta. No sobre-ingenierices.

### YAGNI — You Aren't Gonna Need It
No agregues codigo para funcionalidades que "podrian necesitarse en el futuro". Implementa lo que se necesita hoy.

### Single Responsibility
Cada funcion debe hacer una sola cosa y hacerla bien.

---

## Ejercicio 1 — Naming y legibilidad

Refactoriza este codigo mejorando nombres de variables y funciones:

```javascript
function proc(u, l) {
  let r = [];
  for (let i = 0; i < u.length; i++) {
    if (u[i].a === true && u[i].t === l) {
      r.push({ n: u[i].nm, e: u[i].em });
    }
  }
  return r;
}
```

**Criterios:**
- Nombres descriptivos en variables, parametros y funcion
- Misma logica, diferente legibilidad
- Agrega un comentario SOLO si la logica no es autoevidente tras el renaming

---

## Ejercicio 2 — Eliminar duplicacion

```javascript
function validarEmail(email) {
  if (email === null || email === undefined || email === '') {
    return false;
  }
  if (email.length < 5) {
    return false;
  }
  if (!email.includes('@')) {
    return false;
  }
  if (!email.includes('.')) {
    return false;
  }
  return true;
}

function validarNombre(nombre) {
  if (nombre === null || nombre === undefined || nombre === '') {
    return false;
  }
  if (nombre.length < 2) {
    return false;
  }
  if (nombre.length > 50) {
    return false;
  }
  return true;
}
```

**Tareas:**
1. Identifica el codigo duplicado
2. Extrae una funcion auxiliar reutilizable
3. Reescribe ambas funciones usando esa funcion base

---

## Ejercicio 3 — Separar responsabilidades

El siguiente endpoint hace demasiadas cosas en un solo lugar. Refactorizalo separando la logica en capas:

```javascript
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email invalido' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password muy corto' });
  }
  const existe = await db.get('SELECT id FROM usuarios WHERE email = ?', [email]);
  if (existe) {
    return res.status(409).json({ error: 'Email ya registrado' });
  }
  const hash = require('crypto').createHash('sha256').update(password).digest('hex');
  await db.run('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hash]);
  const usuario = await db.get('SELECT id, nombre, email FROM usuarios WHERE email = ?', [email]);
  res.status(201).json({ success: true, data: usuario });
});
```

**Estructura esperada tras el refactor:**
```
routes/auth.routes.js      → solo define la ruta
controllers/auth.controller.js → maneja request/response
services/auth.service.js   → logica de negocio (validacion, hash, insert)
models/usuario.model.js    → acceso a la base de datos
```

---

## Entrega

Crea una rama `refactor/tu-nombre/ejercicio-refactor`, sube tus soluciones y abre un PR que incluya:
- El codigo original
- El codigo refactorizado
- Una explicacion breve de cada decision tomada
