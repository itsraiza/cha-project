import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[90vh]
          rounded-3xl
          bg-white
          shadow-xl
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-10
            p-2
            rounded-full
            hover:bg-gray-100
            transition
            cursor-pointer
          "
        >
          <X size={22} />
        </button>

        <div
          className="
            max-h-[90vh]
            overflow-y-auto
            p-6
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;