import type { StatusBadgeVariant } from "@/app/components/ui/badges/StatusBadge";

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
