"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { AUTH_ROUTES } from "../constants/routes";
import { setResetEmail } from "../lib/session";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({ defaultValues: { email: "" } });
  const { submitForgotPassword, isLoading } = useForgotPassword((email) => {
    setResetEmail(email);
    router.push(AUTH_ROUTES.verifyOtp);
  });

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push(AUTH_ROUTES.login)}
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
