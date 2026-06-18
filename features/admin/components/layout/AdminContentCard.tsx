type AdminContentCardProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const AdminContentCard = ({ title, action, children }: AdminContentCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-[#0A1E25]">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
};

export default AdminContentCard;
