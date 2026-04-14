const { Pool } = require("pg"); // Importa la clase Pool desde la libreria pg

// Pool = "piscina" de conexiones abiertas y reutilizables.
// Ejemplo: sin pool abririas/cerrarias una conexion por cada request (lento).
// Con pool, se reutilizan conexiones ya abiertas (mas rapido y estable).
const pool = new Pool({
  // process.env.* lee las variables del .env cargado con dotenv
  host: process.env.PGHOST || "localhost",
  // Si existe PGPORT, la convierte a numero; si no, usa 5432 (puerto default)
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "practica_backend",
});

// Ejecuta una consulta SQL y devuelve el resultado
function query(text, params) {
  return pool.query(text, params);
}

// Exporta query para usarla en otros archivos (models/services)
module.exports = { query };
