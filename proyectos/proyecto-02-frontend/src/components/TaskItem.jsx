function formatText(value, fallback) {
  return value && value.trim() ? value : fallback;
}

export default function TaskItem({ task, disabled, onToggle, onDelete }) {
  return (
    <li className={`task-card${task.completada ? " is-complete" : ""}`}>
      <div className="task-card-header">
        <div>
          <h4>{task.titulo}</h4>
          <p>{formatText(task.descripcion, "Sin descripcion.")}</p>
        </div>
        <span className="task-badge">{task.completada ? "Completada" : "Pendiente"}</span>
      </div>

      <div className="task-meta">
        <span>Creada: {new Date(task.created_at).toLocaleString("es-CL")}</span>
      </div>

      <div className="task-actions">
        <button className="task-action" type="button" disabled={disabled} onClick={onToggle}>
          {task.completada ? "Marcar pendiente" : "Marcar completada"}
        </button>
        <button
          className="task-action danger"
          type="button"
          disabled={disabled}
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
