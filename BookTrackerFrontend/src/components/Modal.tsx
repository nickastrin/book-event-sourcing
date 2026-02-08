import clsx from "clsx";
import "./DateInput.css";

interface ModalProps {
  show: boolean;
  header?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ show, header, onClose, children }: ModalProps) => {
  return (
    <>
      {show && (
        <div
          className={clsx(
            "modal fixed top-0 left-0 size-full z-50",
            "flex items-center justify-center bg-black/50",
          )}
          onClick={onClose}
        >
          <div
            className={clsx(
              "relative bg-zinc-700 rounded-xl flex flex-col",
              "max-w-sm w-full max-h-[75vh] overflow-hidden",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center gap-4 p-4 border-b">
              {header && (
                <span className="text-lg font-semibold">{header}</span>
              )}

              <button
                className="ms-auto icon flex justify-center"
                onClick={onClose}
              >
                <span className="material-symbols-outlined block">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
