"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ProviderRequestDetailView from "../../components/provider-requests/ProviderRequestDetailView";
import { getProviderRequestDetail } from "../../data/mock-providers";

const ProviderRequestDetailPage = () => {
  const params = useParams<{ id: string }>();
  const request = getProviderRequestDetail(params.id);

  if (!request) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Provider request not found.</p>
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

      <ProviderRequestDetailView request={request} />
    </div>
  );
};

export default ProviderRequestDetailPage;
