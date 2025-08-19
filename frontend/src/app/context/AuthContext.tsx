'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { userClient, LoginRequest, RegisterRequest } from '../api/userClient';

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('accessToken');
      if (savedToken) {
        setToken(savedToken);
        userClient.setAuthToken(savedToken);
        try {
          await fetchUser();
        } catch (err) {
          console.error(err);
          logout();
        }
      }
    };
    initAuth();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await userClient.getMe();
      setUser(response);
    } catch (err) {
      console.error('Failed to load user', err);
      logout();
    }
  };

  const login = async (data: LoginRequest) => {
     try {
    const response = await userClient.login(data);
    setToken(response.token);
    userClient.setAuthToken(response.token);
    await fetchUser();
    router.push('/');
     } catch (err) {
    console.error("Login failed", err)
     }
  };

  const register = async (data: RegisterRequest) => {
    await userClient.register(data);
    router.push('/login');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    userClient.setAuthToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
