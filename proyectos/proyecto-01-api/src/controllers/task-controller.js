const { addTask, editTask, getTask, listTasks, removeTask } = require("../services/task-service");
const { sendError, sendSuccess } = require("../utils/http");

async function listTasksController(request, response) {
  const result = await listTasks(request.user.id);
  sendSuccess(response, result.code, result.data, "Listado de tareas.");
}

async function getTaskController(request, response, taskId) {
  const result = await getTask(taskId, request.user.id);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Tarea encontrada.");
}

async function createTaskController(request, response, body) {
  const result = await addTask(body, request.user.id);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Tarea creada.");
}

async function updateTaskController(request, response, taskId, body) {
  const result = await editTask(taskId, body, request.user.id);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Tarea actualizada.");
}

async function deleteTaskController(request, response, taskId) {
  const result = await removeTask(taskId, request.user.id);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Tarea eliminada.");
}

module.exports = {
  createTaskController,
  deleteTaskController,
  getTaskController,
  listTasksController,
  updateTaskController
};
