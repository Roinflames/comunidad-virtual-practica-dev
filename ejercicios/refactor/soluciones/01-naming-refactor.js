function filtrarUsuariosActivosPorTipo(usuarios, tipoBuscado) {
  const usuariosFiltrados = [];

  for (let indice = 0; indice < usuarios.length; indice++) {
    const usuario = usuarios[indice];

    if (usuario.a === true && usuario.t === tipoBuscado) {
      usuariosFiltrados.push({
        n: usuario.nm,
        e: usuario.em
      });
    }
  }

  return usuariosFiltrados;
}
