"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROVIDER_LINKS } from "../../constants/navigation";

const ProviderSidebar = () => {
  const pathname = usePathname();

  const isLinkActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside className="relative z-20 flex h-full w-[102px] shrink-0 flex-col items-center border-r border-gray-100 bg-white">
      <style>{`
        aside nav::-webkit-scrollbar { display: none; }
        aside nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="scrollbar-hide flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto py-6">
        {PROVIDER_LINKS.map((link) => {
          const isActive = isLinkActive(link.path);
          const Icon = isActive && link.activeIcon ? link.activeIcon : link.icon;

          return (
            <div key={link.label} className="flex w-full flex-col items-center">
              <Link
                href={link.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? "text-[#705295]"
                    : "text-[#999999] hover:text-[#705295]"
                }`}
              >
                <Icon size={28} />
                <span className="text-center text-[12px] font-medium leading-tight px-1">
                  {link.label}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default ProviderSidebar;
