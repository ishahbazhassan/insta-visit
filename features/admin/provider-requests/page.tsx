"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/app/components/ui/inputs/SearchInput";
import AdminContentCard from "../components/layout/AdminContentCard";
import ProviderRequestsTable from "../components/provider-requests/ProviderRequestsTable";
import { useProviderRequests } from "../hooks/useProviderRequests";

const ProviderRequestsPage = () => {
  const [search, setSearch] = useState("");
  const { requests, isLoading, error } = useProviderRequests();

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return requests;
    }

    return requests.filter(
      (request) =>
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.phone.toLowerCase().includes(query),
    );
  }, [requests, search]);

  return (
    <AdminContentCard
      title="Provider Requests"
      action={
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Provider name"
        />
      }
    >
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading provider requests...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <ProviderRequestsTable requests={filteredRequests} />
      )}
    </AdminContentCard>
  );
};

export default ProviderRequestsPage;
