import {
  AlertTriangle,
  X,
} from "lucide-react";

function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-zinc-800
          bg-[#111]
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-zinc-800
            p-6
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-red-600/15
              "
            >
              <AlertTriangle
                size={24}
                className="text-red-500"
              />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                {title}
              </h2>

            </div>

          </div>

          <button
            onClick={onCancel}
            className="
              rounded-full
              p-2
              text-gray-400
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p
            className="
              leading-7
              text-gray-400
            "
          >
            {message}
          </p>

        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-4
            border-t
            border-zinc-800
            p-6
          "
        >
          <button
            onClick={onCancel}
            className="
              rounded-xl
              border
              border-zinc-700
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:border-red-600
            "
          >
            {cancelText}
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Please wait..."
              : confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmDialog;