"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { providerRequest } from "../api/auth.api";
import type { ProviderRequestPayload } from "../types/auth.types";
import { getErrorMessage } from "@/lib/api";

export function useProviderRequest(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submitProviderRequest = useCallback(
    async (data: ProviderRequestPayload) => {
      const loadToast = toast.loading("Submitting request...");
      setIsLoading(true);

      try {
        const result = await providerRequest({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
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

        toast.success(
          result.message ?? "Request submitted! Awaiting admin approval.",
          { id: loadToast },
        );
        onSuccess();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Request failed", {
          id: loadToast,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { submitProviderRequest, isLoading };
}
