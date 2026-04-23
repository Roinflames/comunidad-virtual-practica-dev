const { loginUser, registerUser } = require("../services/auth-service");
const { sendError, sendSuccess } = require("../utils/http");

async function registerController(_request, response, body) {
  const result = await registerUser(body);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Usuario registrado.");
}

async function loginController(_request, response, body) {
  const result = await loginUser(body);

  if (result.error) {
    sendError(response, result.code, result.error);
    return;
  }

  sendSuccess(response, result.code, result.data, "Login correcto.");
}

module.exports = {
  loginController,
  registerController
};
