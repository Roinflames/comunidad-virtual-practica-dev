// Importa el servicio de tareas desde src/services/taskService.js (logica de negocio)
const taskService = require("../services/taskService");

// Valida titulo minimo 2 caracteres
function validateTitulo(titulo) {
  return typeof titulo === "string" && titulo.trim().length >= 2;
}

// Descripcion opcional, pero si viene debe ser string
function validateDescripcion(descripcion) {
  return descripcion === undefined || typeof descripcion === "string";
}

// Completada opcional, pero si viene debe ser boolean
function validateCompletada(completada) {
  return completada === undefined || typeof completada === "boolean";
}

// Lista tareas del usuario autenticado
async function list(req, res) {
  try {
    const tasks = await taskService.list(req.user.id);
    return res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error al listar tareas",
    });
  }
}

// Obtiene una tarea por id (solo si es del usuario)
async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        error: "Id invalido",
      });
    }

    // Pide al servicio la tarea del usuario
    const task = await taskService.getById(id, req.user.id);
    // Responde con la tarea encontrada
    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    // Captura errores del servicio (ej: no encontrada) u otros
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error al obtener tarea",
    });
  }
}

// Crea una tarea nueva
async function create(req, res) {
  try {
    const { titulo, descripcion } = req.body;

    if (!validateTitulo(titulo)) {
      return res.status(400).json({
        success: false,
        error: "Titulo invalido",
      });
    }
    if (!validateDescripcion(descripcion)) {
      return res.status(400).json({
        success: false,
        error: "Descripcion invalida",
      });
    }

    const task = await taskService.create({
      titulo: titulo.trim(),
      descripcion: (descripcion || "").trim(),
      userId: req.user.id,
    });

    return res.status(201).json({ success: true, data: task });
  } catch (err) {
    // Captura errores del servicio u otros
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error al crear tarea",
    });
  }
}

// Actualiza una tarea existente
async function update(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        error: "Id invalido",
      });
    }

    const { titulo, descripcion, completada } = req.body;

    if (!validateTitulo(titulo)) {
      return res.status(400).json({
        success: false,
        error: "Titulo invalido",
      });
    }
    if (!validateDescripcion(descripcion)) {
      return res.status(400).json({
        success: false,
        error: "Descripcion invalida",
      });
    }
    if (!validateCompletada(completada)) {
      return res.status(400).json({
        success: false,
        error: "Completada invalida",
      });
    }

    const task = await taskService.update({
      id,
      titulo: titulo.trim(),
      descripcion: (descripcion || "").trim(),
      completada: completada === undefined ? false : completada,
      userId: req.user.id,
    });

    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error al actualizar tarea",
    });
  }
}

// Elimina una tarea
async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        error: "Id invalido",
      });
    }

    await taskService.remove(id, req.user.id);
    return res.status(200).json({ success: true, data: { id } });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      error: err.message || "Error al eliminar tarea",
    });
  }
}

// Exporta funciones del controller para usarlas en las rutas
module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
