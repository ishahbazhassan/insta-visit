"use client";

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
  const { user, isLoading } = useAuth();

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

  return <ProviderLayout user={user}>{children}</ProviderLayout>;
};

export default ProviderShell;
