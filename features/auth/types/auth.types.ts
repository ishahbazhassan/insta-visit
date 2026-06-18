export type LoginPayload = {
  email: string;
  password: string;
};

export type UserRole = "ADMIN" | "PROVIDER" | "PATIENT";

export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVE";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type ProviderRequestPayload = {
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
  sameAsHomeAddress?: boolean;
};

export type ProviderRequestResponse = {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    phone: string | null;
    createdAt: string;
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  message: string;
  resetToken: string;
};

export type ResetPasswordPayload = {
  resetToken: string;
  newPassword: string;
};

export type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};
