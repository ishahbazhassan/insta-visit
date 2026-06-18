"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/button/Button";
import SearchInput from "@/app/components/ui/inputs/SearchInput";
import AdminContentCard from "../components/layout/AdminContentCard";
import ProvidersTable from "../components/providers/ProvidersTable";
import { MOCK_PROVIDERS } from "../data/mock-providers";

const AllProvidersPage = () => {
  const [search, setSearch] = useState("");

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MOCK_PROVIDERS;
    }

    return MOCK_PROVIDERS.filter(
      (provider) =>
        provider.name.toLowerCase().includes(query) ||
        provider.email.toLowerCase().includes(query) ||
        provider.phone.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <AdminContentCard
      title="All Providers"
      action={
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Provider name"
          />
          <Button
            type="button"
            label="Add New Provider"
            width="w-auto"
            bgColor="bg-[#EBE5F1]"
            textColor="text-[#705295]"
            className="whitespace-nowrap px-5"
            onClick={() => toast("Add provider flow coming soon")}
          />
        </div>
      }
    >
      <ProvidersTable providers={filteredProviders} />
    </AdminContentCard>
  );
};

export default AllProvidersPage;
