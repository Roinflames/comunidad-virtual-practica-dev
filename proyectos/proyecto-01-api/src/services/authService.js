const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const SALT_ROUNDS = 10;

// Registra un usuario nuevo (valida duplicado y hashea password)
async function register({ nombre, email, password }) {
  const existing = await userModel.findByEmail(email);
  if (existing) {
    const error = new Error("El email ya esta registrado");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.createUser({ nombre, email, passwordHash });
  return user;
}

// Verifica credenciales y devuelve datos de usuario si son correctas
async function login({ email, password }) {
  const user = await userModel.findByEmail(email);
  if (!user) {
    const error = new Error("Credenciales invalidas");
    error.status = 401;
    throw error;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const error = new Error("Credenciales invalidas");
    error.status = 401;
    throw error;
  }

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    created_at: user.created_at,
  };
}

module.exports = {
  register,
  login,
};
