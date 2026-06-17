"use client";

const ProviderDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1E25]">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your provider activity
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Today's Appointments", "Pending Requests", "Total Patients"].map(
          (title) => (
            <div
              key={title}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="mt-2 text-2xl font-bold text-[#705295]">—</p>
            </div>
          ),
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0A1E25]">Recent activity</h2>
        <p className="mt-2 text-sm text-gray-500">
          Dummy content — replace with your dashboard widgets.
        </p>
      </div>
    </div>
  );
};

export default ProviderDashboard;
