"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const visiblePages = Array.from({ length: Math.min(totalPages, 8) }, (_, index) => {
    if (totalPages <= 8) {
      return index + 1;
    }

    if (currentPage <= 4) {
      return index + 1;
    }

    if (currentPage >= totalPages - 3) {
      return totalPages - 7 + index;
    }

    return currentPage - 3 + index;
  });

  return (
    <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"
          aria-label="Previous page"
        >
          <HiChevronLeft size={16} />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 ${
              page === currentPage
                ? "bg-[#705295] font-semibold text-white"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"
          aria-label="Next page"
        >
          <HiChevronRight size={16} />
        </button>
      </div>

      <p>
        {start} - {end} of {totalItems}
      </p>

      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-8 rounded-md border border-gray-200 bg-white px-2 outline-none focus:border-[#705295]"
        >
          {[10, 15, 25, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
