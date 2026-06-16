"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../api/auth.api";
import type { LoginPayload } from "../types/auth.types";
import { getErrorMessage } from "@/lib/api";
import { setAuthSession } from "../lib/session";

export function useLogin(onSuccess: (email: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = useCallback(
    async (payload: LoginPayload) => {
      const loadToast = toast.loading("Checking credentials...");
      setIsLoading(true);

      try {
        const result = await login(payload);
        setAuthSession(result.accessToken, result.user);
        toast.success("Logged in!", { id: loadToast });
        onSuccess(result.user.email);
      } catch (error) {
        toast.error(getErrorMessage(error) || "Login failed", { id: loadToast });
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { submitLogin, isLoading };
}
