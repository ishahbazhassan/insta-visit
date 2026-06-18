import type { StatusBadgeVariant } from "@/app/components/ui/badges/StatusBadge";
import type {
  ApprovedProviderApiItem,
  ProviderListItem,
  ProviderRequestApiItem,
  ProviderRequestDetail,
  ProviderRequestDetailResponse,
  ProviderRequestItem,
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

export function mapProviderRequestToListItem(
  request: ProviderRequestApiItem,
): ProviderRequestItem {
  return {
    id: request.id,
    name: request.name,
    email: request.email,
    phone: request.phone ?? "—",
    education: request.education ?? "—",
    status: request.status,
  };
}

export function mapProviderRequestDetail(
  request: ProviderRequestDetailResponse,
): ProviderRequestDetail {
  return {
    id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    phone: request.phone ?? "—",
    npiNumber: request.npiNumber ?? "—",
    credentials: request.credentials ?? "—",
    licenseNumber: request.licenseNumber ?? "—",
    licenseExpirationDate: request.licenseExpirationDate ?? "—",
    licenseState: request.licenseState ?? "—",
    homeStreetAddress: request.homeStreetAddress ?? "—",
    homeCity: request.homeCity ?? "—",
    homeState: request.homeState ?? "—",
    homeZipCode: request.homeZipCode ?? "—",
    practiceAddress: request.practiceAddress ?? "—",
    status: request.status,
  };
}
