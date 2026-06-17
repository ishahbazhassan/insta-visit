import type { IconType } from "react-icons";
import {
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineFlag,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { HiOutlineDocumentPlus } from "react-icons/hi2";

export type ProviderNavLink = {
  label: string;
  path: string;
  icon: IconType;
  activeIcon?: IconType;
};

export const PROVIDER_LINKS: ProviderNavLink[] = [
  {
    label: "Dashboard",
    path: "/provider/dashboard",
    icon: HiOutlineViewGrid,
  },
  {
    label: "New Visits",
    path: "/provider/new-visits",
    icon: HiOutlineDocumentPlus,
  },
  {
    label: "All Visits",
    path: "/provider/appointments",
    icon: HiOutlineDocumentText,
  },
  {
    label: "All Patients",
    path: "/provider/patients",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Flagged Patients",
    path: "/provider/flagged-patients",
    icon: HiOutlineFlag,
  },
  {
    label: "Messages",
    path: "/provider/messages",
    icon: HiOutlineChatAlt2,
  },
  {
    label: "Statistics",
    path: "/provider/statistics",
    icon: HiOutlineChartBar,
  },
  {
    label: "Activity Logs",
    path: "/provider/activity-logs",
    icon: HiOutlineClipboardList,
  },
];
