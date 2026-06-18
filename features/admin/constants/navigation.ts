import type { IconType } from "react-icons";
import {
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export type AdminNavChild = {
  label: string;
  path: string;
};

export type AdminNavItem = {
  label: string;
  path?: string;
  icon: IconType;
  children?: AdminNavChild[];
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: HiOutlineViewGrid,
  },
  {
    label: "Consultations",
    path: "/admin/consultations",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    label: "Patients",
    path: "/admin/patients",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Providers",
    icon: HiOutlineUsers,
    children: [
      { label: "All Providers", path: "/admin/providers" },
      { label: "Provider Requests", path: "/admin/provider-requests" },
    ],
  },
  {
    label: "Management",
    icon: HiOutlineCog,
    children: [
      { label: "Prescriptions", path: "/admin/prescriptions" },
      { label: "Refund Requests", path: "/admin/refund-requests" },
      { label: "System Controls", path: "/admin/system-controls" },
      {
        label: "Reporting & Analytics",
        path: "/admin/reporting",
      },
      {
        label: "Compliance & Audit Logs",
        path: "/admin/compliance-audit-logs",
      },
      { label: "Document Handling", path: "/admin/document-handling" },
    ],
  },
];

export const ADMIN_PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/consultations": "Consultations",
  "/admin/patients": "Patients",
  "/admin/providers": "Providers",
  "/admin/provider-requests": "Providers",
  "/admin/prescriptions": "Management",
  "/admin/refund-requests": "Management",
  "/admin/system-controls": "Management",
  "/admin/reporting": "Management",
  "/admin/compliance-audit-logs": "Management",
  "/admin/document-handling": "Management",
};

export function getAdminPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/provider-requests/")) {
    return "Provider Request Details";
  }

  return ADMIN_PAGE_TITLES[pathname] ?? "Admin";
}

export function getAdminBreadcrumb(pathname: string): string | null {
  if (pathname.startsWith("/admin/provider-requests/") && pathname !== "/admin/provider-requests") {
    return "Provider / Provider Request Details";
  }

  return null;
}
