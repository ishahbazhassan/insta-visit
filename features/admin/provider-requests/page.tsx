"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/app/components/ui/inputs/SearchInput";
import AdminContentCard from "../components/layout/AdminContentCard";
import ProviderRequestsTable from "../components/provider-requests/ProviderRequestsTable";
import { MOCK_PROVIDER_REQUESTS } from "../data/mock-providers";

const ProviderRequestsPage = () => {
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MOCK_PROVIDER_REQUESTS;
    }

    return MOCK_PROVIDER_REQUESTS.filter(
      (request) =>
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.phone.toLowerCase().includes(query),
    );
  }, [search]);

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
      <ProviderRequestsTable requests={filteredRequests} />
    </AdminContentCard>
  );
};

export default ProviderRequestsPage;
