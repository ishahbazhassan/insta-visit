import { api } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  SignUpPayload,
  SignUpResponse,
} from "../types/auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function signup(payload: SignUpPayload): Promise<SignUpResponse> {
  const { data } = await api.post<SignUpResponse>("/auth/signup", payload);
  return data;
}
