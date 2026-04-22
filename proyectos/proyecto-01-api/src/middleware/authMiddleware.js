const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authMiddleware(req, res, next) {
  try {
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

    // Verifica el token con la clave (no crea token)
    const payload = jwt.verify(token, secret);
    const user = await userModel.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Usuario no valido",
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Token invalido",
    });
  }
}

module.exports = authMiddleware;
