type SolutionCardProps = {
  title: string;
  description: string;
  icon: string;
};

const SolutionCard = ({ title, description, icon }: SolutionCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBE5F1] text-2xl">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold text-[#0A1E25]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  );
};

export default SolutionCard;
