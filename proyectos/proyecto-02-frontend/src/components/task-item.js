function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createTaskItem(task) {
  const item = document.createElement("li");
  item.className = `task-card${task.completada ? " is-complete" : ""}`;
  item.dataset.taskId = String(task.id);

  item.innerHTML = `
    <div class="task-card-header">
      <div>
        <h4>${escapeHtml(task.titulo)}</h4>
        <p>${escapeHtml(task.descripcion || "Sin descripcion.")}</p>
      </div>
      <span class="task-badge">${task.completada ? "Completada" : "Pendiente"}</span>
    </div>
    <div class="task-meta">
      <span>Creada: ${new Date(task.created_at).toLocaleString("es-CL")}</span>
    </div>
    <div class="task-actions">
      <button class="task-action" data-action="toggle" type="button">
        ${task.completada ? "Marcar pendiente" : "Marcar completada"}
      </button>
      <button class="task-action danger" data-action="delete" type="button">Eliminar</button>
    </div>
  `;

  return item;
}

export { createTaskItem };
