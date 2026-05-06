function tieneTexto(valor) {
  return valor !== null && valor !== undefined && valor !== '';
}

function cumpleRangoDeLargo(valor, minimo, maximo) {
  return valor.length >= minimo && valor.length <= maximo;
}

function validarEmail(email) {
  if (!tieneTexto(email)) {
    return false;
  }

  if (!cumpleRangoDeLargo(email, 5, Infinity)) {
    return false;
  }

  return email.includes('@') && email.includes('.');
}

function validarNombre(nombre) {
  if (!tieneTexto(nombre)) {
    return false;
  }

  return cumpleRangoDeLargo(nombre, 2, 50);
}
