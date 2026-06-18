"use client";

import Button from "@/app/components/ui/button/Button";
import { useAdminAuth } from "../hooks/useAdminAuth";

type AdminShellProps = {
  children: React.ReactNode;
};

const AdminShell = ({ children }: AdminShellProps) => {
  const { user, isLoading, logout } = useAdminAuth();

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
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <p className="text-lg font-bold text-[#705295]">InstaVisit Admin</p>
          <p className="text-xs text-gray-500">Admin Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-600 sm:inline">
            {user.firstName} {user.lastName}
          </span>
          <Button
            type="button"
            label="Logout"
            width="w-auto"
            className="px-5"
            onClick={logout}
          />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminShell;
