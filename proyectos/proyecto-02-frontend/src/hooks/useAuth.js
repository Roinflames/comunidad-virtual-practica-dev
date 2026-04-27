import { useState } from "react";
import { loginUser, registerUser } from "../services/api.js";
import { clearSession, readToken, readUser, saveSession } from "../utils/storage.js";

export function useAuth() {
  const [session, setSession] = useState(() => ({
    token: readToken(),
    user: readUser()
  }));

  const login = async (payload) => {
    const authData = await loginUser(payload);
    saveSession(authData);
    setSession({
      token: authData.token,
      user: authData.usuario
    });
    return authData;
  };

  const register = async (payload) => {
    const authData = await registerUser(payload);
    saveSession(authData);
    setSession({
      token: authData.token,
      user: authData.usuario
    });
    return authData;
  };

  const logout = () => {
    clearSession();
    setSession({
      token: null,
      user: null
    });
  };

  return {
    token: session.token,
    user: session.user,
    login,
    register,
    logout,
    clearAuth: logout
  };
}
