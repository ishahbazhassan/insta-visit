"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Button from "@/app/components/ui/button/Button";
import Heading from "@/app/components/ui/headings/Heading";
import RequestVisitShell from "./RequestVisitShell";

const VisitRequestSuccessContent = () => {
  const searchParams = useSearchParams();
  const visitCode = searchParams.get("visitCode");
  const serviceName = searchParams.get("service");

  return (
    <RequestVisitShell>
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE5F1] text-2xl text-[#705295]">
          ✓
        </div>
        <Heading
          title="Request Submitted"
          className="mb-3 text-center text-2xl"
        />
        <p className="text-sm text-gray-600">
          Your asynchronous visit request has been submitted successfully. A
          provider will review your request.
        </p>

        {visitCode ? (
          <p className="mt-4 text-sm font-medium text-[#0A1E25]">
            Visit code: <span className="text-[#705295]">{visitCode}</span>
          </p>
        ) : null}

        {serviceName ? (
          <p className="mt-2 text-sm text-gray-600">Service: {serviceName}</p>
        ) : null}

        <Link href="/" className="mt-8 block">
          <Button type="button" label="Back to Home" width="w-full" />
        </Link>
      </div>
    </RequestVisitShell>
  );
};

const VisitRequestSuccessPage = () => (
  <Suspense
    fallback={
      <RequestVisitShell>
        <p className="text-gray-600">Loading...</p>
      </RequestVisitShell>
    }
  >
    <VisitRequestSuccessContent />
  </Suspense>
);

export default VisitRequestSuccessPage;
