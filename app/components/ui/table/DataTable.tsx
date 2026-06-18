import { HiOutlineSelector } from "react-icons/hi";
import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
};

function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#705295] text-left text-sm font-semibold text-white">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 first:rounded-tl-xl last:rounded-tr-xl ${column.className ?? ""}`}
              >
                <span className="inline-flex items-center gap-1">
                  {column.header}
                  {column.sortable ? <HiOutlineSelector size={14} /> : null}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-gray-100 text-sm text-[#0A1E25] last:border-b-0"
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-4 ${column.className ?? ""}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
