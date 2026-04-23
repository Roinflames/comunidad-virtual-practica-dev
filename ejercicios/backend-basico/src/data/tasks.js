const { all, get, run } = require("../db/database");

function mapTask(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    titulo: row.titulo,
    completada: Boolean(row.completada),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

async function getTasks() {
  const rows = await all("SELECT id, titulo, completada, created_at, updated_at FROM tasks ORDER BY id ASC");
  return rows.map(mapTask);
}

async function getTaskById(id) {
  const row = await get(
    "SELECT id, titulo, completada, created_at, updated_at FROM tasks WHERE id = ?",
    [id]
  );

  return mapTask(row);
}

async function createTask(titulo, completada) {
  const result = await run("INSERT INTO tasks (titulo, completada) VALUES (?, ?)", [
    titulo,
    completada ? 1 : 0
  ]);

  return getTaskById(result.lastID);
}

async function updateTask(id, titulo, completada) {
  const result = await run(
    `
      UPDATE tasks
      SET titulo = ?, completada = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [titulo, completada ? 1 : 0, id]
  );

  if (result.changes === 0) {
    return null;
  }

  return getTaskById(id);
}

async function deleteTask(id) {
  const result = await run("DELETE FROM tasks WHERE id = ?", [id]);
  return result.changes > 0;
}

module.exports = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
};
