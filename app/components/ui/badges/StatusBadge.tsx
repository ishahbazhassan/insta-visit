export type StatusBadgeVariant =
  | "active"
  | "inactive"
  | "not-available"
  | "paused"
  | "pending"
  | "decline";

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  active: "text-[#22C55E]",
  inactive: "text-[#EF4444]",
  "not-available": "text-[#999999]",
  paused: "text-[#F59E0B]",
  pending: "text-[#F59E0B]",
  decline: "text-[#EF4444]",
};

const VARIANT_LABELS: Record<StatusBadgeVariant, string> = {
  active: "Active",
  inactive: "Inactive",
  "not-available": "Not Available",
  paused: "Paused",
  pending: "Pending",
  decline: "Decline",
};

type StatusBadgeProps = {
  variant: StatusBadgeVariant;
  label?: string;
};

const StatusBadge = ({ variant, label }: StatusBadgeProps) => {
  return (
    <span className={`text-sm font-medium ${VARIANT_STYLES[variant]}`}>
      {label ?? VARIANT_LABELS[variant]}
    </span>
  );
};

export default StatusBadge;
