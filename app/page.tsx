"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/app/components/ui/button/Button";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { isAuthenticated } from "@/features/auth/lib/session";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/provider/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <Image
          src="/assets/icons/instaVisit.svg"
          alt="InstaVisitRx+"
          width={220}
          height={48}
          className="mx-auto"
          priority
        />

        <h1 className="mt-8 text-2xl font-bold text-[#0A1E25]">
          Welcome to InstaVisit
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Care for every condition, instantly.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Button
            type="button"
            label="Login"
            onClick={() => router.push(AUTH_ROUTES.login)}
          />
          <Button
            type="button"
            label="Sign Up"
            bgColor="bg-white"
            textColor="text-[#705295]"
            className="border-2 border-[#705295]"
            onClick={() => router.push(AUTH_ROUTES.signup)}
          />
        </div>
      </div>
    </div>
  );
}
