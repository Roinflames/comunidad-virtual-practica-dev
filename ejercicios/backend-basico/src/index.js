const { createApp } = require("./app");
const { databasePath } = require("./db/database");
const { initializeDatabase } = require("./db/init");

const PORT = 3000;
const app = createApp();

async function startServer() {
  const seeded = await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Base de datos SQLite: ${databasePath}`);

    if (seeded) {
      console.log("Se cargaron datos de prueba iniciales una sola vez.");
    }
  });
}

startServer().catch((error) => {
  console.error("No fue posible iniciar el servidor.", error);
  process.exit(1);
});
