// Importa Express para crear el servidor HTTP.
const express = require("express");

// Crea la app y define el puerto de escucha.
const app = express();
const port = 3000;

// Middleware para leer JSON en el body.
app.use(express.json());

// Almacen en memoria y contador incremental de IDs.
let nextId = 1;
const tareas = [];

// Endpoint de salud: sirve para verificar que el servidor esta activo.
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

// ==== Endpoints API: tareas ====

// Lista todas las tareas en memoria.
app.get("/tareas", (req, res) => {
  res.status(200).json({ success: true, data: tareas });
});

// Crea una nueva tarea.
app.post("/tareas", (req, res) => {
  const { titulo, descripcion } = req.body || {};
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({
      success: false,
      error: "El campo 'titulo' es obligatorio",
    });
  }

  const tarea = {
    id: nextId++,
    titulo: titulo.trim(),
    descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
    completada: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  tareas.push(tarea);
  return res.status(201).json({ success: true, data: tarea });
});

// Obtiene una tarea por ID.
app.get("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ success: false, error: "Tarea no encontrada" });
  }
  return res.status(200).json({ success: true, data: tarea });
});

// Actualiza una tarea existente.
app.put("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ success: false, error: "Tarea no encontrada" });
  }

  const { titulo, descripcion, completada } = req.body || {};
  if (titulo !== undefined && (typeof titulo !== "string" || !titulo.trim())) {
    return res.status(400).json({
      success: false,
      error: "El campo 'titulo' debe ser un texto no vacio",
    });
  }

  if (titulo !== undefined) tarea.titulo = titulo.trim();
  if (descripcion !== undefined) {
    tarea.descripcion = typeof descripcion === "string" ? descripcion.trim() : "";
  }
  if (completada !== undefined) tarea.completada = Boolean(completada);
  tarea.updated_at = new Date().toISOString();

  return res.status(200).json({ success: true, data: tarea });
});

// Elimina una tarea por ID.
app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Tarea no encontrada" });
  }

  const [deleted] = tareas.splice(index, 1);
  return res.status(200).json({ success: true, data: deleted });
});

// Levanta el servidor y queda escuchando en el puerto configurado.
app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});
