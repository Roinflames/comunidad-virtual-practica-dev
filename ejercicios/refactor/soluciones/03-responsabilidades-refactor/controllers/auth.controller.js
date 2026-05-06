function crearAuthController(authService) {
  async function registrarUsuario(req, res) {
    try {
      const usuarioCreado = await authService.registrarUsuario(req.body);
      return res.status(201).json({ success: true, data: usuarioCreado });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  return {
    registrarUsuario
  };
}

module.exports = {
  crearAuthController
};
