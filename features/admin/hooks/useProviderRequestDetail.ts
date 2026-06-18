"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  approveProviderRequest,
  fetchProviderRequestById,
  rejectProviderRequest,
} from "../api/admin.api";
import { mapProviderRequestDetail } from "../lib/map-providers";
import type { ProviderRequestDetail } from "../types/provider.types";
import { getErrorMessage } from "@/lib/api";

export function useProviderRequestDetail(id: string) {
  const router = useRouter();
  const [request, setRequest] = useState<ProviderRequestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRequest = useCallback(async () => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchProviderRequestById(id);
      setRequest(mapProviderRequestDetail(result));
    } catch (err) {
      setError(getErrorMessage(err));
      setRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadRequest();
  }, [loadRequest]);

  const approve = useCallback(async () => {
    const loadToast = toast.loading("Approving provider...");
    setIsSubmitting(true);

    try {
      const result = await approveProviderRequest(id);
      toast.success(result.message || "Provider approved successfully", {
        id: loadToast,
      });
      router.push("/admin/provider-requests");
    } catch (err) {
      toast.error(getErrorMessage(err) || "Approval failed", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  }, [id, router]);

  const reject = useCallback(async () => {
    const loadToast = toast.loading("Declining request...");
    setIsSubmitting(true);

    try {
      const result = await rejectProviderRequest(id);
      toast.success(result.message || "Provider request declined", {
        id: loadToast,
      });
      await loadRequest();
    } catch (err) {
      toast.error(getErrorMessage(err) || "Decline failed", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  }, [id, loadRequest]);

  return {
    request,
    isLoading,
    isSubmitting,
    error,
    approve,
    reject,
    reload: loadRequest,
  };
}
