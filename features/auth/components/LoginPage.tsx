"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import { AUTH_ROUTES } from "../constants/routes";
import { useLogin } from "../hooks/useLogin";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { submitLogin, isLoading } = useLogin((user) => {
    if (user.role === "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }

    router.push("/provider/dashboard");
  });

  return (
    <>
      <Heading title="Login" className="mb-6" />
      <form onSubmit={handleSubmit(submitLogin)}>
        <div className="flex flex-col gap-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            required
            placeholder="email@example.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
            required
            placeholder="Enter password"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => router.push(AUTH_ROUTES.forgotPassword)}
            className="text-[#F76D00] text-[14px] font-bold hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="mt-4">
          <Button type="submit" label="Login" disabled={isLoading} />
        </div>
      </form>
      <div className="mt-6 text-center text-[14px] text-[#999999]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push(AUTH_ROUTES.signup)}
          className="text-[#705295] font-bold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default LoginPage;
