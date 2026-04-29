# Soluciones Semana 8

## Ejercicio 1

Bug encontrado:
- El `for` usa `i <= notas.length`, por lo que en la ultima iteracion intenta leer `notas[notas.length]`.

Linea problematica:
- La condicion del `for` del ejemplo original.

Por que falla:
- Esa posicion no existe y devuelve `undefined`.
- `suma += undefined` produce `NaN`, por lo que el promedio final queda incorrecto.

Correccion aplicada:
- Cambiar la condicion a `i < notas.length`.

Archivo:
- `ejercicio-1-promedio.js`

## Ejercicio 2

Bug encontrado:
- `response.json()` devuelve una promesa, pero el codigo original intenta usar `data.nombre` sin esperar su resolucion.

Por que puede fallar de forma silenciosa:
- No siempre explota con un stack trace claro en la misma linea.
- El resultado puede ser `undefined`, o el error puede aparecer mas tarde cuando se usa el valor.

Correccion aplicada:
- Usar `await response.json()`.
- Agregar validacion de `response.ok` para no seguir con respuestas HTTP invalidas.

Archivo:
- `ejercicio-2-async.js`

## Ejercicio 3

Objetivo del logging:
- Confirmar que llega la categoria esperada.
- Ver cuantos productos devuelve la query.
- Ver cuantos sobreviven al filtro `activo`.
- Verificar el orden final por `precio`.

Logs agregados:
- Categoria recibida
- Total y muestra de la query
- Total y muestra despues del filtro
- Secuencia de precios tras el ordenamiento
- Respuesta final enviada

Archivo:
- `ejercicio-3-logs.js`

## Comandos de prueba

```bash
node ejercicios/debugging/ejercicio-1-promedio.js
node ejercicios/debugging/ejercicio-2-async.js
node ejercicios/debugging/ejercicio-3-logs.js
```
