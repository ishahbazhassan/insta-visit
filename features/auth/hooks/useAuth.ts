"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    router.replace("/");
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated()) {
      clearAuthSession();
      setIsLoading(false);
      router.replace("/");
      return;
    }

    setUser(getAuthUser());
    setIsLoading(false);
  }, [router]);

  return { user, isLoading, logout };
}
