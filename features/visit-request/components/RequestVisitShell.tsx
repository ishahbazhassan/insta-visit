"use client";

import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

type RequestVisitShellProps = {
  children: React.ReactNode;
};

const RequestVisitShell = ({ children }: RequestVisitShellProps) => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Toaster position="top-center" />
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:px-8">
          <Link href="/">
            <Image
              src="/assets/icons/instaVisit.svg"
              alt="InstaVisitRx+"
              width={160}
              height={36}
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#705295] hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
};

export default RequestVisitShell;
