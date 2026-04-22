const {
  createTaskForUser,
  deleteTaskForUser,
  findTaskByIdForUser,
  listTasksByUserId,
  updateTaskForUser
} = require("../models/task-model");

function normalizeTaskPayload(payload, requireAllFields) {
  if (!payload || typeof payload !== "object") {
    return { error: "El body debe ser un JSON valido." };
  }

  const titulo = typeof payload.titulo === "string" ? payload.titulo.trim() : "";
  const descripcionValue = payload.descripcion;
  const descripcion =
    typeof descripcionValue === "undefined"
      ? ""
      : typeof descripcionValue === "string"
        ? descripcionValue.trim()
        : null;
  const completada =
    typeof payload.completada === "undefined" ? false : payload.completada;

  if (titulo.length === 0) {
    return { error: "El campo 'titulo' es obligatorio y debe ser texto." };
  }

  if (descripcion === null) {
    return { error: "El campo 'descripcion' debe ser texto." };
  }

  if (requireAllFields && typeof payload.completada !== "boolean") {
    return { error: "El campo 'completada' es obligatorio y debe ser booleano." };
  }

  if (!requireAllFields && typeof completada !== "boolean") {
    return { error: "El campo 'completada' debe ser booleano." };
  }

  return {
    data: {
      titulo,
      descripcion,
      completada
    }
  };
}

async function listTasks(userId) {
  return {
    data: await listTasksByUserId(userId),
    code: 200
  };
}

async function getTask(taskId, userId) {
  const task = await findTaskByIdForUser(taskId, userId);

  if (!task) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: task, code: 200 };
}

async function addTask(payload, userId) {
  const normalized = normalizeTaskPayload(payload, false);

  if (normalized.error) {
    return { error: normalized.error, code: 400 };
  }

  const task = await createTaskForUser(
    normalized.data.titulo,
    normalized.data.descripcion,
    normalized.data.completada,
    userId
  );

  return { data: task, code: 201 };
}

async function editTask(taskId, payload, userId) {
  const normalized = normalizeTaskPayload(payload, true);

  if (normalized.error) {
    return { error: normalized.error, code: 400 };
  }

  const task = await updateTaskForUser(
    taskId,
    normalized.data.titulo,
    normalized.data.descripcion,
    normalized.data.completada,
    userId
  );

  if (!task) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: task, code: 200 };
}

async function removeTask(taskId, userId) {
  const deleted = await deleteTaskForUser(taskId, userId);

  if (!deleted) {
    return { error: "Tarea no encontrada.", code: 404 };
  }

  return { data: null, code: 200 };
}

module.exports = {
  addTask,
  editTask,
  getTask,
  listTasks,
  removeTask
};
