const { runMigrations } = require("../db/init");

runMigrations()
  .then(() => {
    console.log("Migraciones ejecutadas correctamente.");
  })
  .catch((error) => {
    console.error("No fue posible ejecutar migraciones.", error);
    process.exit(1);
  });
