import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, createUser as apiCreateUser } from '@/src/services/auth.api';
import { setToken as setHttpToken } from '@/src/services/http';
import {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
  User,
  signInRequest,
  signUpRequest,
} from '@/src/services/api';

type AuthContextData = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signing: boolean;
  signIn: (data: SignInPayload) => Promise<void>;
  signUp: (data: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const TOKEN_KEY = 'AUTH_TOKEN';
const USER_KEY = 'AUTH_USER';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);

  // Bootstraps auth state from storage
  useEffect(() => {
    (async () => {
      try {
        const [[, storedToken], [, storedUser]] = await AsyncStorage.multiGet([
          TOKEN_KEY,
          USER_KEY,
        ]);
        if (storedToken) {
          setToken(storedToken);
          setHttpToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persistAuth = useCallback(async (data: AuthResponse) => {
    setToken(data.token);
    setUser(data.user);
    await AsyncStorage.multiSet([
      [TOKEN_KEY, data.token],
      [USER_KEY, JSON.stringify(data.user)],
    ]);
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    setSigning(true);
    try {
      // Real API login
      const res = await apiLogin(payload.email, payload.password);
      await persistAuth({ token: res.token, user: { id: String(res.user.id), email: res.user.email, role: res.user.role } });
    } catch (err) {
      // Fallback para mock local caso backend indisponível
      try {
        const mock = await signInRequest(payload);
        await persistAuth(mock);
      } catch (e2) {
        throw err;
      }
    } finally {
      setSigning(false);
    }
  }, [persistAuth]);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    setSigning(true);
    try {
      // Real API create user then login
      await apiCreateUser(payload.email, payload.password, payload.role === 'professor' ? 'teacher' : payload.role === 'usuario' ? 'customer' : 'admin');
      const res = await apiLogin(payload.email, payload.password);
      await persistAuth({ token: res.token, user: { id: String(res.user.id), email: res.user.email, role: res.user.role } });
    } catch (err) {
      // Fallback para mock
      const mock = await signUpRequest(payload);
      await persistAuth(mock);
    } finally {
      setSigning(false);
    }
  }, [persistAuth]);

  const signOut = useCallback(async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    setHttpToken(null);
  }, []);

  const value = useMemo<AuthContextData>(() => ({
    user,
    token,
    loading,
    signing,
    signIn,
    signUp,
    signOut,
  }), [loading, signIn, signOut, signUp, signing, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
