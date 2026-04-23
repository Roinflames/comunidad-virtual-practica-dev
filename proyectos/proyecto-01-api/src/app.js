const http = require("http");
const { handleAuthRoutes } = require("./routes/auth-routes");
const { handleTaskRoutes } = require("./routes/task-routes");
const { sendError, sendSuccess } = require("./utils/http");

async function requestListener(request, response) {
  const parsedUrl = new URL(request.url, "http://localhost");
  const pathname = parsedUrl.pathname;

  try {
    if (request.method === "GET" && pathname === "/health") {
      sendSuccess(response, 200, { status: "ok" }, "Servidor operativo.");
      return;
    }

    if (await handleAuthRoutes(request, response, pathname)) {
      return;
    }

    if (await handleTaskRoutes(request, response, pathname)) {
      return;
    }

    sendError(response, 404, "Ruta no encontrada.");
  } catch (_error) {
    sendError(response, 500, "Error interno del servidor.");
  }
}

function createApp() {
  return http.createServer(requestListener);
}

module.exports = {
  createApp
};
