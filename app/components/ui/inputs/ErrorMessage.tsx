"use client";

import { type FC } from "react";

interface ErrorMessageProps {
  title?: string;
  MB?: number;
  MT?: number;
  textAlign?: string;
  className?: string;
}

const ErrorsMessage: FC<ErrorMessageProps> = ({
  title,
  MB = 0,
  MT = 0,
  className = "",
}) => {
  if (!title) return null;

  return (
    <p
      className={`text-[#EA4335] text-[12px] font-normal font-Mulish mb-${MB} mt-${MT} ${className} mt-[1.5px]`}
    >
      {title}
    </p>
  );
};

export default ErrorsMessage;
