const app = require("./app"); // Importa la app Express desde app.js

const PORT = process.env.PORT || 3000; // Usa PORT del .env o 3000 por defecto

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`); // Log de inicio del servidor
});
