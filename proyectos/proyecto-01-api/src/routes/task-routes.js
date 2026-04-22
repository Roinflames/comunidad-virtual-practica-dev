const {
  createTaskController,
  deleteTaskController,
  getTaskController,
  listTasksController,
  updateTaskController
} = require("../controllers/task-controller");
const { requireAuth } = require("../middlewares/auth-middleware");
const { parseJsonBodyOrSendError, sendError } = require("../utils/http");

function extractTaskId(pathname) {
  const match = pathname.match(/^\/tareas\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

async function handleTaskRoutes(request, response, pathname) {
  if (pathname === "/tareas") {
    const authenticated = await requireAuth(request, response);

    if (!authenticated) {
      return true;
    }

    if (request.method === "GET") {
      await listTasksController(request, response);
      return true;
    }

    if (request.method === "POST") {
      const body = await parseJsonBodyOrSendError(request, response);

      if (body) {
        await createTaskController(request, response, body);
      }

      return true;
    }

    sendError(response, 405, "Metodo no permitido.");
    return true;
  }

  const taskId = extractTaskId(pathname);

  if (taskId === null) {
    return false;
  }

  const authenticated = await requireAuth(request, response);

  if (!authenticated) {
    return true;
  }

  if (request.method === "GET") {
    await getTaskController(request, response, taskId);
    return true;
  }

  if (request.method === "PUT") {
    const body = await parseJsonBodyOrSendError(request, response);

    if (body) {
      await updateTaskController(request, response, taskId, body);
    }

    return true;
  }

  if (request.method === "DELETE") {
    await deleteTaskController(request, response, taskId);
    return true;
  }

  sendError(response, 405, "Metodo no permitido.");
  return true;
}

module.exports = {
  handleTaskRoutes
};
