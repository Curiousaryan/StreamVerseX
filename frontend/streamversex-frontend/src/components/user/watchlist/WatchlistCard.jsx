import {
  Eye,
  Trash2,
  CalendarDays,
  Film,
  Tv,
  Clapperboard,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import WatchStatusMenu from "./WatchStatusMenu";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";

const FALLBACK_POSTER =
  "https://placehold.co/400x600/111827/ffffff?text=No+Image";

const MEDIA_ICONS = {
  MOVIE: Film,
  TV: Tv,
  ANIME: Clapperboard,
};

function WatchlistCard({
  item,
  onView,
  onRemove,
  onStatusChange,
    view = "GRID",
}) {
  const Icon =
    MEDIA_ICONS[item.contentType] || Film;

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  return (
    <>
   <article
  className={
    view === "GRID"
      ? `
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-zinc-900
        transition-all
        hover:-translate-y-2
      `
      : `
        flex
        gap-6
        rounded-2xl
        bg-zinc-900
        p-4
        transition-all
        hover:bg-zinc-800
      `
  }
>
        {/* Poster */}

        <div
          className="
            relative
            aspect-[2/3]
            overflow-hidden
          "
        >
          <img
            src={
              item.posterUrl ||
              FALLBACK_POSTER
            }
            alt={item.title}
            loading="lazy"
            onError={(event) => {
              event.target.src =
                FALLBACK_POSTER;
            }}
            className="
              h-full
              w-full
              object-cover
              transition-all
              duration-700
              group-hover:scale-110
            "
          />

          {/* Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />

          {/* Hover */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
              bg-black/40
              backdrop-blur-[2px]
            "
          >
            <button
              onClick={() => onView(item)}
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-white
                shadow-xl
                transition
                hover:scale-110
              "
            >
              <Eye size={28} />
            </button>
          </div>

          {/* Media Type */}

          <div
            className="
              absolute
              left-4
              top-4
              flex
              items-center
              gap-2
              rounded-full
              bg-red-600
              px-3
              py-2
              text-xs
              font-semibold
              uppercase
              text-white
            "
          >
            <Icon size={14} />
            {item.contentType}
          </div>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          {/* Title */}

          <div>

            <h3
              className="
                line-clamp-2
                text-xl
                font-black
                text-white
              "
            >
              {item.title}
            </h3>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
              "
            >
              <CalendarDays size={16} />

              Added{" "}
              {new Date(
                item.createdAt
              ).toLocaleDateString()}
            </div>

          </div>

          {/* Status */}

          <WatchStatusMenu
            value={item.status}
            onChange={(status) =>
              onStatusChange(
                item.contentType,
                item.contentId,
                status
              )
            }
          />

          <div className="border-t border-zinc-800" />

          {/* Buttons */}

          <div className="flex gap-3">

            {/* Details */}

            <button
              onClick={() => onView(item)}
              className="
                flex-1
                rounded-xl
                bg-red-600
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-700
              "
            >
              <div className="flex items-center justify-center gap-2">

                Details

                <ChevronRight size={18} />

              </div>
            </button>

            {/* Remove */}

            <button
              onClick={(event) => {
                event.stopPropagation();
                setConfirmOpen(true);
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-zinc-700
                bg-[#111]
                text-gray-300
                transition-all
                duration-300
                hover:border-red-600
                hover:bg-red-600
                hover:text-white
              "
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>

      </article>

      {/* Confirmation */}

      <ConfirmDialog
        open={confirmOpen}
        title="Remove from Watchlist"
        message={`Are you sure you want to remove "${item.title}" from your watchlist?`}
        confirmText="Remove"
        cancelText="Cancel"
        onCancel={() =>
          setConfirmOpen(false)
        }
        onConfirm={async () => {
          await onRemove(
            item.contentType,
            item.contentId
          );

          setConfirmOpen(false);
        }}
      />
    </>
  );
}

export default WatchlistCard;