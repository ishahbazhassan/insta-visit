export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
  sameAsHomeAddress?: boolean;
};

export type SignUpFormValues = SignUpPayload & {
  confirmPassword: string;
};

export type SignUpResponse = {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: string;
  };
};
