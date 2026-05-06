function validarEmail(email) {
  if (email === null || email === undefined || email === '') {
    return false;
  }
  if (email.length < 5) {
    return false;
  }
  if (!email.includes('@')) {
    return false;
  }
  if (!email.includes('.')) {
    return false;
  }
  return true;
}

function validarNombre(nombre) {
  if (nombre === null || nombre === undefined || nombre === '') {
    return false;
  }
  if (nombre.length < 2) {
    return false;
  }
  if (nombre.length > 50) {
    return false;
  }
  return true;
}
