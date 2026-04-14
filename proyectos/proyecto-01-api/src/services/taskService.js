// Importa el modelo de tareas desde src/models/taskModel.js
const taskModel = require("../models/taskModel");

// Lista tareas por usuario (usa el modelo)
async function list(userId) {
  return taskModel.findAllByUser(userId);
}

// Obtiene una tarea por id (valida pertenencia al usuario)
async function getById(id, userId) {
  const task = await taskModel.findByIdForUser(id, userId);
  if (!task) {
    const error = new Error("Tarea no encontrada");
    error.status = 404;
    throw error;
  }
  return task;
}

// Crea una tarea (delegado al modelo)
async function create({ titulo, descripcion, userId }) {
  return taskModel.createTask({ titulo, descripcion, userId });
}

// Actualiza una tarea (si no existe, lanza error)
async function update({ id, titulo, descripcion, completada, userId }) {
  const task = await taskModel.updateTask({
    id,
    titulo,
    descripcion,
    completada,
    userId,
  });
  if (!task) {
    const error = new Error("Tarea no encontrada");
    error.status = 404;
    throw error;
  }
  return task;
}

// Elimina una tarea (si no existe, lanza error)
async function remove(id, userId) {
  const deleted = await taskModel.deleteTask({ id, userId });
  if (!deleted) {
    const error = new Error("Tarea no encontrada");
    error.status = 404;
    throw error;
  }
  return deleted;
}

// Exporta las funciones del servicio para usarlas en el controller
module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
