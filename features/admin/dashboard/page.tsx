"use client";

import { getAuthUser } from "@/features/auth/lib/session";
import AdminContentCard from "../components/layout/AdminContentCard";

const AdminDashboard = () => {
  const user = getAuthUser();

  if (!user) {
    return null;
  }

  return (
    <AdminContentCard title="Dashboard">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#0A1E25]">
            Welcome, {user.firstName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
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
    </AdminContentCard>
  );
};

export default AdminDashboard;
