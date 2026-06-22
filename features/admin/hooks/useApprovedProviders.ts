"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchApprovedProviders, updateProviderStatus } from "../api/admin.api";
import { mapApprovedProviderToListItem } from "../lib/map-providers";
import type { ProviderListItem } from "../types/provider.types";
import { getErrorMessage } from "@/lib/api";

export function useApprovedProviders() {
  const [providers, setProviders] = useState<ProviderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingProviderId, setUpdatingProviderId] = useState<string | null>(
    null,
  );

  const loadProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchApprovedProviders();
      setProviders(result.providers.map(mapApprovedProviderToListItem));
    } catch (err) {
      setError(getErrorMessage(err));
      setProviders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleProviderStatus = useCallback(
    async (id: string, isActive: boolean) => {
      const loadToast = toast.loading("Updating provider status...");
      setUpdatingProviderId(id);

      try {
        const result = await updateProviderStatus(
          id,
          isActive ? "ACTIVE" : "INACTIVE",
        );

        setProviders((current) =>
          current.map((provider) =>
            provider.id === id
              ? {
                  ...provider,
                  isActive,
                  status: isActive ? "active" : "inactive",
                }
              : provider,
          ),
        );

        toast.success(result.message, { id: loadToast });
      } catch (err) {
        toast.error(getErrorMessage(err) || "Failed to update status", {
          id: loadToast,
        });
      } finally {
        setUpdatingProviderId(null);
      }
    },
    [],
  );

  useEffect(() => {
    void loadProviders();
  }, [loadProviders]);

  return {
    providers,
    isLoading,
    error,
    updatingProviderId,
    reload: loadProviders,
    toggleProviderStatus,
  };
}
