function calcularPromedio(notas) {
  let suma = 0;

  for (let i = 0; i < notas.length; i += 1) {
    suma += notas[i];
  }

  return suma / notas.length;
}

const ejemplo = [7, 8, 6, 9];

console.log("Notas:", ejemplo);
console.log("Promedio corregido:", calcularPromedio(ejemplo));
