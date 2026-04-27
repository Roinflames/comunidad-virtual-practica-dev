import { useState } from "react";

function initialValues() {
  return {
    titulo: "",
    descripcion: ""
  };
}

export default function TaskComposer({ error, mutationPending, onSubmit }) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(values, () => setValues(initialValues()));
  };

  return (
    <article className="card composer-card">
      <div className="card-copy">
        <h3>Nueva tarea</h3>
        <p>Agrega una tarea con titulo claro y una descripcion breve.</p>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <form className="stack-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Titulo</span>
          <input
            name="titulo"
            type="text"
            value={values.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Descripcion</span>
          <textarea
            name="descripcion"
            rows="4"
            value={values.descripcion}
            onChange={handleChange}
          />
        </label>

        <button className="primary-button" type="submit" disabled={mutationPending}>
          {mutationPending ? "Guardando..." : "Crear tarea"}
        </button>
      </form>
    </article>
  );
}
