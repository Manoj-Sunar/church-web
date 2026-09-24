"use client";

import { adminAPI } from "@/app/API/admin.api";
import { User } from "@/app/Types/APIResponse";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";


/* ─────────────────────────────────────────────
   Context value
   ───────────────────────────────────────────── */
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTreasurer: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  refresh: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ─────────────────────────────────────────────
   Provider
   ───────────────────────────────────────────── */
interface AuthProviderProps {
  children: ReactNode;
  /** Passed from server layout to avoid auth flash */
  initialUser?: User | null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* ───────── fetch /auth/me ───────── */
  const fetchMe = useCallback(async (): Promise<User | null> => {
    try {
      const data = await adminAPI.getMe();
      if (mountedRef.current) {
        setUser(data.user);
        setError(null);
      }
      return data.user;
    } catch (err: any) {
      // 401 → not logged in, not an error
      if (err?.response?.status === 401) {
        if (mountedRef.current) {
          setUser(null);
          setError(null);
        }
        return null;
      }
      if (mountedRef.current) {
        setError(err?.message ?? "Failed to load user");
        setUser(null);
      }
      return null;
    }
  }, []);

  /* ───────── bootstrap on mount ───────── */
  useEffect(() => {
    if (initialUser) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      await fetchMe();
      if (!cancelled && mountedRef.current) setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [initialUser, fetchMe]);

  /* ───────── login ───────── */
  const login = useCallback(async (email: string, password: string) => {
    const data: any = await adminAPI.login({ email, password });
    const loggedInUser: User = data.user;
    setUser(loggedInUser);
    setError(null);
    return loggedInUser;
  }, []);



  /* ───────── refresh ───────── */
  const refresh = useCallback(async () => fetchMe(), [fetchMe]);

  /* ───────── memoized value ───────── */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      isTreasurer: user?.role === "treasurer",
      error,
      login,
     
      refresh,
    }),
    [user, isLoading, error, login, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─────────────────────────────────────────────
   Hook
   ───────────────────────────────────────────── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}