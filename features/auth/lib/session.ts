import type { AuthUser } from "../types/auth.types";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/api";

const AUTH_USER_KEY = "authUser";

export function setAuthSession(token: string, user: AuthUser): void {
  if (typeof window === "undefined") return;
  setAccessToken(token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  clearAccessToken();
  localStorage.removeItem(AUTH_USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken() && !!getAuthUser();
}
