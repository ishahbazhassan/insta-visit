"use client";

import Button from "@/app/components/ui/button/Button";
import ReadOnlyField from "@/app/components/ui/fields/ReadOnlyField";
import type { ProviderRequestDetail } from "../../types/provider.types";

type ProviderRequestDetailViewProps = {
  request: ProviderRequestDetail;
  isSubmitting?: boolean;
  onApprove: () => void;
  onReject: () => void;
};

const ProviderRequestDetailView = ({
  request,
  isSubmitting = false,
  onApprove,
  onReject,
}: ProviderRequestDetailViewProps) => {
  const fullName = `${request.firstName} ${request.lastName}`.trim();

  return (
    <div className="rounded-2xl border border-[#E8E0D4] bg-[#F8F4EE] p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EBE5F1] text-2xl font-bold text-[#705295]">
          {request.firstName.charAt(0)}
          {request.lastName.charAt(0)}
        </div>
        <h2 className="text-3xl font-bold text-[#0A1E25]">{fullName}</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReadOnlyField label="First name" value={request.firstName} />
          <ReadOnlyField label="Last name" value={request.lastName} />
        </div>

        <ReadOnlyField label="Email address" value={request.email} />
        <ReadOnlyField label="Phone Number" value={request.phone} />
        <ReadOnlyField label="NPI Number" value={request.npiNumber} />
        <ReadOnlyField label="Credentials" value={request.credentials} />
        <ReadOnlyField label="License Number" value={request.licenseNumber} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReadOnlyField
            label="License Expiration Date"
            value={request.licenseExpirationDate}
          />
          <ReadOnlyField label="License State" value={request.licenseState} />
        </div>

        <ReadOnlyField label="Street" value={request.homeStreetAddress} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReadOnlyField label="City" value={request.homeCity} />
          <ReadOnlyField label="State" value={request.homeState} />
        </div>

        <ReadOnlyField label="Zip Code" value={request.homeZipCode} />
        <ReadOnlyField label="Practice Address" value={request.practiceAddress} />
      </div>

      {request.status === "pending" ? (
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onReject}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-semibold text-[#EF4444] transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            Decline
          </button>
          <Button
            type="button"
            label="Approve"
            width="w-auto"
            className="px-8"
            disabled={isSubmitting}
            onClick={onApprove}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProviderRequestDetailView;
