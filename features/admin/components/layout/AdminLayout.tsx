"use client";

import type { AuthUser } from "@/features/auth/types/auth.types";
import AdminNavbar from "./AdminNavbar";
import AdminPageHeading from "./AdminPageHeading";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
  user: AuthUser;
  onLogout: () => void;
  children: React.ReactNode;
};

const AdminLayout = ({ user, onLogout, children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9]">
      <AdminNavbar user={user} onLogout={onLogout} />

      <div className="flex min-h-0 flex-1 items-stretch">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <AdminPageHeading />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
