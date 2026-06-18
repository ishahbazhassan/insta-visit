type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  ariaLabel = "Toggle",
}: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`h-6 w-12 rounded-full p-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-[#22C55E]" : "bg-[#EF4444]"
      }`}
    >
      <div
        className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
