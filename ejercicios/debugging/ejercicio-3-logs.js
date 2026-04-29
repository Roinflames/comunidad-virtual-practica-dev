function crearHandlerProductos(db) {
  return async function obtenerProductos(req, res) {
    const categoria = req.query.categoria;
    console.log("[productos] categoria recibida:", categoria);

    const productos = await db.query(
      "SELECT * FROM productos WHERE categoria = ?",
      [categoria]
    );

    console.log("[productos] total desde query:", productos.length);
    console.log("[productos] muestra query:", productos.slice(0, 3));

    const activos = productos.filter((producto) => producto.activo);
    console.log("[productos] total activos:", activos.length);
    console.log("[productos] muestra activos:", activos.slice(0, 3));

    const ordenados = [...activos].sort((a, b) => a.precio - b.precio);
    console.log(
      "[productos] precios ordenados:",
      ordenados.map((producto) => producto.precio)
    );

    res.json(ordenados);
  };
}

async function demo() {
  const dbFalso = {
    async query() {
      return [
        { id: 1, nombre: "Teclado", categoria: "pc", activo: true, precio: 30000 },
        { id: 2, nombre: "Mouse", categoria: "pc", activo: false, precio: 12000 },
        { id: 3, nombre: "Monitor", categoria: "pc", activo: true, precio: 140000 }
      ];
    }
  };

  const req = { query: { categoria: "pc" } };
  const res = {
    json(payload) {
      console.log("[productos] respuesta final:", payload);
    }
  };

  const handler = crearHandlerProductos(dbFalso);
  await handler(req, res);
}

demo().catch((error) => {
  console.error("[productos] error:", error.message);
});
