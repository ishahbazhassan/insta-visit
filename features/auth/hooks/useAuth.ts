"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "../constants/routes";
import {
  clearAuthSession,
  getAuthUser,
  isAuthenticated,
} from "../lib/session";
import type { AuthUser } from "../types/auth.types";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
    router.replace(AUTH_ROUTES.login);
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated()) {
      clearAuthSession();
      setIsLoading(false);
      router.replace(AUTH_ROUTES.login);
      return;
    }

    setUser(getAuthUser());
    setIsLoading(false);
  }, [router]);

  return { user, isLoading, logout };
}
