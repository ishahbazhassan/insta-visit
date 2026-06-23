"use client";

import { Toaster } from "react-hot-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProviderLayout from "./layout/ProviderLayout";

type ProviderShellProps = {
  children: React.ReactNode;
};

const ProviderShell = ({ children }: ProviderShellProps) => {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && user && user.role !== "PROVIDER") {
      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace(AUTH_ROUTES.login);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "PROVIDER") {
    return null;
  }

  return (
    <>
      <Toaster position="top-center" />
      <ProviderLayout user={user} onLogout={logout}>
        {children}
      </ProviderLayout>
    </>
  );
};

export default ProviderShell;
