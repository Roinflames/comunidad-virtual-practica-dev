const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      error: "Token requerido",
    });
  }

  // Trae la clave secreta definida en .env (no crea token)
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      success: false,
      error: "JWT_SECRET no esta configurado",
    });
  }

  let payload;
  try {
    // Verifica el token con la clave (no crea token)
    payload = jwt.verify(token, secret);
  } catch (_err) {
    return res.status(401).json({
      success: false,
      error: "Token invalido",
    });
  }

  try {
    const user = await userModel.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Usuario no valido",
      });
    }

    req.user = user;
    return next();
  } catch (_err) {
    return res.status(500).json({
      success: false,
      error: "Error interno al validar la sesion",
    });
  }
}

module.exports = authMiddleware;
