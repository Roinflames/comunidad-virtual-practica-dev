function registrarRutasAuth(app, authController) {
  app.post('/registro', authController.registrarUsuario);
}

module.exports = {
  registrarRutasAuth
};
