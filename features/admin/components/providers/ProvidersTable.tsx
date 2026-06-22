"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlinePencil,
} from "react-icons/hi";
import { HiOutlinePause } from "react-icons/hi2";
import DataTable, {
  type DataTableColumn,
} from "@/app/components/ui/table/DataTable";
import StatusBadge from "@/app/components/ui/badges/StatusBadge";
import ToggleSwitch from "@/app/components/ui/toggle/ToggleSwitch";
import DropdownMenu from "@/app/components/ui/dropdown/DropdownMenu";
import Pagination from "@/app/components/ui/pagination/Pagination";
import type { ProviderListItem } from "../../types/provider.types";

type ProvidersTableProps = {
  providers: ProviderListItem[];
  updatingProviderId?: string | null;
  onToggleStatus: (id: string, isActive: boolean) => Promise<void>;
};

const ProvidersTable = ({
  providers,
  updatingProviderId = null,
  onToggleStatus,
}: ProvidersTableProps) => {
  const [rows, setRows] = useState(providers);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setRows(providers);
    setCurrentPage(1);
  }, [providers]);

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, currentPage, pageSize]);

  const columns: DataTableColumn<ProviderListItem>[] = [
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
      key: "patientsAttended",
      header: "Patient Attended",
      sortable: true,
      render: (row) => row.patientsAttended,
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
        <div className="flex items-center gap-3">
          <ToggleSwitch
            checked={row.isActive}
            disabled={updatingProviderId === row.id}
            ariaLabel={`Toggle ${row.name} status`}
            onChange={(checked) => {
              void onToggleStatus(row.id, checked);
            }}
          />
          <button
            type="button"
            aria-label="View documents"
            onClick={() => toast("Documents view coming soon")}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EBE5F1] text-[#705295]"
          >
            <HiOutlineDocumentText size={16} />
          </button>
          <DropdownMenu
            items={[
              {
                label: "Edit Details",
                icon: HiOutlinePencil,
                onClick: () => toast("Edit details coming soon"),
              },
              {
                label: "Paused",
                icon: HiOutlinePause,
                onClick: () => toast("Pause provider coming soon"),
              },
              {
                label: "Visits",
                icon: HiOutlineBookOpen,
                onClick: () => toast("Visits view coming soon"),
              },
            ]}
          />
        </div>
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

export default ProvidersTable;
