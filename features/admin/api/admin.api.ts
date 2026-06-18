import { api } from "@/lib/api";
import type {
  ApprovedProvidersResponse,
  ProviderActionResponse,
  ProviderRequestDetailResponse,
  ProviderRequestsResponse,
} from "../types/provider.types";

export async function fetchApprovedProviders(): Promise<ApprovedProvidersResponse> {
  const { data } = await api.get<ApprovedProvidersResponse>("/admin/providers");
  return data;
}

export async function fetchProviderRequests(): Promise<ProviderRequestsResponse> {
  const { data } = await api.get<ProviderRequestsResponse>(
    "/admin/provider-requests",
  );
  return data;
}

export async function fetchProviderRequestById(
  id: string,
): Promise<ProviderRequestDetailResponse> {
  const { data } = await api.get<ProviderRequestDetailResponse>(
    `/admin/provider-requests/${id}`,
  );
  return data;
}

export async function approveProviderRequest(
  id: string,
): Promise<ProviderActionResponse> {
  const { data } = await api.post<ProviderActionResponse>(
    `/admin/provider-requests/${id}/approve`,
  );
  return data;
}

export async function rejectProviderRequest(
  id: string,
): Promise<ProviderActionResponse> {
  const { data } = await api.post<ProviderActionResponse>(
    `/admin/provider-requests/${id}/reject`,
  );
  return data;
}
