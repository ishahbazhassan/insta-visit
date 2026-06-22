"use client";

import type { AuthUser } from "@/features/auth/types/auth.types";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
  user: AuthUser;
  onLogout: () => void;
  children: React.ReactNode;
};

const AdminLayout = ({ user, onLogout, children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <AdminSidebar user={user} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
