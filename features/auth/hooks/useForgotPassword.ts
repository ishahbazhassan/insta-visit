"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../api/auth.api";
import type { ForgotPasswordPayload } from "../types/auth.types";
import { getErrorMessage } from "@/lib/api";

export function useForgotPassword(onSuccess: (email: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submitForgotPassword = useCallback(
    async (payload: ForgotPasswordPayload) => {
      const loadToast = toast.loading("Requesting OTP...");
      setIsLoading(true);

      try {
        const result = await forgotPassword(payload);
        toast.success(result.message ?? "OTP sent!", { id: loadToast });
        onSuccess(payload.email);
      } catch (error) {
        toast.error(getErrorMessage(error) || "Request failed", { id: loadToast });
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  const resendOtp = useCallback(async (email: string) => {
    const loadToast = toast.loading("Sending new code...");
    setIsLoading(true);

    try {
      const result = await forgotPassword({ email });
      toast.success(result.message ?? "New code sent!", { id: loadToast });
    } catch (error) {
      toast.error(getErrorMessage(error) || "Request failed", { id: loadToast });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { submitForgotPassword, resendOtp, isLoading };
}
