# Solucion — Semana 8 Debugging

Este archivo deja mis respuestas y soluciones de la semana 8.

## Objetivo de la semana

El objetivo es identificar, analizar y corregir errores usando herramientas de debugging.

## Herramientas mas importantes

Las herramientas cambian segun donde corre el codigo:

- Backend con Node.js: `console.log()`, `console.error()`, `debugger`, `node --inspect`
- Python: `print()`, `pdb`, debugger de VS Code
- Frontend en navegador: DevTools, `Console`, `Sources`, `Network`

No son las unicas que existen, pero estas son las mas importantes para empezar porque ayudan a:

- leer errores
- ver variables
- seguir el flujo del codigo
- revisar requests y responses
- encontrar en que parte se rompe el programa

## Por que es importante leer errores

Es importante porque el error normalmente ya da pistas de:

- que tipo de problema ocurrio
- en que archivo paso
- en que linea paso
- que funcion estaba ejecutandose
- desde donde fue llamada

Por eso en debugging no se empieza adivinando. Se empieza leyendo el error y revisando el punto exacto del fallo.

## Ejercicio 1 — Encontrar el bug

Codigo original:

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

### Respuestas

- Cual es el bug: el `for` recorre una vez mas de lo debido, porque usa `<=` en vez de `<`
- En que linea ocurre: ocurre en la linea del `for`
- Por que genera un resultado incorrecto: porque intenta sumar un `undefined`; el arreglo tiene 4 valores, pero el ciclo recorre 5 veces
- Como lo corregi: cambiando `i <= notas.length` por `i < notas.length`

### Explicacion como yo la diria

Al revisar la consola, observe que el ciclo recorria cinco veces en vez de cuatro. En la ultima iteracion, `i` tomaba el valor `4`, pero esa posicion no existe dentro del arreglo. Por eso `notas[4]` devolvia `undefined`, y al sumarlo la variable `suma` terminaba en `NaN`. Con eso conclui que el error estaba en la condicion del `for`, que usaba `<=` en vez de `<`.

### Version corregida

```javascript
function calcularPromedio(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
}

console.log(calcularPromedio([7, 8, 6, 9]));
```

## Ejercicio 2 — Errores silenciosos

Codigo original:

```javascript
async function obtenerUsuario(id) {
  const response = await fetch(`/api/usuarios/${id}`);
  const data = response.json();  // bug aqui
  return data.nombre;
}
```

### Que hace mal

El problema es que `response.json()` tambien es asincrono y devuelve una promesa. Si no se usa `await`, la variable `data` no guarda el objeto del usuario, sino una promesa.

### Por que puede fallar de manera no evidente

Puede fallar de manera silenciosa porque el codigo no siempre muestra un error claro altiro. A simple vista parece correcto, pero en realidad `data.nombre` intenta leer una propiedad dentro de una promesa en vez de leerla dentro del objeto real.

### Como lo corregi

Agregue `await` al parseo del JSON.

### Explicacion como yo la diria

En este ejercicio el error no estaba en el `fetch`, sino despues. La funcion hacia la peticion bien, pero al guardar `response.json()` sin `await`, la variable `data` quedaba siendo una promesa. Despues el codigo intentaba leer `data.nombre`, pero ahi todavia no tenia el objeto del usuario listo. Por eso era un error silencioso y no tan obvio a primera vista.

### Version corregida

```javascript
async function obtenerUsuario(id) {
  const response = await fetch(`/api/usuarios/${id}`);
  const data = await response.json();
  return data.nombre;
}
```

## Ejercicio 3 — Debugging con logs

Codigo base:

```javascript
app.get('/productos', async (req, res) => {
  const categoria = req.query.categoria;
  const productos = await db.query('SELECT * FROM productos WHERE categoria = ?', [categoria]);
  const activos = productos.filter(p => p.activo);
  const ordenados = activos.sort((a, b) => a.precio - b.precio);
  res.json(ordenados);
});
```

### Que habia que hacer

La idea no era cambiar toda la logica de inmediato, sino agregar logs en los puntos correctos para descubrir si el problema venia de:

- la query
- el filtro
- el ordenamiento

### Como lo haria

```javascript
app.get('/productos', async (req, res) => {
  const categoria = req.query.categoria;
  console.log('[GET /productos] categoria recibida:', categoria);

  const productos = await db.query(
    'SELECT * FROM productos WHERE categoria = ?',
    [categoria]
  );
  console.log('[GET /productos] productos desde DB:', productos);
  console.log('[GET /productos] cantidad desde DB:', productos.length);

  const activos = productos.filter(p => p.activo);
  console.log('[GET /productos] productos activos:', activos);
  console.log('[GET /productos] cantidad activos:', activos.length);

  const ordenados = activos.sort((a, b) => a.precio - b.precio);
  console.log('[GET /productos] productos ordenados:', ordenados);

  res.json(ordenados);
});
```

### Explicacion como yo la diria

Yo agregaria logs primero para revisar la categoria que llega en el request. Despues pondria logs para ver exactamente que devuelve la base de datos. Luego agregaria logs despues del filtro para confirmar cuantos productos siguen activos. Y por ultimo pondria logs despues del `sort` para ver si el ordenamiento esta funcionando como espero. Asi puedo ubicar mejor si el problema esta en la query, en el filtro o en el orden final.

## Resumen final

En la semana 8 no solo se trata de corregir bugs, sino de aprender a encontrarlos de forma ordenada. Primero se lee el error, despues se revisa el flujo del codigo, luego se usan logs o breakpoints para confirmar donde falla, y recien ahi se hace la correccion.
