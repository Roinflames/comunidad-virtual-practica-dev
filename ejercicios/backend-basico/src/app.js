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

async function requestListener(request, response) {
  const { method, url } = request;
  const taskId = extractTaskId(url);

  if (method === "GET" && url === "/health") {
    getHealth(request, response);
    return;
  }

  if (method === "GET" && url === "/tareas") {
    getTasks(request, response);
    return;
  }

  if (method === "GET" && taskId !== null) {
    getTask(request, response, taskId);
    return;
  }

  if (method === "POST" && url === "/tareas") {
    try {
      const body = await parseJsonBody(request);
      createTaskController(request, response, body);
    } catch (_error) {
      sendError(response, 400, "El body debe ser JSON valido.");
    }

    return;
  }

  if (method === "PUT" && taskId !== null) {
    try {
      const body = await parseJsonBody(request);
      updateTaskController(request, response, taskId, body);
    } catch (_error) {
      sendError(response, 400, "El body debe ser JSON valido.");
    }

    return;
  }

  if (method === "DELETE" && taskId !== null) {
    deleteTaskController(request, response, taskId);
    return;
  }

  sendError(response, 404, "Ruta no encontrada.");
}

function createApp() {
  return http.createServer(requestListener);
}

module.exports = {
  createApp
};
