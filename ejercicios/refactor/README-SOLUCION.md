# Solucion — Semana 9 Refactoring

Este archivo deja mis respuestas y soluciones de la semana 9.

## Objetivo de la semana

El objetivo es mejorar codigo existente sin cambiar su funcionalidad, aplicando principios de codigo limpio.

## Relacion con la semana 8

La semana 8 se enfoca en encontrar y entender errores. La semana 9 se enfoca en mejorar codigo que ya funciona, pero que puede quedar mas claro, mas mantenible y mas ordenado.

Primero debug, despues refactor.

## Regla de oro

Antes de refactorizar, hay que verificar el comportamiento actual del codigo. La idea es mejorar la estructura sin cambiar lo que el codigo hace por fuera.

## Principios importantes

### DRY

`DRY` significa `Don't Repeat Yourself`.

Quiere decir que si la misma logica aparece repetida en varias partes, conviene extraerla para reutilizarla.

### KISS

`KISS` significa `Keep It Simple, Stupid`.

Quiere decir que la solucion mas simple que funcione suele ser la mejor. No hay que complicar el codigo sin necesidad.

### YAGNI

`YAGNI` significa `You Aren't Gonna Need It`.

Quiere decir que no hay que programar cosas "por si acaso". Solo se implementa lo que realmente se necesita ahora.

### Single Responsibility

Cada funcion debe hacer una sola cosa y hacerla bien.

Si una funcion valida, guarda, transforma, envia y responde al mismo tiempo, entonces esta haciendo demasiado.

## Ejercicio 1 — Naming y legibilidad

Codigo original:

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

### Que cambie

- Renombre la funcion para que explique lo que hace
- Renombre los parametros para que se entienda que representan
- Renombre la variable de resultado
- Renombre las propiedades abreviadas por nombres claros
- Mantuve la misma logica

### Version refactorizada

```javascript
function obtenerUsuariosActivosPorTipo(usuarios, tipoBuscado) {
  const usuariosFiltrados = [];

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].activo === true && usuarios[i].tipo === tipoBuscado) {
      usuariosFiltrados.push({
        nombre: usuarios[i].nombre,
        email: usuarios[i].email,
      });
    }
  }

  return usuariosFiltrados;
}
```

### Explicacion breve

La logica es la misma que en el codigo original. El cambio principal fue mejorar nombres para que el codigo se entienda sin tener que adivinar que significa cada letra. Despues del refactor, la intencion del codigo queda mucho mas clara y asi tambien no se tiene que sobre comentar tanto.

## Ejercicio 2 — Eliminar duplicacion

Codigo original:

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

### Codigo duplicado identificado

En las dos funciones se repetia la misma validacion base:

- revisar si el valor venia en `null`
- revisar si el valor venia en `undefined`
- revisar si el valor venia vacio con `''`

### Funcion auxiliar extraida

```javascript
function tieneValor(texto) {
  return texto !== null && texto !== undefined && texto !== '';
}
```

### Version refactorizada

```javascript
function tieneValor(texto) {
  return texto !== null && texto !== undefined && texto !== '';
}

function validarEmail(email) {
  if (!tieneValor(email)) {
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
  if (!tieneValor(nombre)) {
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

### Explicacion breve

En este ejercicio identifique que habia una validacion repetida en las dos funciones. Para aplicar `DRY`, extraje esa logica a una funcion auxiliar reutilizable llamada `tieneValor`.

Con eso la validacion queda centralizada en un solo lugar. Eso es importante porque cuesta menos mantenerlo, se puede reutilizar mejor, evita redundancia y reduce errores si la regla cambia mas adelante.

La linea:

```javascript
return texto !== null && texto !== undefined && texto !== '';
```

significa que el valor solo sera valido si no es `null`, no es `undefined` y tampoco es una cadena vacia. Si una sola de esas condiciones falla, la funcion devuelve `false`.

## Ejercicio 3 — Separar responsabilidades

Codigo original:

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

### Problema identificado

El endpoint hacia demasiadas cosas en un solo lugar:

- recibia el request
- validaba campos
- validaba email
- validaba password
- consultaba la base de datos
- revisaba si el usuario ya existia
- generaba el hash
- insertaba en la base de datos
- volvia a consultar el usuario
- devolvia la respuesta HTTP

### Version refactorizada por capas

#### routes/auth.routes.js

```javascript
const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registro', authController.registro);

module.exports = router;
```

#### controllers/auth.controller.js

```javascript
const authService = require('../services/auth.service');

async function registro(req, res) {
  try {
    const usuario = await authService.registrarUsuario(req.body);
    return res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Error al registrar usuario',
    });
  }
}

module.exports = {
  registro,
};
```

#### services/auth.service.js

```javascript
const crypto = require('crypto');
const usuarioModel = require('../models/usuario.model');

async function registrarUsuario({ nombre, email, password }) {
  if (!nombre || !email || !password) {
    const error = new Error('Faltan campos');
    error.status = 400;
    throw error;
  }

  if (!email.includes('@')) {
    const error = new Error('Email invalido');
    error.status = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error('Password muy corto');
    error.status = 400;
    throw error;
  }

  const usuarioExistente = await usuarioModel.buscarPorEmail(email);
  if (usuarioExistente) {
    const error = new Error('Email ya registrado');
    error.status = 409;
    throw error;
  }

  const passwordHash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  await usuarioModel.crearUsuario({
    nombre,
    email,
    password: passwordHash,
  });

  return usuarioModel.buscarUsuarioPublicoPorEmail(email);
}

module.exports = {
  registrarUsuario,
};
```

#### models/usuario.model.js

```javascript
async function buscarPorEmail(email) {
  return db.get('SELECT id FROM usuarios WHERE email = ?', [email]);
}

async function crearUsuario({ nombre, email, password }) {
  return db.run(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );
}

async function buscarUsuarioPublicoPorEmail(email) {
  return db.get(
    'SELECT id, nombre, email FROM usuarios WHERE email = ?',
    [email]
  );
}

module.exports = {
  buscarPorEmail,
  crearUsuario,
  buscarUsuarioPublicoPorEmail,
};
```

### Explicacion breve

En este ejercicio el problema no era un bug, sino que el endpoint hacia demasiadas cosas en un solo lugar. Para refactorizarlo, separe responsabilidades por capas. La ruta queda solo para definir el endpoint, el controller para manejar request y response, el service para la logica de negocio y el model para el acceso a la base de datos.

Asi el codigo queda mas ordenado, mas mantenible y mas facil de probar. Si cambia una validacion, no hace falta tocar toda la ruta. Si falla la base de datos, es mas facil ubicar el problema. Y si quiero reutilizar la logica de registro en otro lugar, ya no depende directamente de Express ni de la respuesta HTTP.

## Verificacion minima

Aunque en esta entrega no agregue tests formales, si deje casos minimos de verificacion para confirmar que el comportamiento esperado se mantiene despues del refactor.

### Ejercicio 1

```javascript
console.assert(
  JSON.stringify(
    obtenerUsuariosActivosPorTipo(
      [
        { activo: true, tipo: 'admin', nombre: 'Ana', email: 'ana@mail.com' },
        { activo: false, tipo: 'admin', nombre: 'Luis', email: 'luis@mail.com' },
      ],
      'admin'
    )
  ) === JSON.stringify([
    { nombre: 'Ana', email: 'ana@mail.com' },
  ])
);
```

### Ejercicio 2

```javascript
console.assert(validarEmail('ana@mail.com') === true);
console.assert(validarEmail('') === false);
console.assert(validarNombre('Ana') === true);
console.assert(validarNombre('') === false);
```

### Sentido de esta verificacion

La idea de esta seccion es comprobar de forma simple que el refactor no cambia el resultado esperado. No reemplaza tests completos, pero si sirve como verificacion minima del comportamiento actual.
