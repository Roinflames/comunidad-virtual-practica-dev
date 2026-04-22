const { loginController, registerController } = require("../controllers/auth-controller");
const { parseJsonBodyOrSendError } = require("../utils/http");

async function handleAuthRoutes(request, response, pathname) {
  if (request.method === "POST" && pathname === "/auth/registro") {
    const body = await parseJsonBodyOrSendError(request, response);

    if (body) {
      await registerController(request, response, body);
    }

    return true;
  }

  if (request.method === "POST" && pathname === "/auth/login") {
    const body = await parseJsonBodyOrSendError(request, response);

    if (body) {
      await loginController(request, response, body);
    }

    return true;
  }

  return false;
}

module.exports = {
  handleAuthRoutes
};
