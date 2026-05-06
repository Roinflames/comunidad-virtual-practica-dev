const crypto = require('crypto');

function crearError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function crearAuthService(usuarioModel) {
  async function registrarUsuario(datosRegistro) {
    const { nombre, email, password } = datosRegistro;

    if (!nombre || !email || !password) {
      throw crearError('Faltan campos', 400);
    }

    if (!email.includes('@')) {
      throw crearError('Email invalido', 400);
    }

    if (password.length < 8) {
      throw crearError('Password muy corto', 400);
    }

    const usuarioExistente = await usuarioModel.buscarPorEmail(email);
    if (usuarioExistente) {
      throw crearError('Email ya registrado', 409);
    }

    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    await usuarioModel.crearUsuario({
      nombre: nombre,
      email: email,
      password: passwordHash
    });

    return usuarioModel.buscarUsuarioPublicoPorEmail(email);
  }

  return {
    registrarUsuario
  };
}

module.exports = {
  crearAuthService
};
