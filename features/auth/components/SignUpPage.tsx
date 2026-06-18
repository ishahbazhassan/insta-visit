"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import SelectField from "../../../app/components/ui/inputs/SelectField";
import CheckboxField from "../../../app/components/ui/inputs/CheckboxField";
import { AUTH_ROUTES } from "../constants/routes";
import type { ProviderRequestPayload } from "../types/auth.types";
import { useProviderRequest } from "../hooks/useProviderRequest";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit, watch, setValue } =
    useForm<ProviderRequestPayload>();
  const { submitProviderRequest, isLoading } = useProviderRequest(() =>
    router.push(AUTH_ROUTES.login),
  );

  const sameAsHomeAddress = watch("sameAsHomeAddress");
  const homeStreetAddress = watch("homeStreetAddress");
  const homeCity = watch("homeCity");
  const homeState = watch("homeState");
  const homeZipCode = watch("homeZipCode");

  useEffect(() => {
    if (sameAsHomeAddress) {
      const combinedAddress = [
        homeStreetAddress,
        homeCity,
        homeState,
        homeZipCode,
      ]
        .filter(Boolean)
        .join(", ");
      setValue("practiceAddress", combinedAddress);
    } else {
      setValue("practiceAddress", "");
    }
  }, [
    sameAsHomeAddress,
    homeStreetAddress,
    homeCity,
    homeState,
    homeZipCode,
    setValue,
  ]);

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <Heading title="Request Provider Access" className="mb-6 text-center" />
      <form
        onSubmit={handleSubmit(submitProviderRequest)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First name"
            name="firstName"
            type="text"
            control={control}
            placeholder="Enter your first name"
            required
          />
          <InputField
            label="Last name"
            name="lastName"
            type="text"
            control={control}
            placeholder="Enter your last name"
            required
          />
        </div>
        <InputField
          label="Email address"
          name="email"
          type="email"
          control={control}
          placeholder="e.g. abc_john@email.com"
          required
        />
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          control={control}
          placeholder="(000) 000 0000"
          required
        />
        <InputField
          label="NPI Number"
          name="npiNumber"
          type="tel"
          control={control}
          placeholder="(000) 000 0000"
          required
        />
        <SelectField
          label="Credentials"
          name="credentials"
          control={control}
          options={[{ value: "md", label: "MD" }]}
          placeholder="Select Credentials"
          required
        />
        <InputField
          label="License Number"
          name="licenseNumber"
          type="text"
          control={control}
          placeholder="Enter license number"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="License Expiration Date"
            name="licenseExpirationDate"
            type="text"
            control={control}
            placeholder="MM/DD/YYYY"
            required
          />
          <InputField
            label="License State"
            name="licenseState"
            type="text"
            control={control}
            placeholder="e.g. AL"
            required
          />
        </div>
        <InputField
          label="Home Street Address"
          name="homeStreetAddress"
          type="text"
          control={control}
          placeholder="Enter home street address"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="City"
            name="homeCity"
            type="text"
            control={control}
            placeholder="Enter city"
            required
          />
          <InputField
            label="State"
            name="homeState"
            type="text"
            control={control}
            placeholder="Enter state"
            required
          />
        </div>
        <InputField
          label="Zip Code"
          name="homeZipCode"
          type="text"
          control={control}
          placeholder="Enter zip code"
          required
        />
        <InputField
          label="Practice Address"
          name="practiceAddress"
          type="text"
          control={control}
          placeholder="Enter Practice Address"
          required
          disabled={sameAsHomeAddress}
        />
        <CheckboxField
          label="Same as Home Address"
          name="sameAsHomeAddress"
          control={control}
          id="same-as-home-address"
        />

        <div className="mt-4">
          <Button type="submit" label="Send Request" disabled={isLoading} />
        </div>
      </form>
      <div className="mt-6 text-center text-[14px] text-[#999999] mb-4">
        Existing Account?{" "}
        <button
          type="button"
          onClick={() => router.push(AUTH_ROUTES.login)}
          className="text-[#705295] font-bold hover:underline"
        >
          Sign In.
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
