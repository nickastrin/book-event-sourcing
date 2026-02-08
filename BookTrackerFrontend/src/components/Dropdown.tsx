import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Dropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const dropdownElement = dropdownRef.current;
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
    <div className="dropdown relative">
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Dropdown
      </button>
      <div
        ref={dropdownRef}
        className={clsx("dropdown-menu absolute bg-black", {
          block: isOpen,
          hidden: !isOpen,
        })}
      >
        <a href="#">Option 1</a>
        <a href="#">Option 2</a>
        <a href="#">Option 3</a>
      </div>
    </div>
  );
};
