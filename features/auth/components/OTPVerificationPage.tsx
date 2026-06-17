"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

interface OTPProps {
  onNavigate: (page: "forgotPassword" | "resetPassword" | "login") => void;
  userEmail: string;
  nextStep: "dashboard" | "resetPassword";
}

const OTPVerificationPage: React.FC<OTPProps> = ({
  onNavigate,
  userEmail,
  nextStep,
}) => {
  const { control, handleSubmit } = useForm({ defaultValues: { otp: "" } });

  const { resendOtp, isLoading: isResending } = useForgotPassword(() => {});
  const { submitVerifyOtp, isLoading: isVerifying } = useVerifyOtp({
    userEmail,
    nextStep,
    onResetSuccess: () => onNavigate("resetPassword"),
  });

  const isLoading = isResending || isVerifying;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={() => onNavigate("forgotPassword")}>
          <FaArrowLeft size={20} />
        </button>
        <Heading title="OTP verification" />
      </div>
      <p className="text-[14px] text-[#0A1E25] mb-4">
        Code sent to{" "}
        <span className="text-[#705295] font-semibold">{userEmail}</span>
      </p>
      <form
        onSubmit={handleSubmit((data) => submitVerifyOtp(data.otp))}
      >
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
            disabled={isLoading || nextStep !== "resetPassword"}
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
