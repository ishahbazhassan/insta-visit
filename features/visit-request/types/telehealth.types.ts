export type CatalogType = "DISEASE" | "MEDICATION";

export type TelehealthServiceSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  price: number | null;
  sortOrder: number;
};

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  type: CatalogType;
  sortOrder: number;
  services: TelehealthServiceSummary[];
};

export type ServiceCategoriesResponse = {
  categories: ServiceCategory[];
  total: number;
};

export type ServiceFormField = {
  id: string;
  key: string;
  label: string;
  section: string;
  fieldType: string;
  options: string[] | null;
  required: boolean;
  sortOrder: number;
};

export type TelehealthServiceDetail = TelehealthServiceSummary & {
  category: {
    id: string;
    name: string;
    slug: string;
    type: CatalogType;
  };
};

export type ServiceDetailResponse = {
  service: TelehealthServiceDetail;
  formFields: ServiceFormField[];
};

export type Pharmacy = {
  id: string;
  name: string;
  address: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phone: string | null;
  fax: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type PharmaciesResponse = {
  pharmacies: Pharmacy[];
  total: number;
};

export type VisitRequestPatientPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  sex: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
};

export type VisitRequestHealthPayload = {
  pastMedicalProblems?: string;
  currentMedications?: string;
  knownAllergies?: string;
  height?: string;
  currentWeight?: string;
  bmi?: string;
  medicationDesired?: string;
  dosageDesired?: string;
  quantityDesired?: string;
  reasonForMedication?: string;
  chiefComplaint?: string;
};

export type CreateVisitRequestPayload = {
  serviceSlug: string;
  patient: VisitRequestPatientPayload;
  health: VisitRequestHealthPayload;
  screeningAnswers?: Record<string, string>;
  pharmacyId?: string;
  agreedToTerms: boolean;
};

export type CreateVisitRequestResponse = {
  message: string;
  visit: {
    id: string;
    visitCode: string;
    status: string;
    createdAt: string;
    patient: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    service: {
      id: string;
      name: string;
      slug: string;
    };
    pharmacy: {
      id: string;
      name: string;
      address: string;
    } | null;
  };
};
