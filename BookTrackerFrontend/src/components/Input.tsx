import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
          "border rounded-lg focus-within:ring-2",
          "focus-within:ring-indigo-500 w-full",
        )}
      >
        <input
          {...props}
          className={clsx(
            "size-full border-0 focus:ring-0 focus:outline-0",
            "bg-transparent p-3",
          )}
        />
      </div>
    </div>
  );
};
