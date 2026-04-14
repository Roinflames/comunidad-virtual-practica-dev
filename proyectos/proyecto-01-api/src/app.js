const express = require("express");
const dotenv = require("dotenv");

// Carga variables de entorno desde .env (antes de importar modulos que usan process.env)
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware para parsear JSON en req.body
app.use(express.json());

// Rutas de autenticacion (registro/login)
app.use("/auth", authRoutes);
// Rutas de tareas protegidas por JWT:
// primero pasa por authMiddleware (verifica token) y luego entra a taskRoutes
app.use("/tareas", authMiddleware, taskRoutes);

// Endpoint simple para verificar que el servidor responde
app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

module.exports = app;
