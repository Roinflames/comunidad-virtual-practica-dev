const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Centraliza el tratamiento de respuestas para no repetir logica en componentes.
async function parseResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(payload?.error || 'La API devolvio un error.')
    error.status = response.status
    throw error
  }

  return payload?.data
}

// Inicia sesion y devuelve usuario + token JWT.
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  return parseResponse(response)
}

// Obtiene las tareas del usuario autenticado usando Bearer token.
export async function getTasks(token) {
  const response = await fetch(`${API_BASE_URL}/tareas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return parseResponse(response)
}
