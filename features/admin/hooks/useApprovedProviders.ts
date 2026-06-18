"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchApprovedProviders } from "../api/admin.api";
import { mapApprovedProviderToListItem } from "../lib/map-providers";
import type { ProviderListItem } from "../types/provider.types";
import { getErrorMessage } from "@/lib/api";

export function useApprovedProviders() {
  const [providers, setProviders] = useState<ProviderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    void loadProviders();
  }, [loadProviders]);

  return { providers, isLoading, error, reload: loadProviders };
}
