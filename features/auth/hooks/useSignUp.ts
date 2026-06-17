"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../api/auth.api";
import type { SignUpFormValues } from "../types/auth.types";
import { getErrorMessage } from "@/lib/api";

export function useSignUp(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submitSignUp = useCallback(
    async (data: SignUpFormValues) => {
      if (!data.password || data.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const loadToast = toast.loading("Creating account...");
      setIsLoading(true);

      try {
        const result = await signup({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          npiNumber: data.npiNumber,
          credentials: data.credentials,
          licenseNumber: data.licenseNumber,
          licenseExpirationDate: data.licenseExpirationDate,
          licenseState: data.licenseState,
          homeStreetAddress: data.homeStreetAddress,
          homeCity: data.homeCity,
          homeState: data.homeState,
          homeZipCode: data.homeZipCode,
          practiceAddress: data.practiceAddress,
          sameAsHomeAddress: !!data.sameAsHomeAddress,
        });

        toast.success(result.message ?? "Account created!", { id: loadToast });
        onSuccess();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Signup failed", { id: loadToast });
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { submitSignUp, isLoading };
}
