app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email invalido' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password muy corto' });
  }
  const existe = await db.get('SELECT id FROM usuarios WHERE email = ?', [email]);
  if (existe) {
    return res.status(409).json({ error: 'Email ya registrado' });
  }
  const hash = require('crypto').createHash('sha256').update(password).digest('hex');
  await db.run('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hash]);
  const usuario = await db.get('SELECT id, nombre, email FROM usuarios WHERE email = ?', [email]);
  res.status(201).json({ success: true, data: usuario });
});
