# Proyecto 03 — Automatizacion

**Objetivo:** Construir un script o bot que automatice una tarea repetitiva, consumiendo al menos una API externa.

**Nivel:** Intermedio
**Semana del programa:** 11
**Stack sugerido:** Node.js o Python

---

## Descripcion

Elegiras UNA de las siguientes opciones y la implementaras. Cada opcion tiene el mismo nivel de dificultad estimado.

---

## Opcion A — Bot de Notificaciones

Crea un script que se ejecute periodicamente y envia un resumen de tareas pendientes al usuario por Telegram o email.

**Funcionamiento:**
1. Se conecta a la API del Proyecto 01 y obtiene las tareas pendientes del usuario
2. Si hay mas de N tareas pendientes (configurable), envia un mensaje
3. El mensaje incluye: cantidad de tareas, las 3 mas antiguas, y un link al dashboard

**APIs externas necesarias:**
- Telegram Bot API (gratuita, documentacion en https://core.telegram.org/bots/api)

---

## Opcion B — Scraper de Datos

Crea un script que extrae datos de un sitio web publico y los guarda en un archivo JSON o CSV.

**Requisitos:**
- El sitio debe ser publico y su scraping debe ser permitido (revisar `robots.txt`)
- Los datos deben limpiarse y estructurarse antes de guardarse
- El script debe manejar errores de red y reintentar si falla
- Incluir logs de ejecucion con timestamp

**Ideas de fuentes:** precios de productos en tiendas online, clima, noticias, tasas de cambio.

---

## Opcion C — CLI Tool

Crea una herramienta de linea de comandos que interactue con la API del Proyecto 01.

**Comandos requeridos:**
```bash
node cli.js login --email usuario@email.com --password secreto
node cli.js tareas listar
node cli.js tareas crear --titulo "Mi tarea" --descripcion "Descripcion"
node cli.js tareas completar --id 5
node cli.js tareas eliminar --id 5
```

---

## Requisitos Comunes (todas las opciones)

- [ ] El script es configurable via variables de entorno (no hardcodear URLs, tokens, etc.)
- [ ] Manejo de errores: si algo falla, el script muestra un mensaje claro y no explota silenciosamente
- [ ] README propio dentro del proyecto explicando como instalar y ejecutar
- [ ] El codigo esta organizado en funciones con nombres descriptivos
- [ ] No hay credenciales en el codigo

---

## Criterios de Evaluacion

- [ ] El script funciona de principio a fin sin errores
- [ ] El codigo es legible (nombres, estructura, sin logica mezclada)
- [ ] Los errores se manejan correctamente
- [ ] El README del proyecto es claro y suficiente para que otro desarrollador lo corra sin ayuda
- [ ] Los commits siguen las convenciones de `docs/reglas-git.md`

---

## Como entregar

1. Crea una rama `feature/tu-nombre/proyecto-03-automatizacion`
2. Trabaja dentro de esta carpeta (`proyectos/proyecto-03-automatizacion/`)
3. Al terminar, abre un Pull Request con el template correspondiente
