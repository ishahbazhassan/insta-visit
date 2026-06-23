"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePencil } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import LogoutConfirmModal from "@/app/components/ui/modal/LogoutConfirmModal";
import type { AuthUser } from "@/features/auth/types/auth.types";

type ProfileMenuProps = {
  user: AuthUser;
  profileHref?: string;
  onLogout: () => void;
};

const ProfileMenu = ({ user, profileHref, onLogout }: ProfileMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  const handleUpdateProfile = () => {
    setIsDropdownOpen(false);

    if (!profileHref) {
      toast("Update profile coming soon");
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          aria-label="Open profile menu"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 transition-all hover:bg-gray-50"
        >
          <div className="flex h-full w-full items-center justify-center bg-[#EBE5F1] text-sm font-semibold text-[#705295]">
            {initials}
          </div>
        </button>

        {isDropdownOpen ? (
          <div className="absolute right-0 z-20 mt-2 w-[200px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            {profileHref ? (
              <Link
                href={profileHref}
                onClick={() => setIsDropdownOpen(false)}
                className="flex w-full items-center gap-3 bg-[#EBE5F1] px-4 py-3 text-sm font-medium text-[#705295] transition-colors hover:bg-[#E2D8EC]"
              >
                <HiOutlinePencil size={18} />
                Update Profile
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="flex w-full items-center gap-3 bg-[#EBE5F1] px-4 py-3 text-left text-sm font-medium text-[#705295] transition-colors hover:bg-[#E2D8EC]"
              >
                <HiOutlinePencil size={18} />
                Update Profile
              </button>
            )}

            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#F76D00] transition-colors hover:bg-gray-50"
            >
              <LuLogOut size={18} />
              Log Out
            </button>
          </div>
        ) : null}
      </div>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default ProfileMenu;
