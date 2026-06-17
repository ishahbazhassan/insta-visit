"use client";

import type { AuthUser } from "@/features/auth/types/auth.types";
import ProviderNavbar from "./ProviderNavbar";
import ProviderSidebar from "./ProviderSidebar";

type ProviderLayoutProps = {
  user: AuthUser;
  children: React.ReactNode;
};

const ProviderLayout = ({ user, children }: ProviderLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9]">
      <ProviderNavbar user={user} />

      <div className="flex flex-1">
        <ProviderSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default ProviderLayout;
