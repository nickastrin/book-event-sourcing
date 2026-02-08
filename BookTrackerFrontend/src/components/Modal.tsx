import clsx from "clsx";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ show, onClose, children }: ModalProps) => {
  return (
    <>
      {show && (
        <div
          className={clsx(
            "modal fixed top-0 left-0 size-full z-50 py-32",
            "bg-black/50 flex items-center justify-center",
          )}
          onClick={() => onClose()}
        >
          <div
            className="relative bg-white rounded-xl max-w-sm w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 rounded">Modal Content</div>
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
