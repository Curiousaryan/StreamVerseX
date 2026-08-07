import { useEffect } from "react";
import { X, TriangleAlert } from "lucide-react";

import palette from "../../theme/palette";

function TrailerModal({ open, onClose, title, trailerKey, loading }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: palette.background.paper }}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <h3 className="truncate pr-4 text-sm font-bold sm:text-base" style={{ color: palette.text.primary }}>
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close trailer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:scale-105"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: palette.text.primary,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="aspect-video w-full"
          style={{ backgroundColor: "#000" }}
        >
          {loading ? (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ color: palette.text.secondary }}
            >
              Loading trailer...
            </div>
          ) : trailerKey ? (
            <iframe
              key={trailerKey}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center"
              style={{ color: palette.text.secondary }}
            >
              <TriangleAlert size={32} style={{ color: palette.warning.main }} />
              <p>No trailer is available for this title yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
