"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { verifyOtp } from "../api/auth.api";
import { getErrorMessage } from "@/lib/api";
import { setResetToken } from "../lib/session";

type UseVerifyOtpOptions = {
  userEmail: string;
  onSuccess: () => void;
};

export function useVerifyOtp({ userEmail, onSuccess }: UseVerifyOtpOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const submitVerifyOtp = useCallback(
    async (otp: string) => {
      const loadToast = toast.loading("Verifying...");
      setIsLoading(true);

      try {
        const result = await verifyOtp({ email: userEmail, otp });
        setResetToken(result.resetToken);
        toast.success(result.message ?? "Verified!", { id: loadToast });
        onSuccess();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Verification failed", {
          id: loadToast,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [userEmail, onSuccess],
  );

  return { submitVerifyOtp, isLoading };
}
