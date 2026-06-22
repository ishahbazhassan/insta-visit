"use client";

import { usePathname } from "next/navigation";
import { getAdminBreadcrumb, getAdminPageTitle } from "../../constants/navigation";

const AdminPageHeading = () => {
  const pathname = usePathname();
  const pageTitle = getAdminPageTitle(pathname);
  const breadcrumb = getAdminBreadcrumb(pathname);

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#0A1E25]">{pageTitle}</h1>
      {breadcrumb ? (
        <p className="mt-1 text-sm text-[#999999]">{breadcrumb}</p>
      ) : null}
    </div>
  );
};

export default AdminPageHeading;
