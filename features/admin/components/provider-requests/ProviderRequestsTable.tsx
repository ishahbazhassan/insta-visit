"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import DataTable, {
  type DataTableColumn,
} from "@/app/components/ui/table/DataTable";
import StatusBadge from "@/app/components/ui/badges/StatusBadge";
import Pagination from "@/app/components/ui/pagination/Pagination";
import type { ProviderRequestItem } from "../../types/provider.types";

type ProviderRequestsTableProps = {
  requests: ProviderRequestItem[];
};

const ProviderRequestsTable = ({ requests }: ProviderRequestsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [requests]);

  const totalItems = requests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return requests.slice(start, start + pageSize);
  }, [requests, currentPage, pageSize]);

  const columns: DataTableColumn<ProviderRequestItem>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => row.name,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (row) => row.email,
    },
    {
      key: "phone",
      header: "Phone",
      sortable: true,
      render: (row) => row.phone,
    },
    {
      key: "education",
      header: "Education",
      sortable: true,
      render: (row) => row.education,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => <StatusBadge variant={row.status} />,
    },
    {
      key: "action",
      header: "Action",
      sortable: true,
      render: (row) => (
        <Link
          href={`/admin/provider-requests/${row.id}`}
          aria-label={`View request for ${row.name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#EBE5F1] text-[#705295] transition-colors hover:bg-[#705295] hover:text-white"
        >
          <HiOutlineDocumentText size={16} />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={paginatedRows}
        rowKey={(row) => row.id}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default ProviderRequestsTable;
