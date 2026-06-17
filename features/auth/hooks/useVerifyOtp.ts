"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { verifyOtp } from "../api/auth.api";
import { getErrorMessage } from "@/lib/api";
import { setResetToken } from "../lib/session";

type UseVerifyOtpOptions = {
  userEmail: string;
  nextStep: "dashboard" | "resetPassword";
  onResetSuccess: () => void;
};

export function useVerifyOtp({
  userEmail,
  nextStep,
  onResetSuccess,
}: UseVerifyOtpOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const submitVerifyOtp = useCallback(
    async (otp: string) => {
      const loadToast = toast.loading("Verifying...");

      if (nextStep === "dashboard") {
        setTimeout(() => {
          toast.success("Verified!", { id: loadToast });
          window.location.href = "/provider/dashboard";
        }, 1200);
        return;
      }

      setIsLoading(true);

      try {
        const result = await verifyOtp({ email: userEmail, otp });
        setResetToken(result.resetToken);
        toast.success(result.message ?? "Verified!", { id: loadToast });
        onResetSuccess();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Verification failed", {
          id: loadToast,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [userEmail, nextStep, onResetSuccess],
  );

  return { submitVerifyOtp, isLoading };
}
