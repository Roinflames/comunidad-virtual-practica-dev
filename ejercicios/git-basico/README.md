# Ejercicio: Git Basico

**Objetivo:** Practicar el flujo de trabajo con Git desde cero hasta abrir un Pull Request.

**Nivel:** Principiante
**Duracion estimada:** 2-3 horas
**Semana del programa:** 1

---

## Antes de comenzar

Asegurate de tener Git instalado:
```bash
git --version
```

Configura tu identidad (solo la primera vez):
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## Parte 1 — Tu primer repositorio

1. Crea una carpeta llamada `mi-primer-repo` en tu maquina
2. Inicializa Git dentro de ella
3. Crea un archivo `saludo.txt` con el texto: `Hola, soy [tu nombre] y este es mi primer commit`
4. Agrega el archivo al staging area
5. Crea tu primer commit con el mensaje: `feat: agregar archivo de saludo`

```bash
# Tu solucion aqui
```

**Verificacion:** ejecuta `git log --oneline` y deberias ver tu commit.

---

## Parte 2 — Ramas y conflictos

1. Desde `main`, crea una rama llamada `feature/tu-nombre/cambiar-saludo`
2. Edita `saludo.txt` y cambia el texto
3. Haz un commit con el cambio
4. Vuelve a `main` y edita `saludo.txt` con un texto diferente
5. Haz un commit en `main`
6. Intenta hacer merge de tu rama en `main`
7. **Resuelve el conflicto** y finaliza el merge

---

## Parte 3 — Simulacion de flujo real

1. Clona este repositorio
2. Crea una rama `feature/tu-nombre/ejercicio-git`
3. Crea un archivo dentro de esta carpeta llamado `tu-nombre.txt` con:
   - Tu nombre
   - Fecha
   - Una cosa que aprendiste hoy
4. Haz commit y push
5. Abre un Pull Request usando la plantilla en `/templates/pull_request_template.md`

---

## Criterios de evaluacion

- [ ] Los commits tienen mensajes descriptivos con prefijo correcto
- [ ] Se trabajo en una rama separada (no en main)
- [ ] El PR tiene titulo claro y descripcion completa
- [ ] No se subieron archivos innecesarios
