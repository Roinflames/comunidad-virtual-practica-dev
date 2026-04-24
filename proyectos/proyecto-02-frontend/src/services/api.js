const API_BASE_URL = window.APP_CONFIG?.apiBaseUrl || "http://localhost:3000";

async function request(pathname, options = {}) {
  const token = localStorage.getItem("cv_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${pathname}`, {
      ...options,
      headers
    });
  } catch (_error) {
    const networkError = new Error(
      "No fue posible conectar con la API. Revisa que proyecto-01-api este levantado."
    );
    networkError.status = 0;
    throw networkError;
  }

  let payload = null;

  if (response.status === 204) {
    return null;
  }

  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.error || "No fue posible procesar la solicitud.");
    error.status = response.status;
    throw error;
  }

  return payload?.data;
}

function registerUser(body) {
  return request("/auth/registro", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

function loginUser(body) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

function getTasks() {
  return request("/tareas");
}

function createTask(body) {
  return request("/tareas", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

function updateTask(taskId, body) {
  return request(`/tareas/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });
}

function deleteTask(taskId) {
  return request(`/tareas/${taskId}`, {
    method: "DELETE"
  });
}

export {
  API_BASE_URL,
  createTask,
  deleteTask,
  getTasks,
  loginUser,
  registerUser,
  updateTask
};
