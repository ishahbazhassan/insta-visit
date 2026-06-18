"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { HiOutlineDotsVertical } from "react-icons/hi";

export type DropdownMenuItem = {
  label: string;
  icon?: IconType;
  onClick: () => void;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  ariaLabel?: string;
};

const DropdownMenu = ({
  items,
  ariaLabel = "Open actions menu",
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[#705295] transition-colors hover:bg-[#EBE5F1]"
      >
        <HiOutlineDotsVertical size={18} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 min-w-[180px] rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[#0A1E25] hover:bg-gray-50"
              >
                {Icon ? <Icon size={16} className="text-[#705295]" /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
