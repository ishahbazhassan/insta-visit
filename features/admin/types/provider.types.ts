import type { StatusBadgeVariant } from "@/app/components/ui/badges/StatusBadge";

export type ApprovedProviderApiItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  education: string | null;
  patientsAttended: number;
  status: string;
  createdAt: string;
};

export type ApprovedProvidersResponse = {
  providers: ApprovedProviderApiItem[];
  total: number;
};

export type ProviderRequestApiItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  education: string | null;
  status: "pending" | "decline";
  createdAt: string;
};

export type ProviderRequestsResponse = {
  requests: ProviderRequestApiItem[];
  total: number;
};

export type ProviderRequestDetailResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  npiNumber: string | null;
  credentials: string | null;
  licenseNumber: string | null;
  licenseExpirationDate: string | null;
  licenseState: string | null;
  homeStreetAddress: string | null;
  homeCity: string | null;
  homeState: string | null;
  homeZipCode: string | null;
  practiceAddress: string | null;
  status: "pending" | "decline";
  createdAt: string;
};

export type ProviderActionResponse = {
  message: string;
};

export type ProviderListItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  patientsAttended: number;
  status: StatusBadgeVariant;
  isActive: boolean;
};

export type ProviderRequestItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  status: "pending" | "decline";
};

export type ProviderRequestDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  npiNumber: string;
  credentials: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  licenseState: string;
  homeStreetAddress: string;
  homeCity: string;
  homeState: string;
  homeZipCode: string;
  practiceAddress: string;
  status: "pending" | "decline";
};
