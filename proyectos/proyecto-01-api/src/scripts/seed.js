const { seedDatabase } = require("../db/init");

seedDatabase()
  .then((seeded) => {
    if (seeded) {
      console.log("Seeds ejecutados correctamente.");
      return;
    }

    console.log("Seeds omitidos porque ya existen usuarios o no hay archivos de seed.");
  })
  .catch((error) => {
    console.error("No fue posible ejecutar seeds.", error);
    process.exit(1);
  });
