// Importa el cliente de base de datos desde src/db/db.js
const db = require("../db/db");

// Lista todas las tareas de un usuario (consulta SQL)
async function findAllByUser(userId) {
  const result = await db.query(
    "SELECT id, titulo, descripcion, completada, usuario_id, created_at, updated_at FROM tareas WHERE usuario_id = $1 ORDER BY id DESC",
    [userId]
  );
  return result.rows;
}

// Busca una tarea por id y usuario (asegura pertenencia)
async function findByIdForUser(id, userId) {
  const result = await db.query(
    "SELECT id, titulo, descripcion, completada, usuario_id, created_at, updated_at FROM tareas WHERE id = $1 AND usuario_id = $2",
    [id, userId]
  );
  return result.rows[0] || null;
}

// Crea una tarea para un usuario (INSERT)
async function createTask({ titulo, descripcion, userId }) {
  const result = await db.query(
    "INSERT INTO tareas (titulo, descripcion, usuario_id) VALUES ($1, $2, $3) RETURNING id, titulo, descripcion, completada, usuario_id, created_at, updated_at",
    [titulo, descripcion, userId]
  );
  return result.rows[0];
}

// Actualiza una tarea (solo si pertenece al usuario)
async function updateTask({ id, titulo, descripcion, completada, userId }) {
  const result = await db.query(
    "UPDATE tareas SET titulo = $1, descripcion = $2, completada = $3, updated_at = NOW() WHERE id = $4 AND usuario_id = $5 RETURNING id, titulo, descripcion, completada, usuario_id, created_at, updated_at",
    [titulo, descripcion, completada, id, userId]
  );
  return result.rows[0] || null;
}

// Elimina una tarea (solo si pertenece al usuario)
async function deleteTask({ id, userId }) {
  const result = await db.query(
    "DELETE FROM tareas WHERE id = $1 AND usuario_id = $2 RETURNING id",
    [id, userId]
  );
  return result.rows[0] || null;
}

// Exporta funciones del modelo para usarlas en el service
module.exports = {
  findAllByUser,
  findByIdForUser,
  createTask,
  updateTask,
  deleteTask,
};
