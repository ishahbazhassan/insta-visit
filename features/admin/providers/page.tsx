"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/button/Button";
import SearchInput from "@/app/components/ui/inputs/SearchInput";
import AdminContentCard from "../components/layout/AdminContentCard";
import ProvidersTable from "../components/providers/ProvidersTable";
import { useApprovedProviders } from "../hooks/useApprovedProviders";

const AllProvidersPage = () => {
  const [search, setSearch] = useState("");
  const { providers, isLoading, error, updatingProviderId, toggleProviderStatus } =
    useApprovedProviders();

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return providers;
    }

    return providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(query) ||
        provider.email.toLowerCase().includes(query) ||
        provider.phone.toLowerCase().includes(query),
    );
  }, [providers, search]);

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
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading providers...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <ProvidersTable
          providers={filteredProviders}
          updatingProviderId={updatingProviderId}
          onToggleStatus={toggleProviderStatus}
        />
      )}
    </AdminContentCard>
  );
};

export default AllProvidersPage;
