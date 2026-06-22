"use client";

import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import Button from "@/app/components/ui/button/Button";
import { PORTAL_HEADER_HEIGHT } from "@/lib/portal-layout";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AdminNavbarProps = {
  user: AuthUser;
  onLogout: () => void;
};

const AdminNavbar = ({ user, onLogout }: AdminNavbarProps) => {
  return (
    <header
      className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-100 px-8 transition-all"
      style={{
        height: PORTAL_HEADER_HEIGHT,
        boxShadow: "0px 2px 14px 0px #00000021",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center">
        <Image
          src="/assets/icons/instaVisit.svg"
          alt="InstaVisitRx+"
          width={180}
          height={40}
          priority
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Messages"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#705295] transition-colors hover:bg-[#EBE5F1]"
        >
          <HiOutlineMail size={22} />
        </button>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-sm text-gray-600">
            {user.firstName} {user.lastName}
          </span>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#EBE5F1] text-sm font-semibold text-[#705295]">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
        </div>

        <Button
          type="button"
          label="Logout"
          width="w-auto"
          className="px-5"
          onClick={onLogout}
        />
      </div>
    </header>
  );
};

export default AdminNavbar;
