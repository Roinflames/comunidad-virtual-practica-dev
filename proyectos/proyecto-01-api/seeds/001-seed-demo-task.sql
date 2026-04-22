INSERT INTO tasks (titulo, descripcion, completada, usuario_id)
SELECT
  'Bienvenida',
  'Crea un usuario real desde /auth/registro y luego administra tus tareas.',
  0,
  1
WHERE EXISTS (SELECT 1 FROM users WHERE id = 1);
