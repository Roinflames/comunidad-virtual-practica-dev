# Solucion alternativa (Express + PostgreSQL) — Wellington (Semana 4)

Esta es una solucion alternativa al ejercicio de Backend Basico, implementada con Express y PostgreSQL (CRUD persistente).

## Como ejecutar

```bash
cd ejercicios/backend-basico/soluciones/wellington-semana-4
npm install
npm run dev
```

Luego probar:

```bash
curl http://localhost:3000/health
```

## Base de datos

Crear tabla y datos de prueba:

```bash
psql -d practica_backend -f db/schema.sql
psql -d practica_backend -f db/seed.sql
```
