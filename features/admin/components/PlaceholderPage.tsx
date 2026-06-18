const createPlaceholderPage = (title: string) => {
  const PlaceholderPage = () => {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#0A1E25]">{title}</h2>
        <p className="mt-4 text-sm text-gray-500">Coming soon.</p>
      </div>
    );
  };

  return PlaceholderPage;
};

export default createPlaceholderPage;
