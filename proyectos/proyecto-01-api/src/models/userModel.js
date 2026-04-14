const db = require("../db/db");

// Busca usuario por email (incluye password_hash para login)
async function findByEmail(email) {
  const result = await db.query(
    "SELECT id, nombre, email, password_hash, created_at FROM usuarios WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

// Busca usuario por id (sin password_hash)
async function findById(id) {
  const result = await db.query(
    "SELECT id, nombre, email, created_at FROM usuarios WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

// Crea un nuevo usuario en la base de datos
async function createUser({ nombre, email, passwordHash }) {
  const result = await db.query(
    "INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email, created_at",
    [nombre, email, passwordHash]
  );
  return result.rows[0];
}

// Exporta funciones del modelo para que otros modulos las usen
module.exports = {
  findByEmail,
  findById,
  createUser,
};
