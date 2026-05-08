const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

// Validacion simple de email (formato basico)
function validateEmail(email) {
  return typeof email === "string" && /.+@.+\..+/.test(email);
}

// Password minimo 6 caracteres
function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}

// Nombre no vacio y minimo 2 caracteres
function validateNombre(nombre) {
  return typeof nombre === "string" && nombre.trim().length >= 2;
}

// Lee la clave desde el entorno y crea el JWT con el id del usuario
function signToken(userId) {
  // Trae la clave secreta definida en .env (no crea el token)
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const error = new Error("JWT_SECRET no esta configurado");
    error.status = 500;
    throw error;
  }
  // Crea el token firmado usando la clave
  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
}

// Esto es un controller: orquesta la accion.
// Que hace:
// saca datos de req.body
// valida que no falten campos
// encripta la contrasena (a traves del service)
// llama al modelo (a traves del service)
// devuelve respuesta
async function registro(req, res) {
  try {
    const { nombre, email, password } = req.body;

    // Validaciones basicas de entrada
    if (!validateNombre(nombre)) {
      return res
        .status(400)
        .json({ success: false, error: "Nombre invalido" });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Email invalido" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: "Password invalida (minimo 6 caracteres)",
      });
    }

    // Llama al servicio que crea el usuario (y hashea el password)
    const user = await authService.register({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    // Genera token para devolver junto al usuario
    const token = signToken(user.id);

    return res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (err) {
    // Captura errores del servicio (ej: email duplicado) u otros
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error en registro",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validaciones basicas de entrada
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Email invalido" });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ success: false, error: "Password invalida" });
    }

    // Llama al servicio que verifica credenciales
    const user = await authService.login({
      email: email.trim().toLowerCase(),
      password,
    });

    // Genera token para devolver junto al usuario
    const token = signToken(user.id);

    return res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (err) {
    // Captura errores del servicio (credenciales invalidas) u otros
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error en login",
    });
  }
}

module.exports = {
  registro,
  login,
};
