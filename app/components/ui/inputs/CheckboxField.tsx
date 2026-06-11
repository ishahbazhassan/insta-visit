import {
  Controller,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";

export interface CheckboxFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  id?: string;
  className?: string;
}

function CheckboxField<T extends FieldValues>({
  label,
  name,
  control,
  id,
  className = "",
}: CheckboxFieldProps<T>) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id={id || String(name)}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className="w-5 h-5 accent-[#705295] rounded border-[#D4CFCC] cursor-pointer"
          />
        )}
      />
      <label
        htmlFor={id || String(name)}
        className="text-[14px] text-gray-600 cursor-pointer font-medium"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
