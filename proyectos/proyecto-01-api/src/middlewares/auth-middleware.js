const { config } = require("../config/env");
const { findUserById } = require("../models/user-model");
const { sendError } = require("../utils/http");
const { verifyToken } = require("../utils/security");

async function requireAuth(request, response) {
  const authorization = request.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    sendError(response, 401, "Debes enviar un token Bearer valido.");
    return false;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    sendError(response, 401, "Debes enviar un token Bearer valido.");
    return false;
  }

  try {
    const payload = verifyToken(token, config.jwtSecret);
    const user = await findUserById(Number(payload.sub));

    if (!user) {
      sendError(response, 401, "El usuario del token no existe.");
      return false;
    }

    request.user = user;
    return true;
  } catch (error) {
    sendError(response, 401, error.message || "Token invalido.");
    return false;
  }
}

module.exports = {
  requireAuth
};
