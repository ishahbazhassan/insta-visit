"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth.api";
import type { ResetPasswordFormValues } from "../types/auth.types";
import { getErrorMessage } from "@/lib/api";
import { clearResetToken, getResetToken } from "../lib/session";

export function useResetPassword(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submitResetPassword = useCallback(
    async (data: ResetPasswordFormValues) => {
      if (!data.newPassword || data.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const resetToken = getResetToken();
      if (!resetToken) {
        toast.error("Session expired. Please request a new OTP.");
        return;
      }

      const loadToast = toast.loading("Updating password...");
      setIsLoading(true);

      try {
        const result = await resetPassword({
          resetToken,
          newPassword: data.newPassword,
        });
        clearResetToken();
        toast.success(result.message ?? "Password reset! Please login.", {
          id: loadToast,
        });
        onSuccess();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Reset failed", { id: loadToast });
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { submitResetPassword, isLoading };
}
