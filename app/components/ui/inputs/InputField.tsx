import { useState } from "react";
import {
  Controller,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorsMessage from "./ErrorMessage";

export interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type: "text" | "password" | "email" | "number" | "tel" | "";
  placeholder?: string;
  required?: boolean;
  className?: string;
  height?: string;
  hideStar?: boolean;
  disabled?: boolean;
  rules?: Record<string, any>;
  onChange?: (value: any) => void;
}

function InputField<T extends FieldValues>({
  label,
  name,
  control,
  type,
  required = false,
  className,
  height,
  placeholder,
  hideStar = false,
  rules = {},
  onChange: customOnChange,
  disabled = false,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputHeight = height || "h-[48px]"; // Adjusted for the standard look in the image
  const isPasswordType = type === "password";

  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""}`}>
      {/* Label placed outside the input container */}
      <label
        htmlFor={String(name)}
        className="text-[14px] font-medium text-[#000000]"
      >
        {label}
        {required && !hideStar && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          ...(required ? { required: `${label} is required` } : {}),
          ...(type === "email"
            ? {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }
            : {}),
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => {
          const handleInternalChange = (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const val =
              type === "number" ? e.target.valueAsNumber : e.target.value;
            field.onChange(val);
            if (customOnChange) customOnChange(val);
          };

          return (
            <div className="relative w-full">
              <input
                {...field}
                id={String(name)}
                type={
                  isPasswordType ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                disabled={disabled}
                className={`
                  w-full rounded-lg px-4 text-[14px] outline-none transition-all
                  ${inputHeight}
                  /* Custom Border and Colors */
                  border border-[#D4CFCC] bg-white text-[#999999]
                  placeholder:text-[#999999]/60
                  ${error ? "border-red-500" : ""}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-text"}
                `}
                value={field.value ?? ""}
                onChange={handleInternalChange}
              />

              {isPasswordType && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999]"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              )}

              {error && (
                <div className="mt-1">
                  <ErrorsMessage title={error.message} className="text-left" />
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default InputField;
