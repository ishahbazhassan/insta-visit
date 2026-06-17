"use client";

import Button from "@/app/components/ui/button/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const SettingsPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0A1E25]">My Account</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {user && (
          <p className="text-sm text-gray-600">
            {user.firstName} {user.lastName} · {user.email}
          </p>
        )}
        <div className="mt-6 max-w-xs">
          <Button type="button" label="Logout" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
