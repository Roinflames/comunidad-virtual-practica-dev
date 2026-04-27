export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function request(pathname, options = {}, token) {
  const headers = {
    ...(options.headers || {})
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

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

  if (response.status === 204) {
    return null;
  }

  let payload = null;

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

export function registerUser(body) {
  return request("/auth/registro", { method: "POST", body: JSON.stringify(body) });
}

export function loginUser(body) {
  return request("/auth/login", { method: "POST", body: JSON.stringify(body) });
}

export function getTasks(token) {
  return request("/tareas", {}, token);
}

export function createTask(body, token) {
  return request("/tareas", { method: "POST", body: JSON.stringify(body) }, token);
}

export function updateTask(taskId, body, token) {
  return request(`/tareas/${taskId}`, { method: "PUT", body: JSON.stringify(body) }, token);
}

export function deleteTask(taskId, token) {
  return request(`/tareas/${taskId}`, { method: "DELETE" }, token);
}
