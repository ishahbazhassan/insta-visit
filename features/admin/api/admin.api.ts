import { api } from "@/lib/api";
import type { ApprovedProvidersResponse } from "../types/provider.types";

export async function fetchApprovedProviders(): Promise<ApprovedProvidersResponse> {
  const { data } = await api.get<ApprovedProvidersResponse>("/admin/providers");
  return data;
}
