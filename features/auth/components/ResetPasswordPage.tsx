"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";

interface ResetPasswordPageProps {
  onNavigate: (page: "otpVerification" | "login") => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  onNavigate,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const loadToast = toast.loading("Updating password...");

    // Simulate API update
    setTimeout(() => {
      toast.success("Password reset! Please login.", { id: loadToast });
      onNavigate("login");
    }, 1500);
  };

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

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" label="Reset password" />
        </div>
      </form>
    </>
  );
};

export default ResetPasswordPage;
