import { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Periksa sesi dari Supabase saat web pertama kali dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Dengarkan jika ada perubahan (misal user login / logout di tab lain)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      // Ubah pesan error bahasa inggris Supabase jadi lebih ramah
      let msg = error.message;
      if (msg === 'Invalid login credentials') msg = 'Email atau password salah';
      return { success: false, error: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'user' // Default role
          }
        }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      let msg = error.message;
      if (msg === 'User already registered') msg = 'Email ini sudah terdaftar';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = useCallback(() => {
    // Mengecek apakah di metadata user terdapat role admin
    return user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'superadmin';
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
