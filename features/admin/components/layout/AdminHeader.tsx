"use client";

import { usePathname } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { getAdminBreadcrumb, getAdminPageTitle } from "../../constants/navigation";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AdminHeaderProps = {
  user: AuthUser;
};

const AdminHeader = ({ user }: AdminHeaderProps) => {
  const pathname = usePathname();
  const pageTitle = getAdminPageTitle(pathname);
  const breadcrumb = getAdminBreadcrumb(pathname);

  return (
    <header
      className="sticky top-0 z-10 flex min-h-[80px] items-center justify-between border-b border-gray-100 bg-white px-8"
      style={{
        boxShadow: "0px 2px 14px 0px #00000021",
      }}
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0A1E25]">{pageTitle}</h1>
        {breadcrumb ? (
          <p className="mt-1 text-sm text-[#999999]">{breadcrumb}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Messages"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#705295] transition-colors hover:bg-[#EBE5F1]"
        >
          <HiOutlineMail size={22} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#EBE5F1] text-sm font-semibold text-[#705295]">
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
