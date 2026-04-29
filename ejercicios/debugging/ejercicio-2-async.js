async function obtenerUsuario(id, fetchImpl = fetch) {
  const response = await fetchImpl(`/api/usuarios/${id}`);

  if (!response.ok) {
    throw new Error(`No se pudo obtener el usuario ${id}: ${response.status}`);
  }

  const data = await response.json();
  return data.nombre;
}

async function demo() {
  const fetchFalso = async () => ({
    ok: true,
    status: 200,
    async json() {
      return { nombre: "Javier" };
    }
  });

  const nombre = await obtenerUsuario(1, fetchFalso);
  console.log("Usuario obtenido:", nombre);
}

demo().catch((error) => {
  console.error("Error en obtenerUsuario:", error.message);
});
