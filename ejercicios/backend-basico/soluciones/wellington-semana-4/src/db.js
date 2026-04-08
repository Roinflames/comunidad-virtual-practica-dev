const { Pool } = require("pg");

// Conexion a PostgreSQL via variables de entorno (Semana 4: BD)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "practica_backend",
});

// Wrapper simple para ejecutar queries con parametros.
async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

module.exports = { query };
