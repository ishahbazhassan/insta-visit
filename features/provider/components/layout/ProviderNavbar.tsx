"use client";

import Image from "next/image";
import { useState } from "react";
import ProfileMenu from "@/app/components/ui/profile/ProfileMenu";
import { LuClock } from "react-icons/lu";
import { PORTAL_HEADER_HEIGHT } from "@/lib/portal-layout";
import type { AuthUser } from "@/features/auth/types/auth.types";

type ProviderNavbarProps = {
  user: AuthUser;
  onLogout: () => void;
};

const ProviderNavbar = ({ user, onLogout }: ProviderNavbarProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

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

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 rounded-xl bg-[#EBE5F1] px-4 py-2">
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#705295]">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#666666]">
              <LuClock size={12} />
              <span>Priority Status</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            aria-label="Toggle availability"
            className={`h-6 w-12 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              isAvailable ? "bg-[#705295]" : "bg-gray-400"
            }`}
          >
            <div
              className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                isAvailable ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <ProfileMenu
          user={user}
          profileHref="/provider/settings"
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};

export default ProviderNavbar;
