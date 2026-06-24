import { api } from "@/lib/api";
import type {
  CreateVisitRequestPayload,
  CreateVisitRequestResponse,
  PharmaciesResponse,
  ServiceCategoriesResponse,
  ServiceDetailResponse,
} from "../types/telehealth.types";

export async function fetchTelehealthCategories(): Promise<ServiceCategoriesResponse> {
  const { data } = await api.get<ServiceCategoriesResponse>(
    "/telehealth/categories",
  );
  return data;
}

export async function fetchTelehealthServiceBySlug(
  slug: string,
): Promise<ServiceDetailResponse> {
  const { data } = await api.get<ServiceDetailResponse>(
    `/telehealth/services/${slug}`,
  );
  return data;
}

export async function fetchPharmacies(): Promise<PharmaciesResponse> {
  const { data } = await api.get<PharmaciesResponse>("/telehealth/pharmacies");
  return data;
}

export async function submitVisitRequest(
  payload: CreateVisitRequestPayload,
): Promise<CreateVisitRequestResponse> {
  const { data } = await api.post<CreateVisitRequestResponse>(
    "/visit-requests",
    payload,
  );
  return data;
}
