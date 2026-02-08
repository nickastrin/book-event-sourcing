import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
  isRequired?: boolean;
}

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {props.label && (
        <label className="flex gap-1 items-center">
          <span className="text-sm font-bold">{props.label}</span>
          {props.isRequired && (
            <span className="font-thin text-xs">* Required</span>
          )}
        </label>
      )}

      <div
        className={clsx(
          "flex flex-row items-center gap-1 px-3",
          "border rounded-lg focus-within:ring-2",
          "focus-within:ring-indigo-500 w-full",
        )}
      >
        {props.icon && (
          <span className="material-symbols-outlined">{props.icon}</span>
        )}

        <input
          {...props}
          className={clsx(
            "size-full border-0 focus:ring-0 focus:outline-0",
            "bg-transparent py-3",
          )}
        />
      </div>
    </div>
  );
};
