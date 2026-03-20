const tasks = [
  {
    id: 1,
    titulo: "Preparar entrega",
    completada: false
  }
];

let nextTaskId = 2;

function getTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id) || null;
}

function createTask(titulo, completada) {
  const task = {
    id: nextTaskId,
    titulo,
    completada
  };

  nextTaskId += 1;
  tasks.push(task);
  return task;
}

function updateTask(id, titulo, completada) {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  task.titulo = titulo;
  task.completada = completada;
  return task;
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
};
