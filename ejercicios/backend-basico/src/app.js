const http = require("http");
const {
  createTaskController,
  deleteTaskController,
  getHealth,
  getTask,
  getTasks,
  sendError,
  updateTaskController
} = require("./controllers/task-controller");

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function extractTaskId(url) {
  const match = url.match(/^\/tareas\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

async function parseJsonBodyOrSendError(request, response) {
  try {
    return await parseJsonBody(request);
  } catch (_error) {
    sendError(response, 400, "El body debe ser JSON valido.");
    return null;
  }
}

async function requestListener(request, response) {
  const { method, url } = request;
  const taskId = extractTaskId(url);

  try {
    if (method === "GET" && url === "/health") {
      getHealth(request, response);
      return;
    }

    if (method === "GET" && url === "/tareas") {
      await getTasks(request, response);
      return;
    }

    if (method === "GET" && taskId !== null) {
      await getTask(request, response, taskId);
      return;
    }

    if (method === "POST" && url === "/tareas") {
      const body = await parseJsonBodyOrSendError(request, response);

      if (body) {
        await createTaskController(request, response, body);
      }

      return;
    }

    if (method === "PUT" && taskId !== null) {
      const body = await parseJsonBodyOrSendError(request, response);

      if (body) {
        await updateTaskController(request, response, taskId, body);
      }

      return;
    }

    if (method === "DELETE" && taskId !== null) {
      await deleteTaskController(request, response, taskId);
      return;
    }
  } catch (_error) {
    sendError(response, 500, "Error interno del servidor.");
  }

  sendError(response, 404, "Ruta no encontrada.");
}

function createApp() {
  return http.createServer(requestListener);
}

module.exports = {
  createApp
};
