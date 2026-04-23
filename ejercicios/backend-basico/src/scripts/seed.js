const { closeDatabase } = require("../db/database");
const { runMigrations, seedDatabase } = require("../db/init");

async function main() {
  await runMigrations();
  const seeded = await seedDatabase();

  if (seeded) {
    console.log("Datos de prueba insertados correctamente.");
    return;
  }

  console.log("La base ya tiene datos. No se insertaron registros de prueba.");
}

main()
  .catch((error) => {
    console.error("No fue posible insertar datos de prueba.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabase();
  });
