import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown = ({ children }: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const dropdownElement = containerRef.current;
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="dropdown relative inline-block">
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Dropdown
      </button>
      <div
        className={clsx(
          "dropdown-menu absolute border rounded-xl mt-1 p-4",
          "min-h-32 w-48 max-h-48 flex flex-col gap-2 overflow-y-auto",
          { hidden: !isOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
};
