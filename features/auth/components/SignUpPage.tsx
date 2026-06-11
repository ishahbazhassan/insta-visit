"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../../../app/components/ui/headings/Heading";
import InputField from "../../../app/components/ui/inputs/InputField";
import Button from "../../../app/components/ui/button/Button";
import SelectField from "../../../app/components/ui/inputs/SelectField";
import CheckboxField from "../../../app/components/ui/inputs/CheckboxField";

interface SignUpPageProps {
  onNavigate: (page: "login") => void;
  onSignUpSuccess: (email: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({
  onNavigate,
  onSignUpSuccess,
}) => {
  const { control, handleSubmit, watch, setValue } = useForm();

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

  const onSubmit = (data: any) => {
    const loadToast = toast.loading("Processing request...");
    setTimeout(() => {
      toast.success("Request processed!", { id: loadToast });
      onSignUpSuccess(data.email || "User");
    }, 1200);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <Heading title="Sign Up" className="mb-6 text-center" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Personal Information */}
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

        {/* Professional Information */}
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

        {/* Address Information */}
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
          <Button type="submit" label="Send Request" />
        </div>
      </form>
      <div className="mt-6 text-center text-[14px] text-[#999999] mb-4">
        Existing Account?{" "}
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="text-[#705295] font-bold hover:underline"
        >
          Sign In.
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
