"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import ProviderLayout from "./layout/ProviderLayout";

type ProviderShellProps = {
  children: React.ReactNode;
};

const ProviderShell = ({ children }: ProviderShellProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ProviderLayout user={user}>{children}</ProviderLayout>
  );
};

export default ProviderShell;
