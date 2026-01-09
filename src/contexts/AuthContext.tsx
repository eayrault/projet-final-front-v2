import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, register as apiRegister, isAuthenticated } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const login = async (email: string, password: string) => {
    await apiLogin({ email, password });
    setAuthenticated(true);
  };

  const logout = async () => {
    await apiLogout();
    setAuthenticated(false);
  };

  const register = async (data: RegisterData) => {
    await apiRegister(data);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
