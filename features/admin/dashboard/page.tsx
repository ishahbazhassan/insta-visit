"use client";

import { getAuthUser } from "@/features/auth/lib/session";

const AdminDashboard = () => {
  const user = getAuthUser();

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1E25]">
          Welcome, {user.firstName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0A1E25]">Admin account</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-[#0A1E25]">
              {user.firstName} {user.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-[#0A1E25]">{user.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium text-[#705295]">{user.role}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium text-green-600">{user.status}</dd>
          </div>
        </dl>
      </div>

      <p className="text-sm text-gray-500">
        Provider request approval flow will be added in the next step.
      </p>
    </div>
  );
};

export default AdminDashboard;
