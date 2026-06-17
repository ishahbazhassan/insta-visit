type SectionHeadingProps = {
  title: string;
  highlight: string;
  subtitle: string;
  className?: string;
};

const SectionHeading = ({
  title,
  highlight,
  subtitle,
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <h2 className="text-2xl font-bold text-[#0A1E25] md:text-3xl">
        {title}{" "}
        <span className="text-[#705295]">{highlight}</span>
      </h2>
      <p className="mt-3 text-sm text-gray-500 md:text-base">{subtitle}</p>
    </div>
  );
};

export default SectionHeading;
