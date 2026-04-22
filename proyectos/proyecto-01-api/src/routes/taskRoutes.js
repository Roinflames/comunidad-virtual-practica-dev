const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Lista todas las tareas del usuario autenticado
router.get("/", taskController.list);
// Obtiene una tarea por id (solo si es del usuario)
router.get("/:id", taskController.getById);
// Crea una tarea nueva
router.post("/", taskController.create);
// Actualiza una tarea existente
router.put("/:id", taskController.update);
// Elimina una tarea
router.delete("/:id", taskController.remove);

module.exports = router;
