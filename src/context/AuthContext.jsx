import { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Periksa apakah user sudah login berdasarkan token
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('kampus_token');
      if (token) {
        try {
          const data = await authService.getMe();
          setUser(data.user);
        } catch (e) {
          console.error('Session expired', e);
          localStorage.removeItem('kampus_token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('kampus_token', data.token);
      // Backend kembalikan { user, token }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kampus_token');
  };

  const isAdmin = useCallback(() => {
    return user?.role === 'admin' || user?.role === 'superadmin';
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
