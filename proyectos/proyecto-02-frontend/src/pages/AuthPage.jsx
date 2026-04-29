import { useState } from "react";

function initialValues() {
  return {
    nombre: "",
    email: "",
    password: ""
  };
}

function validate(mode, values) {
  const email = values.email.trim();
  const password = values.password;
  const nombre = values.nombre.trim();

  if (mode === "register" && nombre.length < 2) {
    throw new Error("El nombre debe tener al menos 2 caracteres.");
  }

  if (!email.includes("@")) {
    throw new Error("Debes ingresar un email valido.");
  }

  if (password.length < 8) {
    throw new Error("La password debe tener al menos 8 caracteres.");
  }

  return {
    nombre,
    email,
    password
  };
}

export default function AuthPage({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  const handleChange = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = validate(mode, values);

      if (isRegister) {
        await onRegister(payload);
      } else {
        await onLogin(payload);
      }

      setValues(initialValues());
    } catch (submitError) {
      setError(submitError.message || "No fue posible autenticarte.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card auth-card">
      <div className="tabs">
        <button
          className={`tab-button${mode === "login" ? " active" : ""}`}
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
        >
          Login
        </button>
        <button
          className={`tab-button${mode === "register" ? " active" : ""}`}
          type="button"
          onClick={() => {
            setMode("register");
            setError("");
          }}
        >
          Registro
        </button>
      </div>

      <div className="card-copy">
        <h2>{isRegister ? "Crea tu cuenta" : "Inicia sesion"}</h2>
        <p>
          {isRegister
            ? "Registrate y entra directo a tu tablero."
            : "Usa tu cuenta del proyecto 01 para entrar al dashboard."}
        </p>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <form className="stack-form" onSubmit={handleSubmit}>
        {isRegister ? (
          <label className="field">
            <span>Nombre</span>
            <input
              name="nombre"
              type="text"
              autoComplete="name"
              value={values.nombre}
              onChange={handleChange}
              required
            />
          </label>
        ) : null}

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Procesando..." : isRegister ? "Registrarme" : "Entrar"}
        </button>
      </form>
    </section>
  );
}
