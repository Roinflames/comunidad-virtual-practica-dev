function proc(u, l) {
  let r = [];
  for (let i = 0; i < u.length; i++) {
    if (u[i].a === true && u[i].t === l) {
      r.push({ n: u[i].nm, e: u[i].em });
    }
  }
  return r;
}
