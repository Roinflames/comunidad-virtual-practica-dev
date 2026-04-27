import { useState } from "react";
import TaskComposer from "../components/TaskComposer.jsx";
import TaskItem from "../components/TaskItem.jsx";

function validateTask(values) {
  const titulo = values.titulo.trim();
  const descripcion = values.descripcion.trim();

  if (!titulo) {
    throw new Error("El titulo es obligatorio.");
  }

  return {
    titulo,
    descripcion,
    completada: false
  };
}

export default function DashboardPage({
  user,
  tasks,
  taskSummary,
  loadingTasks,
  taskMutationPending,
  onRefresh,
  onLogout,
  onCreateTask,
  onToggleTask,
  onDeleteTask
}) {
  const [composerError, setComposerError] = useState("");

  const handleCreateTask = async (values, resetForm) => {
    setComposerError("");

    try {
      await onCreateTask(validateTask(values));
      resetForm();
    } catch (error) {
      setComposerError(error.message || "No fue posible crear la tarea.");
    }
  };

  return (
    <section>
      <header className="card dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Hola, {user.nombre}</h2>
          <p className="dashboard-copy">Administra tus tareas sin salir del navegador.</p>
        </div>
        <button className="ghost-button" type="button" onClick={onLogout}>
          Cerrar sesion
        </button>
      </header>

      <section className="dashboard-grid">
        <TaskComposer
          error={composerError}
          mutationPending={taskMutationPending}
          onSubmit={handleCreateTask}
        />

        <article className="card task-list-card">
          <div className="task-list-header">
            <div>
              <h3>Tus tareas</h3>
              <p>{taskSummary}</p>
            </div>
            <button className="ghost-button" type="button" onClick={onRefresh}>
              Recargar
            </button>
          </div>

          {loadingTasks ? <div className="inline-state">Cargando tareas...</div> : null}
          {!loadingTasks && tasks.length === 0 ? (
            <div className="inline-state">Todavia no tienes tareas.</div>
          ) : null}

          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                disabled={taskMutationPending}
                onToggle={() => onToggleTask(task)}
                onDelete={() => onDeleteTask(task)}
              />
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
