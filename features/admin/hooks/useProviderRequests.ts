"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProviderRequests } from "../api/admin.api";
import {
  mapProviderRequestToListItem,
} from "../lib/map-providers";
import type { ProviderRequestItem } from "../types/provider.types";
import { getErrorMessage } from "@/lib/api";

export function useProviderRequests() {
  const [requests, setRequests] = useState<ProviderRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchProviderRequests();
      setRequests(result.requests.map(mapProviderRequestToListItem));
    } catch (err) {
      setError(getErrorMessage(err));
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  return { requests, isLoading, error, reload: loadRequests };
}
