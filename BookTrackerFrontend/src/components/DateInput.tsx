import clsx from "clsx";
import DatePicker from "react-datepicker";

interface DateInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  placeholder?: string;
  isClearable?: boolean;
}

export const DateInput = ({
  selected,
  onChange,
  label,
  placeholder,
  isClearable = true,
}: DateInputProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label>
        <span className="text-sm font-bold">{label}</span>
      </label>

      <div
        className={clsx(
          "date-input border rounded-lg focus-within:ring-2",
          "focus-within:ring-indigo-500 w-full",
          "flex flex-row items-center px-3",
        )}
      >
        <span className="material-symbols-outlined block">calendar_month</span>

        <DatePicker
          id={label}
          className={clsx(
            "size-full focus:ring-0 focus:outline-0",
            "bg-transparent border-0 py-3 ms-2",
          )}
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder || "Select date"}
        />

        {isClearable && selected && (
          <button
            className="close-icon flex justify-center ms-auto"
            onClick={() => onChange(null)}
          >
            <span className="material-symbols-outlined block">close</span>
          </button>
        )}
      </div>
    </div>
  );
};
