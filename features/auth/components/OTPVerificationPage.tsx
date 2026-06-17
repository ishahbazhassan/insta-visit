"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { AUTH_ROUTES } from "../constants/routes";
import { getResetEmail } from "../lib/session";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

const OTPVerificationPage: React.FC = () => {
  const router = useRouter();
  const userEmail = getResetEmail() ?? "";
  const { control, handleSubmit } = useForm({ defaultValues: { otp: "" } });

  useEffect(() => {
    if (!userEmail) {
      router.replace(AUTH_ROUTES.forgotPassword);
    }
  }, [userEmail, router]);

  const { resendOtp, isLoading: isResending } = useForgotPassword(() => {});
  const { submitVerifyOtp, isLoading: isVerifying } = useVerifyOtp({
    userEmail,
    onSuccess: () => router.push(AUTH_ROUTES.resetPassword),
  });

  const isLoading = isResending || isVerifying;

  if (!userEmail) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push(AUTH_ROUTES.forgotPassword)}
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading title="OTP verification" />
      </div>
      <p className="text-[14px] text-[#0A1E25] mb-4">
        Code sent to{" "}
        <span className="text-[#705295] font-semibold">{userEmail}</span>
      </p>
      <form onSubmit={handleSubmit((data) => submitVerifyOtp(data.otp))}>
        <InputField
          label="One-Time Passcode"
          name="otp"
          type="text"
          control={control}
          placeholder="000000"
          required
        />
        <div className="flex justify-end mt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => resendOtp(userEmail)}
            className="flex items-center gap-1 text-[#F76D00] text-[14px] font-bold disabled:opacity-50"
          >
            <FaRedoAlt size={14} /> Reset OTP
          </button>
        </div>
        <div className="mt-4">
          <Button type="submit" label="Verify" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default OTPVerificationPage;
