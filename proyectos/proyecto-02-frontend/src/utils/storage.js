function saveSession(authData) {
  localStorage.setItem("cv_token", authData.token);
  localStorage.setItem("cv_user", JSON.stringify(authData.usuario));
}

function readUser() {
  const rawUser = localStorage.getItem("cv_user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (_error) {
    clearSession();
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("cv_token");
  localStorage.removeItem("cv_user");
}

function hasToken() {
  return Boolean(localStorage.getItem("cv_token"));
}

export { clearSession, hasToken, readUser, saveSession };
