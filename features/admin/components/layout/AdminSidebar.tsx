"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import {
  PORTAL_SIDEBAR_MIN_HEIGHT,
  PORTAL_SIDEBAR_WIDTH,
} from "@/lib/portal-layout";
import { ADMIN_NAV_ITEMS } from "../../constants/navigation";

const AdminSidebar = () => {
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
    <aside
      className="relative z-20 flex shrink-0 self-stretch flex-col border-r border-gray-100 bg-white"
      style={{
        width: PORTAL_SIDEBAR_WIDTH,
        minHeight: PORTAL_SIDEBAR_MIN_HEIGHT,
      }}
    >
      <style>{`
        aside nav::-webkit-scrollbar { display: none; }
        aside nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="scrollbar-hide flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto px-1 py-6">
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
              <div key={item.label} className="flex w-full flex-col items-center">
                <Link
                  href={item.path}
                  className={`flex w-full flex-col items-center gap-1 transition-colors ${
                    isActive
                      ? "text-[#705295]"
                      : "text-[#999999] hover:text-[#705295]"
                  }`}
                >
                  <Icon size={28} />
                  <span className="px-1 text-center text-[12px] font-medium leading-tight">
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          }

          return (
            <div key={item.label} className="flex w-full flex-col items-center">
              <button
                type="button"
                onClick={() => toggleSection(item.label)}
                className={`flex w-full flex-col items-center gap-1 transition-colors ${
                  isChildActive
                    ? "text-[#705295]"
                    : "text-[#999999] hover:text-[#705295]"
                }`}
              >
                <Icon size={28} />
                <span className="px-1 text-center text-[12px] font-medium leading-tight">
                  {item.label}
                </span>
                {isExpanded ? (
                  <HiOutlineChevronUp size={14} />
                ) : (
                  <HiOutlineChevronDown size={14} />
                )}
              </button>

              {isExpanded && item.children ? (
                <div className="mt-2 w-full rounded-lg bg-[#F5F5F5] px-2 py-2">
                  <ul className="space-y-2">
                    {item.children.map((child) => {
                      const childActive = isPathActive(child.path);

                      return (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            className={`block text-center text-[11px] leading-snug transition-colors ${
                              childActive
                                ? "font-semibold text-[#705295]"
                                : "text-[#666666] hover:text-[#705295]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
