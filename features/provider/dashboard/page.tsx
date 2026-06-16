"use client";

import Button from "@/app/components/ui/button/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ProviderDashboard = () => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1E25]">
              Welcome, {user.firstName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">Provider Dashboard</p>
          </div>
          <Button
            type="button"
            label="Logout"
            width="w-auto"
            className="px-6"
            onClick={logout}
          />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0A1E25]">
            Your profile
          </h2>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium text-[#0A1E25]">
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium text-[#0A1E25]">{user.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
