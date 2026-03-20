const {
  addTask,
  editTask,
  findTask,
  listTasks,
  removeTask
} = require("../services/task-service");

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sendSuccess(response, statusCode, data, message) {
  sendJson(response, statusCode, {
    success: true,
    data,
    message
  });
}

function sendError(response, statusCode, error) {
  sendJson(response, statusCode, {
    success: false,
    error,
    code: statusCode
  });
}

function getHealth(_request, response) {
  sendSuccess(response, 200, { status: "ok" }, "Servidor operativo.");
}

function getTasks(_request, response) {
  sendSuccess(response, 200, listTasks(), "Listado de tareas.");
}

function getTask(_request, response, id) {
  const task = findTask(id);

  if (!task) {
    sendError(response, 404, "Tarea no encontrada.");
    return;
  }

  sendSuccess(response, 200, task, "Tarea encontrada.");
}

function createTaskController(_request, response, body) {
  const result = addTask(body);

  if (result.error) {
    sendError(response, 400, result.error);
    return;
  }

  sendSuccess(response, 201, result.data, "Tarea creada.");
}

function updateTaskController(_request, response, id, body) {
  const result = editTask(id, body);

  if (result.error) {
    sendError(response, result.code || 400, result.error);
    return;
  }

  sendSuccess(response, 200, result.data, "Tarea actualizada.");
}

function deleteTaskController(_request, response, id) {
  const result = removeTask(id);

  if (result.error) {
    sendError(response, result.code || 404, result.error);
    return;
  }

  sendSuccess(response, 200, null, "Tarea eliminada.");
}

module.exports = {
  createTaskController,
  deleteTaskController,
  getHealth,
  getTask,
  getTasks,
  sendError,
  updateTaskController
};
