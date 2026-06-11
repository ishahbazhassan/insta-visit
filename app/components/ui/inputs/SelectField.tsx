import React, { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Select, {
  components,
  type MultiValue,
  type SingleValue,
  type StylesConfig,
} from "react-select";
import { FaChevronDown } from "react-icons/fa";
import ErrorsMessage from "./ErrorMessage";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  label?: string; // Optional label to support header-style selects
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
  height?: string;
  disabled?: boolean;
}

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <FaChevronDown
      style={{
        color: props.selectProps.isDisabled ? "#999999" : "#271100",
      }}
      className="text-sm transition-transform duration-200"
    />
  </components.DropdownIndicator>
);

const customStyles = (
  height: string,
  hasError: boolean,
): StylesConfig<Option, boolean> => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    border: `1px solid ${hasError ? "#EF4444" : state.isFocused ? "#705295" : "#D4CFCC"}`,
    boxShadow: "none",
    borderRadius: "0.75rem", // rounded-xl
    padding: "0 8px",
    cursor: "pointer",
    minHeight: height,
    height: height,
    transition: "all 0.2s",
    "&:hover": {
      borderColor: hasError ? "#EF4444" : "#705295",
    },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 8px" }),
  singleValue: (base) => ({
    ...base,
    color: "#271100",
    fontSize: "14px",
    fontWeight: "500",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#999999",
    fontSize: "14px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    border: "1px solid #D4CFCC",
    boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#F9F9F9"
      : state.isFocused
        ? "#F3F4F6"
        : "transparent",
    color: "#271100",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    "&:active": { backgroundColor: "#E5E7EB" },
  }),
});

function SelectField<T extends FieldValues>({
  label,
  name,
  control,
  options,
  isMulti = false,
  required = false,
  className = "",
  placeholder = "Select...",
  height = "48px",
  disabled = false,
}: SelectFieldProps<T>) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="text-[14px] font-medium text-[#000000]">
          {label} {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label || name} is required` } : {}}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <Select
              {...field}
              id={String(name)}
              styles={customStyles(height, !!error)}
              options={options}
              isMulti={isMulti}
              placeholder={placeholder}
              isDisabled={disabled}
              onBlur={field.onBlur}
              onChange={(selectedOption) => {
                if (isMulti) {
                  const selected = (selectedOption as MultiValue<Option>) || [];
                  field.onChange(selected.map((option) => option.value));
                } else {
                  const singleValue = selectedOption as SingleValue<Option>;
                  field.onChange(singleValue?.value || null);
                }
              }}
              value={
                isMulti
                  ? options.filter(
                      (option) =>
                        Array.isArray(field.value) &&
                        field.value.includes(option.value),
                    )
                  : options.find((option) => option.value === field.value) ||
                    null
              }
              components={{ DropdownIndicator }}
            />
            {error && (
              <div className="mt-1">
                <ErrorsMessage title={error.message} className="text-left" />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default SelectField;
