"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { ADMIN_NAV_ITEMS } from "../../constants/navigation";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AdminSidebarProps = {
  user: AuthUser;
};

const AdminSidebar = ({ user }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    const activeSections = ADMIN_NAV_ITEMS.filter((item) =>
      item.children?.some(
        (child) =>
          pathname === child.path || pathname.startsWith(`${child.path}/`),
      ),
    ).map((item) => item.label);

    setExpandedSections((current) => {
      const merged = new Set([...current, ...activeSections]);
      return Array.from(merged);
    });
  }, [pathname]);

  const toggleSection = (label: string) => {
    setExpandedSections((current) =>
      current.includes(label)
        ? current.filter((section) => section !== label)
        : [...current, label],
    );
  };

  const isPathActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-[80px] items-center px-6">
        <Image
          src="/assets/icons/instaVisit.svg"
          alt="InstaVisitRx+"
          width={160}
          height={36}
          priority
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children?.length);
            const isExpanded = expandedSections.includes(item.label);
            const isActive = item.path ? isPathActive(item.path) : false;
            const isChildActive = item.children?.some((child) =>
              isPathActive(child.path),
            );

            if (!hasChildren && item.path) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#EBE5F1] text-[#705295]"
                        : "text-[#666666] hover:bg-gray-50 hover:text-[#705295]"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isChildActive
                      ? "text-[#705295]"
                      : "text-[#666666] hover:bg-gray-50 hover:text-[#705295]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} />
                    {item.label}
                  </span>
                  {isExpanded ? (
                    <HiOutlineChevronUp size={16} />
                  ) : (
                    <HiOutlineChevronDown size={16} />
                  )}
                </button>

                {isExpanded && item.children ? (
                  <ul className="mt-1 space-y-1 pl-8">
                    {item.children.map((child) => {
                      const childActive = isPathActive(child.path);

                      return (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              childActive
                                ? "font-semibold text-[#705295]"
                                : "text-[#999999] hover:text-[#705295]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#705295] hover:bg-[#EBE5F1]"
          >
            <HiOutlineBell size={22} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EBE5F1] text-sm font-semibold text-[#705295]">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
