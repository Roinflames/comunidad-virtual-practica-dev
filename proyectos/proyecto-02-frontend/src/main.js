import {
  API_BASE_URL,
  createTask,
  deleteTask,
  getTasks,
  loginUser,
  registerUser,
  updateTask
} from "./services/api.js";
import { createTaskItem } from "./components/task-item.js";
import { clearSession, hasToken, readUser, saveSession } from "./utils/storage.js";

const state = {
  authMode: "login",
  tasks: [],
  loadingTasks: false
};

const elements = {
  apiBaseUrl: document.querySelector("#api-base-url"),
  feedbackBanner: document.querySelector("#feedback-banner"),
  authView: document.querySelector("#auth-view"),
  dashboardView: document.querySelector("#dashboard-view"),
  authTitle: document.querySelector("#auth-title"),
  authSubtitle: document.querySelector("#auth-subtitle"),
  authForm: document.querySelector("#auth-form"),
  authSubmit: document.querySelector("#auth-submit"),
  authName: document.querySelector("#auth-name"),
  nameField: document.querySelector("#name-field"),
  authEmail: document.querySelector("#auth-email"),
  authPassword: document.querySelector("#auth-password"),
  dashboardUser: document.querySelector("#dashboard-user"),
  logoutButton: document.querySelector("#logout-button"),
  taskForm: document.querySelector("#task-form"),
  taskTitle: document.querySelector("#task-title"),
  taskDescription: document.querySelector("#task-description"),
  taskSubmit: document.querySelector("#task-submit"),
  taskList: document.querySelector("#task-list"),
  taskEmpty: document.querySelector("#task-empty"),
  taskLoading: document.querySelector("#task-loading"),
  taskSummary: document.querySelector("#task-summary"),
  refreshButton: document.querySelector("#refresh-button"),
  tabs: Array.from(document.querySelectorAll(".tab-button"))
};

function setFeedback(message, type = "success") {
  elements.feedbackBanner.textContent = message;
  elements.feedbackBanner.className = `feedback-banner ${type}`;
}

function clearFeedback() {
  elements.feedbackBanner.textContent = "";
  elements.feedbackBanner.className = "feedback-banner hidden";
}

function setAuthMode(mode) {
  state.authMode = mode;

  for (const tab of elements.tabs) {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  }

  const isRegister = mode === "register";
  elements.nameField.classList.toggle("hidden", !isRegister);
  elements.authName.required = isRegister;
  elements.authTitle.textContent = isRegister ? "Crea tu cuenta" : "Inicia sesion";
  elements.authSubtitle.textContent = isRegister
    ? "Registrate y entra directo a tu tablero."
    : "Usa tu cuenta del proyecto 01 para entrar al dashboard.";
  elements.authSubmit.textContent = isRegister ? "Registrarme" : "Entrar";
}

function validateAuthForm() {
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value;
  const name = elements.authName.value.trim();

  if (state.authMode === "register" && name.length < 2) {
    throw new Error("El nombre debe tener al menos 2 caracteres.");
  }

  if (!email.includes("@")) {
    throw new Error("Debes ingresar un email valido.");
  }

  if (password.length < 8) {
    throw new Error("La password debe tener al menos 8 caracteres.");
  }

  return {
    nombre: name,
    email,
    password
  };
}

function validateTaskForm() {
  const titulo = elements.taskTitle.value.trim();
  const descripcion = elements.taskDescription.value.trim();

  if (!titulo) {
    throw new Error("El titulo es obligatorio.");
  }

  return {
    titulo,
    descripcion,
    completada: false
  };
}

function renderAuthView() {
  elements.authView.classList.remove("hidden");
  elements.dashboardView.classList.add("hidden");
}

function renderDashboardView() {
  const user = readUser();
  elements.dashboardUser.textContent = user ? `Hola, ${user.nombre}` : "Hola";
  elements.authView.classList.add("hidden");
  elements.dashboardView.classList.remove("hidden");
}

function renderTasks() {
  elements.taskList.innerHTML = "";
  elements.taskLoading.classList.toggle("hidden", !state.loadingTasks);
  elements.taskEmpty.classList.toggle("hidden", state.loadingTasks || state.tasks.length > 0);
  elements.taskSummary.textContent = state.loadingTasks
    ? "Consultando la API..."
    : `${state.tasks.length} tarea${state.tasks.length === 1 ? "" : "s"} encontradas`;

  for (const task of state.tasks) {
    elements.taskList.appendChild(createTaskItem(task));
  }
}

async function loadTasks() {
  state.loadingTasks = true;
  renderTasks();

  try {
    state.tasks = await getTasks();
    clearFeedback();
  } catch (error) {
    if (error.status === 401) {
      handleUnauthorized();
      return;
    }

    setFeedback(error.message || "No fue posible cargar las tareas.", "error");
    state.tasks = [];
  } finally {
    state.loadingTasks = false;
    renderTasks();
  }
}

function handleUnauthorized() {
  clearSession();
  state.tasks = [];
  renderTasks();
  renderAuthView();
  setAuthMode("login");
  setFeedback("Tu sesion expiro o el token ya no es valido. Vuelve a iniciar sesion.", "error");
}

async function onSubmitAuth(event) {
  event.preventDefault();
  clearFeedback();
  elements.authSubmit.disabled = true;

  try {
    const payload = validateAuthForm();
    const authData =
      state.authMode === "register" ? await registerUser(payload) : await loginUser(payload);

    saveSession(authData);
    elements.authForm.reset();
    renderDashboardView();
    setFeedback(
      state.authMode === "register"
        ? "Cuenta creada. Ya puedes administrar tus tareas."
        : "Sesion iniciada correctamente.",
      "success"
    );
    await loadTasks();
  } catch (error) {
    setFeedback(error.message || "No fue posible autenticarte.", "error");
  } finally {
    elements.authSubmit.disabled = false;
  }
}

async function onSubmitTask(event) {
  event.preventDefault();
  clearFeedback();
  elements.taskSubmit.disabled = true;

  try {
    const payload = validateTaskForm();
    await createTask(payload);
    elements.taskForm.reset();
    setFeedback("Tarea creada correctamente.", "success");
    await loadTasks();
  } catch (error) {
    if (error.status === 401) {
      handleUnauthorized();
      return;
    }

    setFeedback(error.message || "No fue posible crear la tarea.", "error");
  } finally {
    elements.taskSubmit.disabled = false;
  }
}

async function onTaskAction(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const card = event.target.closest("[data-task-id]");

  if (!card) {
    return;
  }

  const taskId = Number(card.dataset.taskId);
  const task = state.tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  button.disabled = true;
  clearFeedback();

  try {
    if (button.dataset.action === "toggle") {
      await updateTask(taskId, {
        titulo: task.titulo,
        descripcion: task.descripcion || "",
        completada: !task.completada
      });
      setFeedback("Estado de la tarea actualizado.", "success");
    }

    if (button.dataset.action === "delete") {
      await deleteTask(taskId);
      setFeedback("Tarea eliminada.", "success");
    }

    await loadTasks();
  } catch (error) {
    if (error.status === 401) {
      handleUnauthorized();
      return;
    }

    setFeedback(error.message || "No fue posible actualizar la tarea.", "error");
  } finally {
    button.disabled = false;
  }
}

function onLogout() {
  clearSession();
  state.tasks = [];
  renderTasks();
  renderAuthView();
  setAuthMode("login");
  setFeedback("Sesion cerrada.", "success");
}

function bindEvents() {
  for (const tab of elements.tabs) {
    tab.addEventListener("click", () => {
      clearFeedback();
      setAuthMode(tab.dataset.mode);
    });
  }

  elements.authForm.addEventListener("submit", onSubmitAuth);
  elements.taskForm.addEventListener("submit", onSubmitTask);
  elements.taskList.addEventListener("click", onTaskAction);
  elements.logoutButton.addEventListener("click", onLogout);
  elements.refreshButton.addEventListener("click", loadTasks);
}

async function initialize() {
  elements.apiBaseUrl.textContent = API_BASE_URL;
  bindEvents();
  setAuthMode("login");

  if (hasToken()) {
    renderDashboardView();
    await loadTasks();
    return;
  }

  renderAuthView();
  renderTasks();
}

initialize();
