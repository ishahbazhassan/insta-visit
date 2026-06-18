"use client";

import { HiOutlineSearch } from "react-icons/hi";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) => {
  return (
    <div className={`relative w-full max-w-[280px] ${className}`}>
      <HiOutlineSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
        size={18}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-[44px] w-full rounded-full border border-[#E8E8E8] bg-white pl-11 pr-4 text-sm text-[#0A1E25] outline-none transition-colors placeholder:text-[#999999] focus:border-[#705295]"
      />
    </div>
  );
};

export default SearchInput;
