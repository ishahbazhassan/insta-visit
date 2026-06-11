"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";

interface ForgotProps {
  onNavigate: (page: any) => void;
  onForgotSuccess: (email: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotProps> = ({
  onNavigate,
  onForgotSuccess,
}) => {
  const { control, handleSubmit } = useForm({ defaultValues: { email: "" } });

  const onSubmit = (data: any) => {
    const loadToast = toast.loading("Requesting OTP...");
    setTimeout(() => {
      toast.success("OTP sent!", { id: loadToast });
      onForgotSuccess(data.email);
    }, 1200);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading title="Forgot password?" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <InputField
            label="Email address"
            name="email"
            type="email"
            control={control}
            required
            placeholder="email@example.com"
          />
        </div>
        <div className="mt-4">
          <Button type="submit" label="Next" />
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
