import { useMemo, useState } from "react";
import FeedbackBanner from "./components/FeedbackBanner.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { useTasks } from "./hooks/useTasks.js";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { API_BASE_URL } from "./services/api.js";

export default function App() {
  const [feedback, setFeedback] = useState(null);
  const { user, token, login, register, logout, clearAuth } = useAuth();

  const handleUnauthorized = () => {
    clearAuth();
    setFeedback({
      type: "error",
      message: "Tu sesion expiro o el token ya no es valido. Vuelve a iniciar sesion."
    });
  };

  const {
    tasks,
    loadingTasks,
    taskMutationPending,
    loadTasks,
    addTask,
    toggleTask,
    removeTask
  } = useTasks({
    token,
    onUnauthorized: handleUnauthorized
  });

  const taskSummary = useMemo(() => {
    if (loadingTasks) {
      return "Consultando la API...";
    }

    return `${tasks.length} tarea${tasks.length === 1 ? "" : "s"} encontradas`;
  }, [loadingTasks, tasks.length]);

  const handleLogin = async (payload) => {
    const authData = await login(payload);
    setFeedback({ type: "success", message: "Sesion iniciada correctamente." });
    await loadTasks(authData.token);
  };

  const handleRegister = async (payload) => {
    const authData = await register(payload);
    setFeedback({ type: "success", message: "Cuenta creada. Ya puedes administrar tus tareas." });
    await loadTasks(authData.token);
  };

  const handleCreateTask = async (payload) => {
    await addTask(payload);
    setFeedback({ type: "success", message: "Tarea creada correctamente." });
  };

  const handleToggleTask = async (task) => {
    await toggleTask(task);
    setFeedback({ type: "success", message: "Estado de la tarea actualizado." });
  };

  const handleDeleteTask = async (task) => {
    await removeTask(task.id);
    setFeedback({ type: "success", message: "Tarea eliminada." });
  };

  const handleRefresh = async () => {
    await loadTasks();
    setFeedback(null);
  };

  const handleLogout = () => {
    logout();
    setFeedback({ type: "success", message: "Sesion cerrada." });
  };

  return (
    <div className="page-shell">
      <aside className="hero-panel">
        <p className="eyebrow">Semana 7</p>
        <h1>Proyecto frontend completo para tu API de tareas</h1>
        <p className="hero-copy">
          React + Vite para registrar usuarios, iniciar sesion y gestionar tareas con una
          estructura preparada para code review.
        </p>
        <div className="hero-status">
          <span className="status-label">API objetivo</span>
          <code>{API_BASE_URL}</code>
        </div>
      </aside>

      <main className="app-panel">
        <FeedbackBanner feedback={feedback} onClose={() => setFeedback(null)} />

        {!user ? (
          <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
        ) : (
          <DashboardPage
            user={user}
            tasks={tasks}
            taskSummary={taskSummary}
            loadingTasks={loadingTasks}
            taskMutationPending={taskMutationPending}
            onRefresh={handleRefresh}
            onLogout={handleLogout}
            onCreateTask={handleCreateTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}
