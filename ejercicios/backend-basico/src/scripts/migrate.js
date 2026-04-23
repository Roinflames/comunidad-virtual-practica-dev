const { closeDatabase } = require("../db/database");
const { runMigrations } = require("../db/init");

async function main() {
  await runMigrations();
  console.log("Migraciones ejecutadas correctamente.");
}

main()
  .catch((error) => {
    console.error("No fue posible ejecutar las migraciones.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabase();
  });
