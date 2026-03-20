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

function listTasks() {
  return getTasks();
}

function findTask(id) {
  return getTaskById(id);
}

function addTask(payload) {
  const validationError = validateTaskPayload(payload);

  if (validationError) {
    return { error: validationError };
  }

  const task = createTask(payload.titulo.trim(), payload.completada);
  return { data: task };
}

function editTask(id, payload) {
  const validationError = validateTaskPayload(payload);

  if (validationError) {
    return { error: validationError };
  }

  const task = updateTask(id, payload.titulo.trim(), payload.completada);

  if (!task) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: task };
}

function removeTask(id) {
  const deleted = deleteTask(id);

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
