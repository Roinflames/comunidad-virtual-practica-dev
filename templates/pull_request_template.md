# Pull Request: [Titulo del PR]

> Completa esta plantilla antes de solicitar revision. Un PR bien documentado agiliza el proceso de code review.

---

## Descripcion

<!-- Que hace este PR? Describe el cambio de forma concisa. -->

---

## Tipo de Cambio

- [ ] Nueva funcionalidad (`feat`)
- [ ] Correccion de bug (`fix`)
- [ ] Refactoring (`refactor`)
- [ ] Documentacion (`docs`)
- [ ] Tests (`test`)
- [ ] Mantenimiento / configuracion (`chore`)

---

## Cambios Realizados

<!-- Lista los cambios principales. Sé especifico. -->

-
-
-

---

## Como Probar

<!-- Instrucciones paso a paso para que el revisor pueda verificar los cambios -->

1.
2.
3.

**Endpoint o comando de prueba:**
```bash
# Ejemplo:
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "12345678"}'
```

---

## Checklist (antes de pedir review)

- [ ] El codigo funciona localmente sin errores
- [ ] Los commits siguen las convenciones de `docs/reglas-git.md`
- [ ] El nombre de la rama sigue el formato correcto
- [ ] No se subieron archivos `.env`, credenciales o binarios
- [ ] Se sincronizo la rama con `main` antes de abrir el PR (`git rebase origin/main`)
- [ ] Se agrego `.env.example` si el cambio requiere nuevas variables de entorno
- [ ] El README del proyecto se actualizo si es necesario

---

## Capturas de pantalla (si aplica)

<!-- Para cambios en UI, agrega antes/despues -->

| Antes | Despues |
|---|---|
| | |

---

## Notas para el Revisor

<!-- Algo que el revisor deba saber antes de hacer el review? Decisiones de diseño, compromisos, dudas abiertas? -->

---

## Issue Relacionado

<!-- Escribe "Closes #N" para cerrar automaticamente el issue al hacer merge -->

Closes #
