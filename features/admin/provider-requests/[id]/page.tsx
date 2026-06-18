"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ProviderRequestDetailView from "../../components/provider-requests/ProviderRequestDetailView";
import { useProviderRequestDetail } from "../../hooks/useProviderRequestDetail";

const ProviderRequestDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { request, isLoading, isSubmitting, error, approve, reject } =
    useProviderRequestDetail(params.id);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Loading provider request...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-red-500">
          {error ?? "Provider request not found."}
        </p>
        <Link
          href="/admin/provider-requests"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#705295]"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Provider Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        href="/admin/provider-requests"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#705295] hover:underline"
      >
        <HiOutlineArrowLeft size={16} />
        Back
      </Link>

      <ProviderRequestDetailView
        request={request}
        isSubmitting={isSubmitting}
        onApprove={approve}
        onReject={reject}
      />
    </div>
  );
};

export default ProviderRequestDetailPage;
