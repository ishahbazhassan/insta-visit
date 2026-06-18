import type { StatusBadgeVariant } from "@/app/components/ui/badges/StatusBadge";
import type {
  ApprovedProviderApiItem,
  ProviderListItem,
} from "../types/provider.types";

function mapApiStatus(status: string): StatusBadgeVariant {
  const normalized = status.toLowerCase();

  if (
    normalized === "active" ||
    normalized === "inactive" ||
    normalized === "not-available" ||
    normalized === "paused" ||
    normalized === "pending" ||
    normalized === "decline"
  ) {
    return normalized;
  }

  return "active";
}

export function mapApprovedProviderToListItem(
  provider: ApprovedProviderApiItem,
): ProviderListItem {
  return {
    id: provider.id,
    name: provider.name,
    email: provider.email,
    phone: provider.phone ?? "—",
    education: provider.education ?? "—",
    patientsAttended: provider.patientsAttended,
    status: mapApiStatus(provider.status),
    isActive: provider.status.toUpperCase() === "ACTIVE",
  };
}
