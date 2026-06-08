import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  setAuthToken,
} from "../lib/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "learnhub-auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setAuthLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (parsed?.token) {
        setTokenState(parsed.token);
        setAuthToken(parsed.token);
        getCurrentUser()
          .then((data) => {
            setUser(data.user);
          })
          .catch(() => {
            localStorage.removeItem(STORAGE_KEY);
            setAuthToken("");
            setTokenState("");
          })
          .finally(() => {
            setAuthLoading(false);
          });
        return;
      }
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
    }

    setAuthLoading(false);
  }, []);

  const persistAuth = (payload) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setTokenState(payload.token);
    setAuthToken(payload.token);
    setUser(payload.user);
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    persistAuth(data);
    return data;
  };

  const register = async (details) => {
    const data = await registerUser(details);
    persistAuth(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setTokenState("");
    setAuthToken("");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
