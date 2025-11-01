import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      const res = await signInRequest(payload);
      await persistAuth(res);
    } finally {
      setSigning(false);
    }
  }, [persistAuth]);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    setSigning(true);
    try {
      const res = await signUpRequest(payload);
      await persistAuth(res);
    } finally {
      setSigning(false);
    }
  }, [persistAuth]);

  const signOut = useCallback(async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
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
