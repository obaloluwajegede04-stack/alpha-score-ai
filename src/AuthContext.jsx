import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  getUser,
  login as apiLogin,
  register as apiRegister,
  setToken,
  setUser,
} from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiLogin({ email, password });
      setTokenState(result.token);
      setUserState(result.user);
      setToken(result.token);
      setUser(result.user);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRegister({ name, email, password });
      setTokenState(result.token);
      setUserState(result.user);
      setToken(result.token);
      setUser(result.user);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
