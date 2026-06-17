type TreatmentCardProps = {
  label: string;
  emoji: string;
};

const TreatmentCard = ({ label, emoji }: TreatmentCardProps) => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F5F0FA] text-4xl">
        {emoji}
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-[#0A1E25]">
        {label}
      </p>
    </div>
  );
};

export default TreatmentCard;
