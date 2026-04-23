const { all, get, run } = require("../db/database");

function mapTask(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    completada: Boolean(row.completada),
    usuario_id: row.usuario_id,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

async function listTasksByUserId(userId) {
  const rows = await all(
    `
      SELECT id, titulo, descripcion, completada, usuario_id, created_at, updated_at
      FROM tasks
      WHERE usuario_id = ?
      ORDER BY id ASC
    `,
    [userId]
  );

  return rows.map(mapTask);
}

async function findTaskByIdForUser(taskId, userId) {
  const row = await get(
    `
      SELECT id, titulo, descripcion, completada, usuario_id, created_at, updated_at
      FROM tasks
      WHERE id = ? AND usuario_id = ?
    `,
    [taskId, userId]
  );

  return mapTask(row);
}

async function createTaskForUser(titulo, descripcion, completada, userId) {
  const result = await run(
    `
      INSERT INTO tasks (titulo, descripcion, completada, usuario_id)
      VALUES (?, ?, ?, ?)
    `,
    [titulo, descripcion, completada ? 1 : 0, userId]
  );

  return findTaskByIdForUser(result.lastID, userId);
}

async function updateTaskForUser(taskId, titulo, descripcion, completada, userId) {
  const result = await run(
    `
      UPDATE tasks
      SET titulo = ?, descripcion = ?, completada = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND usuario_id = ?
    `,
    [titulo, descripcion, completada ? 1 : 0, taskId, userId]
  );

  if (result.changes === 0) {
    return null;
  }

  return findTaskByIdForUser(taskId, userId);
}

async function deleteTaskForUser(taskId, userId) {
  const result = await run(
    `
      DELETE FROM tasks
      WHERE id = ? AND usuario_id = ?
    `,
    [taskId, userId]
  );

  return result.changes > 0;
}

module.exports = {
  createTaskForUser,
  deleteTaskForUser,
  findTaskByIdForUser,
  listTasksByUserId,
  updateTaskForUser
};
