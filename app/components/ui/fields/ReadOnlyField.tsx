type ReadOnlyFieldProps = {
  label: string;
  value: string;
  className?: string;
};

const ReadOnlyField = ({ label, value, className = "" }: ReadOnlyFieldProps) => {
  return (
    <div className={className}>
      <label className="mb-2 block text-[14px] font-medium text-[#0A1E25]">
        {label}
      </label>
      <div className="flex h-[48px] items-center rounded-lg border border-[#D4CFCC] bg-white px-4 text-sm text-[#0A1E25]">
        {value || "—"}
      </div>
    </div>
  );
};

export default ReadOnlyField;
