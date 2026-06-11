import React from "react";

interface HeaderProps {
  title: string;
  className?: string;
  textSize?: string;
  textColor?: string;
}

const Heading: React.FC<HeaderProps> = ({
  title,
  className,
  textSize = "text-[32px]",
  textColor = "text-[#0A1E25]",
}) => {
  return (
    <h1 className={`${textSize} ${textColor} ${className || "font-semibold "}`}>
      {title}
    </h1>
  );
};

export default Heading;
