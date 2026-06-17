"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";

interface ForgotProps {
  onNavigate: (page: "login") => void;
  onForgotSuccess: (email: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotProps> = ({
  onNavigate,
  onForgotSuccess,
}) => {
  const { control, handleSubmit } = useForm({ defaultValues: { email: "" } });
  const { submitForgotPassword, isLoading } = useForgotPassword(onForgotSuccess);

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
      <form onSubmit={handleSubmit(submitForgotPassword)}>
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
          <Button type="submit" label="Next" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
