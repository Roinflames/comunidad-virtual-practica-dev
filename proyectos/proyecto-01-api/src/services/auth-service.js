const { config } = require("../config/env");
const { createUser, findUserByEmail } = require("../models/user-model");
const { createToken, hashPassword, verifyPassword } = require("../utils/security");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeCredentials(payload, isRegister) {
  if (!payload || typeof payload !== "object") {
    return { error: "El body debe ser un JSON valido." };
  }

  const nombre = typeof payload.nombre === "string" ? payload.nombre.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  if (isRegister && nombre.length < 2) {
    return { error: "El campo 'nombre' es obligatorio y debe tener al menos 2 caracteres." };
  }

  if (!validateEmail(email)) {
    return { error: "El campo 'email' debe tener un formato valido." };
  }

  if (password.length < 8) {
    return { error: "El campo 'password' debe tener al menos 8 caracteres." };
  }

  return {
    data: {
      nombre,
      email,
      password
    }
  };
}

function buildAuthResponse(user) {
  const token = createToken(
    {
      sub: user.id,
      email: user.email
    },
    config.jwtSecret,
    config.jwtExpiresIn
  );

  return {
    usuario: user,
    token,
    expires_in: config.jwtExpiresIn
  };
}

async function registerUser(payload) {
  const normalized = normalizeCredentials(payload, true);

  if (normalized.error) {
    return { error: normalized.error, code: 400 };
  }

  const { nombre, email, password } = normalized.data;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return { error: "Ya existe un usuario con ese email.", code: 400 };
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(nombre, email, passwordHash);

  return {
    data: buildAuthResponse(user),
    code: 201
  };
}

async function loginUser(payload) {
  const normalized = normalizeCredentials(payload, false);

  if (normalized.error) {
    return { error: normalized.error, code: 400 };
  }

  const { email, password } = normalized.data;
  const userRow = await findUserByEmail(email);

  if (!userRow) {
    return { error: "Credenciales invalidas.", code: 401 };
  }

  const passwordIsValid = await verifyPassword(password, userRow.password_hash);

  if (!passwordIsValid) {
    return { error: "Credenciales invalidas.", code: 401 };
  }

  return {
    data: buildAuthResponse({
      id: userRow.id,
      nombre: userRow.nombre,
      email: userRow.email,
      created_at: userRow.created_at
    }),
    code: 200
  };
}

module.exports = {
  loginUser,
  registerUser
};
