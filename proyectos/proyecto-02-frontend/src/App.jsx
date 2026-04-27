import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { getTasks, loginUser } from './services/api'

const STORAGE_TOKEN_KEY = 'wetodo_token'

function getTaskStatus(task) {
  if (task.estado === 'en-proceso') {
    return {
      label: 'En proceso',
      className: 'in-progress',
    }
  }

  if (task.completada) {
    return {
      label: 'Completada',
      className: 'done',
    }
  }

  return {
    label: 'Pendiente',
    className: 'pending',
  }
}

function App() {
  // Estado del formulario de acceso.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Estado de sesion y datos remotos.
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY) || '')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('Conecta el frontend con la API del proyecto 01.')

  const hasSession = Boolean(token)

  // Resumen rapido para mostrar progreso del tablero.
  const summary = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completada).length

    return {
      total,
      completed,
      pending: total - completed,
    }
  }, [tasks])

  // Si ya existe token guardado, intenta cargar tareas al entrar.
  useEffect(() => {
    if (!token) return
    loadTasks(token)
  }, [token])

  async function loadTasks(sessionToken) {
    setLoading(true)
    setError('')

    try {
      const data = await getTasks(sessionToken)
      setTasks(data)
      setInfoMessage(
        data.length
          ? 'Tus tareas se cargaron correctamente desde la API.'
          : 'No hay tareas todavia. La conexion con la API ya funciona.'
      )
    } catch (requestError) {
      const message = requestError.message || 'No se pudieron cargar las tareas.'
      setError(message)

      // Si el token no es valido, limpia la sesion para volver a login.
      if (requestError.status === 401) {
        closeSession()
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Debes completar email y password.')
      return
    }

    setLoading(true)
    setError('')
    setInfoMessage('Validando acceso con la API...')

    try {
      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      })

      localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
      setToken(data.token)
      setInfoMessage(`Sesion iniciada. Bienvenido, ${data.user.nombre}.`)
    } catch (requestError) {
      setError(requestError.message || 'No fue posible iniciar sesion.')
      setInfoMessage('Revisa tus credenciales e intentalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  function closeSession() {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    setToken('')
    setTasks([])
    setPassword('')
    setError('')
    setInfoMessage('Sesion cerrada. Puedes volver a ingresar cuando quieras.')
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Semana 6 · Frontend Basico</span>
          <h1>WeTodo</h1>
          <p className="hero-text">
            Primer frontend en React para consumir la API del proyecto 01 con una
            interfaz simple, limpia y lista para crecer en semana 7.
          </p>

          <div className="hero-pills">
            <span>React + Vite</span>
            <span>JWT en localStorage</span>
            <span>Consumo real de API</span>
          </div>
        </div>

        <div className="hero-card">
          <p className="card-label">Estado</p>
          <p className="hero-status">{loading ? 'Conectando...' : infoMessage}</p>
          <div className="stats-grid">
            <article className="stat-card stat-total">
              <strong>{summary.total}</strong>
              <span>Total</span>
            </article>
            <article className="stat-card stat-completed">
              <strong>{summary.completed}</strong>
              <span>Completadas</span>
            </article>
            <article className="stat-card stat-pending">
              <strong>{summary.pending}</strong>
              <span>Pendientes</span>
            </article>
          </div>
        </div>
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Acceso</p>
              <h2>Iniciar sesion</h2>
            </div>
            {hasSession ? (
              <button type="button" className="ghost-button" onClick={closeSession}>
                Cerrar sesion
              </button>
            ) : null}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="tu-correo@ejemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Procesando...' : 'Entrar a WeTodo'}
            </button>
          </form>

          {error ? <p className="feedback error">{error}</p> : null}
          {!error && hasSession ? (
            <p className="feedback success">Sesion activa. Ya puedes consultar tus tareas.</p>
          ) : null}
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Dashboard inicial</p>
              <h2>Mis tareas</h2>
            </div>
            {hasSession ? (
              <button
                type="button"
                className="ghost-button"
                onClick={() => loadTasks(token)}
                disabled={loading}
              >
                Recargar
              </button>
            ) : null}
          </div>

          {!hasSession ? (
            <div className="empty-state">
              <h3>Sin sesion iniciada</h3>
              <p>Haz login para consultar `GET /tareas` desde la API del proyecto 01.</p>
            </div>
          ) : loading ? (
            <div className="empty-state">
              <h3>Cargando tareas</h3>
              <p>Esperando respuesta del backend...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No hay tareas</h3>
              <p>Tu API respondio bien, pero todavia no existen tareas para este usuario.</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => {
                const status = getTaskStatus(task)

                return (
                  <li key={task.id} className={`task-item ${status.className}`}>
                    <div>
                      <p className="task-title">{task.titulo}</p>
                      <p className="task-description">
                        {task.descripcion || 'Sin descripcion'}
                      </p>
                    </div>
                    <span className={`task-badge ${status.className}`}>{status.label}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
