const { get, run } = require("../db/database");

function mapUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    nombre: row.nombre,
    email: row.email,
    created_at: row.created_at
  };
}

async function createUser(nombre, email, passwordHash) {
  const result = await run(
    `
      INSERT INTO users (nombre, email, password_hash)
      VALUES (?, ?, ?)
    `,
    [nombre, email, passwordHash]
  );

  return findUserById(result.lastID);
}

async function findUserByEmail(email) {
  return get(
    `
      SELECT id, nombre, email, password_hash, created_at
      FROM users
      WHERE email = ?
    `,
    [email]
  );
}

async function findUserById(id) {
  const row = await get(
    `
      SELECT id, nombre, email, created_at
      FROM users
      WHERE id = ?
    `,
    [id]
  );

  return mapUser(row);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
