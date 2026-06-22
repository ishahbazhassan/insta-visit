"use client";

import { Toaster } from "react-hot-toast";
import { useAdminAuth } from "../hooks/useAdminAuth";
import AdminLayout from "./layout/AdminLayout";

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
    <>
      <Toaster position="top-center" />
      <AdminLayout user={user} onLogout={logout}>
        {children}
      </AdminLayout>
    </>
  );
};

export default AdminShell;
