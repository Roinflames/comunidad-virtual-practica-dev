# Reglas de Git — Comunidad Virtual

> Documento obligatorio para todos los practicantes. Seguir estas reglas garantiza un historial limpio y un flujo de trabajo profesional.

---

## Flujo de Trabajo (GitHub Flow)

```
main
 └── feature/nombre/descripcion   ← tu rama de trabajo
      └── commits
           └── Pull Request → review → merge a main
```

**Nunca trabajes directamente en `main`.** Siempre crea una rama nueva para cada tarea.

---

## Nombrado de Ramas

Formato: `tipo/tu-nombre/descripcion-corta`

| Tipo | Cuando usarlo |
|---|---|
| `feature/` | Nueva funcionalidad |
| `fix/` | Correccion de bug |
| `docs/` | Solo cambios de documentacion |
| `refactor/` | Mejora de codigo sin cambio de funcionalidad |
| `test/` | Agregar o modificar tests |

**Ejemplos:**
```
feature/juan/endpoint-usuarios
fix/maria/error-login-token-vencido
docs/pedro/actualizar-readme
```

---

## Mensajes de Commit

Formato: `tipo: descripcion en minusculas`

| Prefijo | Significado |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Correccion de bug |
| `docs:` | Documentacion |
| `refactor:` | Refactoring |
| `test:` | Tests |
| `chore:` | Tareas de mantenimiento (dependencias, configs) |

**Buenos ejemplos:**
```
feat: agregar endpoint POST /usuarios
fix: corregir validacion de email vacio
docs: agregar instrucciones de instalacion al README
refactor: extraer logica de autenticacion a middleware
```

**Malos ejemplos:**
```
arregle cosas
update
wip
fix bug
cambios varios
```

---

## Crear una Rama y Trabajar

```bash
# 1. Asegurate de estar en main actualizado
git checkout main
git pull origin main

# 2. Crea tu rama
git checkout -b feature/tu-nombre/descripcion

# 3. Trabaja, guarda cambios
git add nombre-del-archivo.js    # agrega archivos especificos
git commit -m "feat: descripcion del cambio"

# 4. Sube tu rama al repositorio remoto
git push origin feature/tu-nombre/descripcion

# 5. Abre un Pull Request en GitHub
```

---

## Antes de Abrir un Pull Request

```bash
# Sincroniza tu rama con los cambios de main
git fetch origin
git rebase origin/main

# Resuelve conflictos si los hay, luego:
git add .
git rebase --continue

# Sube los cambios
git push origin feature/tu-nombre/descripcion --force-with-lease
```

---

## Reglas de Pull Request

- El titulo del PR debe describir QUE hace el cambio, no como
- Usa la plantilla de `/templates/pull_request_template.md`
- Agrega capturas de pantalla o logs si el cambio afecta la UI o comportamiento visible
- El PR no se mergea sin al menos un review aprobado
- No fuerces merge si hay cambios solicitados pendientes

---

## Lo que NUNCA debes hacer

- `git push --force` en `main`
- Commitear archivos `.env` o credenciales
- Subir binarios pesados (videos, instaladores, bases de datos)
- Hacer `git add .` sin revisar primero `git status`
- Dejar commits con mensaje "fix" o "update" sin contexto
- Mergear tu propio PR sin review

---

## Comandos Utiles

```bash
git status                         # ver estado del directorio de trabajo
git log --oneline --graph          # historial resumido con grafico de ramas
git diff                           # ver cambios no commiteados
git stash                          # guardar cambios temporalmente sin commitear
git stash pop                      # recuperar lo guardado con stash
git blame archivo.js               # ver quien escribio cada linea
git bisect                         # encontrar el commit que introdujo un bug
```
