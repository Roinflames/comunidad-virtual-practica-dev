import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  createTask,
  deleteTask,
  getTasks,
  loginUser,
  registerUser,
  updateTask,
} from './services/api'

const STORAGE_TOKEN_KEY = 'wetodo_token'
const STORAGE_USER_KEY = 'wetodo_user'
const STORAGE_DELETED_COUNT_KEY = 'wetodo_deleted_count'

function getTaskStatus(task) {
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
  const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY) || ''
  const storedUser = localStorage.getItem(STORAGE_USER_KEY)
  const storedDeletedCount = Number(localStorage.getItem(STORAGE_DELETED_COUNT_KEY) || '0')

  // Estado del formulario de acceso.
  const [authMode, setAuthMode] = useState('login')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Estado de sesion y datos remotos.
  const [token, setToken] = useState(storedToken)
  const [currentUser, setCurrentUser] = useState(() => {
    if (!storedUser) return null

    try {
      return JSON.parse(storedUser)
    } catch {
      return null
    }
  })
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(Boolean(storedToken))
  const [taskSubmitting, setTaskSubmitting] = useState(false)
  const [taskActionId, setTaskActionId] = useState(null)
  const [deletedCount, setDeletedCount] = useState(storedDeletedCount)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingDescription, setEditingDescription] = useState('')
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
      deleted: deletedCount,
    }
  }, [deletedCount, tasks])

  const sessionName = currentUser?.nombre?.trim() || currentUser?.email?.split('@')?.[0] || ''
  const sessionInitial = (sessionName || 'S').slice(0, 1).toUpperCase()
  const sessionHeading = sessionName
    ? `Sesion iniciada. Usuario: ${sessionName}`
    : 'Sesion iniciada'
  const pendingTasks = tasks.filter((task) => !task.completada)
  const completedTasks = tasks.filter((task) => task.completada)

  function resetAuthForm() {
    setNombre('')
    setEmail('')
    setPassword('')
  }

  function changeAuthMode(nextMode) {
    setAuthMode(nextMode)
    setError('')
    setInfoMessage(
      nextMode === 'login'
        ? 'Ingresa con tu cuenta para cargar tus tareas.'
        : 'Crea una cuenta nueva para empezar a usar WeTodo.'
    )
  }

  async function loadTasks(sessionToken) {
    setLoading(true)
    setError('')

    try {
      const data = await getTasks(sessionToken)
      setTasks(data)
      setInfoMessage(data.length ? 'Tus tareas estan al dia.' : 'No hay tareas todavia.')
    } catch (requestError) {
      const message = requestError.message || 'No se pudieron cargar las tareas.'
      setError(message)

      // Si el token no es valido, limpia la sesion para volver a login.
      if (requestError.status === 401) {
        closeSession()
        setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Si ya existe token guardado, intenta cargar tareas al entrar.
  useEffect(() => {
    if (!token) return
    let cancelled = false

    async function syncTasks() {
      try {
        const data = await getTasks(token)
        if (cancelled) return

        setTasks(data)
        setInfoMessage(data.length ? 'Tus tareas estan al dia.' : 'No hay tareas todavia.')
      } catch (requestError) {
        if (cancelled) return

        const message = requestError.message || 'No se pudieron cargar las tareas.'
        setError(message)

        if (requestError.status === 401) {
          closeSession()
          setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    syncTasks()

    return () => {
      cancelled = true
    }
  }, [token])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Debes completar email y password.')
      return
    }

    if (authMode === 'register' && nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.')
      return
    }

    setLoading(true)
    setError('')
    setInfoMessage(
      authMode === 'login'
        ? 'Validando acceso con la API...'
        : 'Creando tu cuenta en la API...'
    )

    try {
      const payload = {
        email: email.trim().toLowerCase(),
        password,
      }
      const data =
        authMode === 'login'
          ? await loginUser(payload)
          : await registerUser({
              nombre: nombre.trim(),
              ...payload,
            })

      localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(data.user))
      setToken(data.token)
      setCurrentUser(data.user)
      setInfoMessage(`Sesion iniciada. Bienvenido, ${data.user.nombre}.`)
      resetAuthForm()
    } catch (requestError) {
      setError(
        requestError.message ||
          (authMode === 'login'
            ? 'No fue posible iniciar sesion.'
            : 'No fue posible crear la cuenta.')
      )
      setInfoMessage(
        authMode === 'login'
          ? 'Revisa tus credenciales e intentalo de nuevo.'
          : 'Corrige los datos del registro e intentalo otra vez.'
      )
    } finally {
      setLoading(false)
    }
  }

  function closeSession() {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem(STORAGE_DELETED_COUNT_KEY)
    setToken('')
    setCurrentUser(null)
    setTasks([])
    setTaskTitle('')
    setTaskDescription('')
    setDeletedCount(0)
    setPassword('')
    setError('')
    setInfoMessage('Sesion cerrada. Puedes volver a ingresar cuando quieras.')
  }

  async function handleCreateTask(event) {
    event.preventDefault()

    if (!token) {
      setError('Debes iniciar sesion antes de crear tareas.')
      return
    }

    if (taskTitle.trim().length < 2) {
      setError('El titulo debe tener al menos 2 caracteres.')
      return
    }

    setTaskSubmitting(true)
    setError('')
    setInfoMessage('Creando tarea en la API...')

    try {
      const newTask = await createTask(token, {
        titulo: taskTitle.trim(),
        descripcion: taskDescription.trim(),
      })

      setTasks((currentTasks) => [newTask, ...currentTasks])
      setTaskTitle('')
      setTaskDescription('')
      setInfoMessage('La tarea se creo correctamente.')
    } catch (requestError) {
      if (requestError.status === 401) {
        closeSession()
        setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
        return
      }

      setError(requestError.message || 'No se pudo crear la tarea.')
    } finally {
      setTaskSubmitting(false)
    }
  }

  async function handleToggleTask(task) {
    setTaskActionId(task.id)
    setError('')
    setInfoMessage('Actualizando estado de la tarea...')

    try {
      const updatedTask = await updateTask(token, task.id, {
        completada: !task.completada,
      })

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id ? updatedTask : currentTask
        )
      )
      setInfoMessage('El estado de la tarea se actualizo correctamente.')
    } catch (requestError) {
      if (requestError.status === 401) {
        closeSession()
        setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
        return
      }

      setError(requestError.message || 'No se pudo actualizar la tarea.')
    } finally {
      setTaskActionId(null)
    }
  }

  async function handleDeleteTask(taskId) {
    setTaskActionId(taskId)
    setError('')
    setInfoMessage('Eliminando tarea...')

    try {
      await deleteTask(token, taskId)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
      setDeletedCount((currentCount) => {
        const nextCount = currentCount + 1
        localStorage.setItem(STORAGE_DELETED_COUNT_KEY, String(nextCount))
        return nextCount
      })
      setInfoMessage('La tarea se elimino correctamente.')
    } catch (requestError) {
      if (requestError.status === 401) {
        closeSession()
        setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
        return
      }

      setError(requestError.message || 'No se pudo eliminar la tarea.')
    } finally {
      setTaskActionId(null)
    }
  }

  function startEditingTask(task) {
    setEditingTaskId(task.id)
    setEditingTitle(task.titulo)
    setEditingDescription(task.descripcion || '')
    setError('')
    setInfoMessage(`Editando "${task.titulo}".`)
  }

  function cancelEditingTask() {
    setEditingTaskId(null)
    setEditingTitle('')
    setEditingDescription('')
    setInfoMessage('Edicion cancelada.')
  }

  async function handleSaveTask(taskId) {
    if (editingTitle.trim().length < 2) {
      setError('El titulo editado debe tener al menos 2 caracteres.')
      return
    }

    setTaskActionId(taskId)
    setError('')
    setInfoMessage('Guardando cambios de la tarea...')

    try {
      const updatedTask = await updateTask(token, taskId, {
        titulo: editingTitle.trim(),
        descripcion: editingDescription.trim(),
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task))
      )
      setEditingTaskId(null)
      setEditingTitle('')
      setEditingDescription('')
      setInfoMessage('La tarea se actualizo correctamente.')
    } catch (requestError) {
      if (requestError.status === 401) {
        closeSession()
        setInfoMessage('La sesion vencio o no es valida. Vuelve a iniciar sesion.')
        return
      }

      setError(requestError.message || 'No se pudo guardar la tarea.')
    } finally {
      setTaskActionId(null)
    }
  }

  function renderTaskCard(task) {
    const status = getTaskStatus(task)
    const isEditing = editingTaskId === task.id

    return (
      <li key={task.id} className={`task-item ${status.className}`}>
        <div className="task-main">
          <div className="task-topline">
            {isEditing ? (
              <input
                className="task-inline-input"
                type="text"
                value={editingTitle}
                onChange={(event) => setEditingTitle(event.target.value)}
              />
            ) : (
              <p className="task-title">{task.titulo}</p>
            )}
            <span className={`task-badge ${status.className}`}>{status.label}</span>
          </div>

          {isEditing ? (
            <textarea
              className="task-inline-textarea"
              value={editingDescription}
              onChange={(event) => setEditingDescription(event.target.value)}
              rows="3"
            />
          ) : (
            <p className="task-description">{task.descripcion || 'Sin descripcion'}</p>
          )}

          <div className="task-meta">
            <span>{task.completada ? 'Completada' : 'Pendiente de completar'}</span>
          </div>
        </div>

        <div className="task-actions" aria-label={`Acciones para ${task.titulo}`}>
          {isEditing ? (
            <>
              <button
                type="button"
                className="task-action-button primary"
                onClick={() => handleSaveTask(task.id)}
                disabled={taskActionId === task.id}
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="task-action-button neutral"
                onClick={cancelEditingTask}
                disabled={taskActionId === task.id}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="task-action-button neutral"
                onClick={() => startEditingTask(task)}
                disabled={taskActionId === task.id}
              >
                Editar
              </button>
              <button
                type="button"
                className="task-action-button secondary"
                onClick={() => handleToggleTask(task)}
                disabled={taskActionId === task.id}
              >
                {task.completada ? 'Mover a pendiente' : 'Mover a completada'}
              </button>
              <button
                type="button"
                className="task-action-button danger"
                onClick={() => handleDeleteTask(task.id)}
                disabled={taskActionId === task.id}
              >
                Quitar tarea
              </button>
            </>
          )}
        </div>
      </li>
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Semana 7 · Proyecto 02 Frontend</span>
          <h1>WeTodo</h1>
          <p className="hero-text">
            Frontend en React para gestionar tareas del proyecto 01 con sesion,
            tablero visual y flujo completo de trabajo para semana 7.
          </p>

          {hasSession ? (
            <div className="session-banner">
              <span className="session-avatar">{sessionInitial}</span>
              <div>
                <strong>{sessionHeading}</strong>
                <p>{currentUser?.email || 'Sesion guardada en este navegador.'}</p>
              </div>
            </div>
          ) : null}

          <div className="hero-pills">
            <span>React + Vite</span>
            <span>JWT en localStorage</span>
            <span>Consumo real de API</span>
          </div>
        </div>

        <div className="hero-card">
          <p className="card-label">Resumen Del Workspace</p>
          {hasSession ? (
            <p className="hero-owner">{sessionHeading}</p>
          ) : null}
          <p className="hero-status compact">{loading ? 'Conectando...' : infoMessage}</p>
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
            <article className="stat-card stat-deleted">
              <strong>{summary.deleted}</strong>
              <span>Eliminadas</span>
            </article>
          </div>
        </div>
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Acceso</p>
              <h2>
                {hasSession
                  ? sessionName
                    ? sessionHeading
                    : 'Sesion iniciada'
                  : authMode === 'login'
                    ? 'Iniciar sesion'
                    : 'Crear cuenta'}
              </h2>
              {hasSession ? (
                <p className="panel-subtitle">
                  {currentUser?.email || 'Vuelve a iniciar sesion para mostrar tu nombre completo.'}
                </p>
              ) : null}
            </div>
            {hasSession ? (
              <button type="button" className="ghost-button" onClick={closeSession}>
                Cerrar sesion
              </button>
            ) : null}
          </div>

          {hasSession ? (
            <div className="session-panel">
              <div className="session-panel-card">
                <span className="session-avatar large">{sessionInitial}</span>
                <div>
                  <strong>{sessionHeading}</strong>
                  <p>
                    {currentUser?.email || 'Vuelve a iniciar sesion para mostrar tu nombre completo.'}
                  </p>
                </div>
              </div>

              <div className="session-highlights">
                <article>
                  <span>Perfil activo</span>
                  <strong>Usuario principal</strong>
                </article>
                <article>
                  <span>Tareas activas</span>
                  <strong>{summary.total}</strong>
                </article>
                <article>
                  <span>Tareas eliminadas</span>
                  <strong>{summary.deleted}</strong>
                </article>
              </div>
            </div>
          ) : (
            <>
              <div className="auth-tabs" aria-label="Cambiar entre login y registro">
                <button
                  type="button"
                  className={authMode === 'login' ? 'tab-button active' : 'tab-button'}
                  onClick={() => changeAuthMode('login')}
                  disabled={loading}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={authMode === 'register' ? 'tab-button active' : 'tab-button'}
                  onClick={() => changeAuthMode('register')}
                  disabled={loading}
                >
                  Registro
                </button>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                {authMode === 'register' ? (
                  <label>
                    <span>Nombre</span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                    />
                  </label>
                ) : null}

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
                  {loading
                    ? 'Procesando...'
                    : authMode === 'login'
                      ? 'Entrar a WeTodo'
                      : 'Crear cuenta y entrar'}
                </button>
              </form>
            </>
          )}

          {error ? <p className="feedback error">{error}</p> : null}
          {!error && hasSession ? (
            <p className="feedback success">Sesion activa. Ya puedes consultar tus tareas.</p>
          ) : null}
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Dashboard</p>
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

          {hasSession ? (
            <form className="task-form" onSubmit={handleCreateTask}>
              <label>
                <span>Titulo</span>
                <input
                  type="text"
                  placeholder="Ej: Preparar entrega semana 7"
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                />
              </label>

              <label>
                <span>Descripcion</span>
                <textarea
                  placeholder="Agrega un detalle opcional"
                  value={taskDescription}
                  onChange={(event) => setTaskDescription(event.target.value)}
                  rows="3"
                />
              </label>

              <button type="submit" className="primary-button" disabled={taskSubmitting}>
                {taskSubmitting ? 'Guardando...' : 'Agregar tarea'}
              </button>
            </form>
          ) : null}

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
            <div className="board-columns">
              <section className="board-column">
                <div className="board-column-head pending">
                  <div>
                    <p className="board-column-kicker">Pendientes</p>
                    <h3>Pendientes</h3>
                  </div>
                  <span className="board-column-count">
                    {pendingTasks.length} {pendingTasks.length === 1 ? 'tarea' : 'tareas'}
                  </span>
                </div>
                {pendingTasks.length === 0 ? (
                  <div className="board-empty">
                    <p>No hay tareas pendientes.</p>
                  </div>
                ) : (
                  <ul className="task-list">{pendingTasks.map(renderTaskCard)}</ul>
                )}
              </section>

              <section className="board-column">
                <div className="board-column-head done">
                  <div>
                    <p className="board-column-kicker">Completadas</p>
                    <h3>Completadas</h3>
                  </div>
                  <span className="board-column-count">
                    {completedTasks.length} {completedTasks.length === 1 ? 'tarea' : 'tareas'}
                  </span>
                </div>
                {completedTasks.length > 0 ? (
                  <ul className="task-list">{completedTasks.map(renderTaskCard)}</ul>
                ) : (
                  <div className="board-empty compact">
                    <p>Sin tareas completadas.</p>
                  </div>
                )}
              </section>
            </div>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
