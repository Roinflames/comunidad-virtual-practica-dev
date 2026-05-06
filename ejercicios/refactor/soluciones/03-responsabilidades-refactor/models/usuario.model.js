function crearUsuarioModel(db) {
  async function buscarPorEmail(email) {
    return db.get('SELECT id FROM usuarios WHERE email = ?', [email]);
  }

  async function crearUsuario(usuario) {
    return db.run(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [usuario.nombre, usuario.email, usuario.password]
    );
  }

  async function buscarUsuarioPublicoPorEmail(email) {
    return db.get(
      'SELECT id, nombre, email FROM usuarios WHERE email = ?',
      [email]
    );
  }

  return {
    buscarPorEmail,
    crearUsuario,
    buscarUsuarioPublicoPorEmail
  };
}

module.exports = {
  crearUsuarioModel
};
