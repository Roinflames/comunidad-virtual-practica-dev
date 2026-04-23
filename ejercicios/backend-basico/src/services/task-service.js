const {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} = require("../data/tasks");

function validateTaskPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "El body debe ser un JSON valido.";
  }

  if (typeof payload.titulo !== "string" || payload.titulo.trim() === "") {
    return "El campo 'titulo' es obligatorio y debe ser texto.";
  }

  if (typeof payload.completada !== "boolean") {
    return "El campo 'completada' debe ser booleano.";
  }

  return null;
}

async function listTasks() {
  return getTasks();
}

async function findTask(id) {
  return getTaskById(id);
}

async function addTask(payload) {
  const validationError = validateTaskPayload(payload);

  if (validationError) {
    return { error: validationError };
  }

  const task = await createTask(payload.titulo.trim(), payload.completada);
  return { data: task };
}

async function editTask(id, payload) {
  const validationError = validateTaskPayload(payload);

  if (validationError) {
    return { error: validationError };
  }

  const task = await updateTask(id, payload.titulo.trim(), payload.completada);

  if (!task) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: task };
}

async function removeTask(id) {
  const deleted = await deleteTask(id);

  if (!deleted) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: null };
}

module.exports = {
  addTask,
  editTask,
  findTask,
  listTasks,
  removeTask
};
