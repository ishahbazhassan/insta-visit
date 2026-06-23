"use client";

import type { AuthUser } from "@/features/auth/types/auth.types";
import ProviderNavbar from "./ProviderNavbar";
import ProviderSidebar from "./ProviderSidebar";

type ProviderLayoutProps = {
  user: AuthUser;
  onLogout: () => void;
  children: React.ReactNode;
};

const ProviderLayout = ({ user, onLogout, children }: ProviderLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9]">
      <ProviderNavbar user={user} onLogout={onLogout} />

      <div className="flex min-h-0 flex-1 items-stretch">
        <ProviderSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default ProviderLayout;
