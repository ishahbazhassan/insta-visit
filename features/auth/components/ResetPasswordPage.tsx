"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { useResetPassword } from "../hooks/useResetPassword";

interface ResetPasswordPageProps {
  onNavigate: (page: "otpVerification" | "login") => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  onNavigate,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });
  const { submitResetPassword, isLoading } = useResetPassword(() =>
    onNavigate("login"),
  );

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => onNavigate("otpVerification")}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading title="Reset password" />
      </div>

      <form onSubmit={handleSubmit(submitResetPassword)}>
        <div className="flex flex-col gap-2">
          <InputField
            label="New password"
            name="newPassword"
            type="password"
            control={control}
            placeholder="Choose a strong password"
            required
          />
          <InputField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            control={control}
            placeholder="Re-enter new password"
            required
          />
        </div>

        <div className="mt-4">
          <Button type="submit" label="Reset password" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default ResetPasswordPage;
