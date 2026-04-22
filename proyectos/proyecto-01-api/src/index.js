const { createApp } = require("./app");
const { config } = require("./config/env");
const { databasePath } = require("./db/database");
const { initializeDatabase } = require("./db/init");

const app = createApp();

async function startServer() {
  await initializeDatabase();

  app.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
    console.log(`Base de datos SQLite: ${databasePath}`);

    if (!config.hasCustomJwtSecret) {
      console.warn("Advertencia: estas usando el JWT_SECRET por defecto. Configura .env antes de usar esta API fuera de desarrollo.");
    }
  });
}

startServer().catch((error) => {
  console.error("No fue posible iniciar el servidor.", error);
  process.exit(1);
});
