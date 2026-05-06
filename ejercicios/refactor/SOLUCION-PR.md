# Borrador de PR - Semana 9 Refactoring

## Titulo sugerido

`refactor: resolver ejercicio de semana 9 con mejoras de legibilidad y separacion de responsabilidades`

## Descripcion

Este PR deja resuelta la entrega de la semana 9 (`ejercicios/refactor`) con ejemplos de refactoring enfocados en:

- mejorar nombres y legibilidad sin cambiar comportamiento
- eliminar duplicacion con una funcion auxiliar reutilizable
- separar responsabilidades en capas para un flujo de registro

## Cambios realizados

- Se agrego el codigo original y el codigo refactorizado de los ejercicios 1 y 2.
- Se separo el ejemplo del ejercicio 3 en `routes`, `controllers`, `services` y `models`.
- Se documento la decision de mantener el comportamiento original mientras se mejora la estructura.

## Como probar

1. Revisar los archivos de `ejercicios/refactor/soluciones`.
2. Comparar cada archivo `original` con su version `refactor`.
3. Verificar que el ejercicio 3 mueve responsabilidades a capas sin alterar el flujo de validacion y registro.

## Notas para el revisor

- El foco del ejercicio es estructura y legibilidad, no integrar estos archivos a una app productiva.
- Se privilegio una solucion simple y clara sobre abstracciones adicionales.

