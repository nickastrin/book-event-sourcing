import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
}

export const Dropdown = ({ label, children }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const dropdownElement = dropdownRef.current;
      const buttonElement = buttonRef.current;
      if (
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        buttonElement &&
        !buttonElement.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  useEffect(() => {
    const positionHandler = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    window.addEventListener("resize", positionHandler);
    window.addEventListener("scroll", positionHandler, true);

    return () => {
      window.removeEventListener("resize", positionHandler);
      window.removeEventListener("scroll", positionHandler, true);
    };
  }, [isOpen]);

  return (
    <div className="dropdown relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              minWidth: `${coords.width}px`,
              zIndex: 9999,
              pointerEvents: "auto",
            }}
            className={clsx(
              "border rounded-xl mt-1 shadow-2xl bg-zinc-800",
              "min-h-32 w-48 max-h-44 flex flex-col overflow-hidden",
            )}
          >
            <div className="overflow-y-auto p-4">{children}</div>
          </div>,
          document.body,
        )}
    </div>
  );
};
