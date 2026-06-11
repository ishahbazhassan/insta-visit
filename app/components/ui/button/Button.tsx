import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  bgColor?: string; // e.g., 'bg-[#705295]' or 'bg-gray-200'
  textColor?: string;
  height?: string;
  rounded?: string;
  width?: string;
}

const Button = ({
  label,
  bgColor = "bg-[#705295]",
  textColor = "text-white",
  height = "h-[45px]",
  rounded = "rounded-lg",
  width = "w-full",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${width} ${height} ${bgColor} ${textColor} ${rounded} font-semibold transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
