"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import {
  clearAuthSession,
  getAuthUser,
  isAuthenticated,
} from "@/features/auth/lib/session";
import type { AuthUser } from "@/features/auth/types/auth.types";

export function useAdminAuth() {
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

    const authUser = getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      clearAuthSession();
      setIsLoading(false);
      router.replace(AUTH_ROUTES.login);
      return;
    }

    setUser(authUser);
    setIsLoading(false);
  }, [router]);

  return { user, isLoading, logout };
}
