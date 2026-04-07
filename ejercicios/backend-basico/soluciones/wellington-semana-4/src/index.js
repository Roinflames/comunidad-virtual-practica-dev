const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

// Semana 4: helper para obtener una tarea desde la BD.
async function getTareaById(id) {
  const result = await db.query("SELECT * FROM tareas WHERE id = $1", [id]);
  return result.rows[0] || null;
}

// Semana 4: healthcheck con verificacion de BD.
app.get("/health", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    res.status(200).json({ success: true, data: { status: "ok", db: "ok" } });
  } catch (_error) {
    res.status(500).json({ success: false, error: "DB no disponible" });
  }
});

// Semana 4: listado persistente via SELECT.
app.get("/tareas", async (_req, res) => {
  const result = await db.query("SELECT * FROM tareas ORDER BY id ASC");
  res.status(200).json({ success: true, data: result.rows });
});

// Semana 4: creacion persistente via INSERT.
app.post("/tareas", async (req, res) => {
  const { titulo, descripcion } = req.body || {};
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({
      success: false,
      error: "El campo 'titulo' es obligatorio",
    });
  }

  const result = await db.query(
    "INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *",
    [titulo.trim(), typeof descripcion === "string" ? descripcion.trim() : ""]
  );
  return res.status(201).json({ success: true, data: result.rows[0] });
});

// Semana 4: lectura persistente via SELECT por id.
app.get("/tareas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tarea = await getTareaById(id);
  if (!tarea) return res.status(404).json({ success: false, error: "Tarea no encontrada" });
  return res.status(200).json({ success: true, data: tarea });
});

// Semana 4: actualizacion persistente via UPDATE.
app.put("/tareas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tarea = await getTareaById(id);
  if (!tarea) return res.status(404).json({ success: false, error: "Tarea no encontrada" });

  const { titulo, descripcion, completada } = req.body || {};
  if (titulo !== undefined && (typeof titulo !== "string" || !titulo.trim())) {
    return res.status(400).json({
      success: false,
      error: "El campo 'titulo' debe ser un texto no vacio",
    });
  }

  const newTitulo = titulo !== undefined ? titulo.trim() : tarea.titulo;
  const newDescripcion =
    descripcion !== undefined ? (typeof descripcion === "string" ? descripcion.trim() : "") : tarea.descripcion;
  const newCompletada = completada !== undefined ? Boolean(completada) : tarea.completada;

  const result = await db.query(
    "UPDATE tareas SET titulo = $1, descripcion = $2, completada = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
    [newTitulo, newDescripcion, newCompletada, id]
  );

  return res.status(200).json({ success: true, data: result.rows[0] });
});

// Semana 4: eliminacion persistente via DELETE.
app.delete("/tareas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.query("DELETE FROM tareas WHERE id = $1 RETURNING *", [id]);
  if (!result.rows[0]) return res.status(404).json({ success: false, error: "Tarea no encontrada" });

  return res.status(200).json({ success: true, data: result.rows[0] });
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});
