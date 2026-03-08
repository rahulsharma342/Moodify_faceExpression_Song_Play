import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ email, password, username }) {
    try {
      setLoading(true);
      const data = await registerUser({ email, password, username });
      setUser(data?.user || null);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      setUser(data?.user || null);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchCurrentUser() {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      setUser(data?.user || null);
      return data;
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    fetchCurrentUser,
  };
};
