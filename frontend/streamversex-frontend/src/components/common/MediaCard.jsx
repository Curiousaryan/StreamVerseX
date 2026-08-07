import { Play, Plus, Check, Star } from "lucide-react";

import { useWatchlist } from "../../context/WatchlistContext";
const FALLBACK_POSTER =
  "https://placehold.co/400x600/111827/ffffff?text=No+Image";

const CONTENT_TYPE = {
  Movie: "MOVIE",
  TV: "TV",
  Anime: "ANIME",
};

function MediaCard({
  id,
  title,
  image,
  rating,
  year,
  mediaType,
  onClick,
}) {
  const {
    toggle,
    isSaved,
    isPending,
  } = useWatchlist();

  const contentType = CONTENT_TYPE[mediaType];

  const saved = contentType ? isSaved(id, contentType) : false;
  const pending = contentType ? isPending(id, contentType) : false;

  const handleWatchlist = async (event) => {
    event.stopPropagation();

    if (!contentType) {
      console.error(
        `MediaCard: unknown mediaType "${mediaType}" — cannot add to watchlist.`
      );
      return;
    }

    if (!id) {
      console.error("MediaCard: missing id — cannot add to watchlist.");
      return;
    }

    await toggle(id, contentType);
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    onPlay ? onPlay() : onClick?.();
  };

  return (
    <article
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:scale-[1.03]
        hover:z-20
      "
    >
      {/* Poster */}

      <div
        className="
          relative
          aspect-[2/3]
          overflow-hidden
          rounded-2xl
          bg-zinc-900
          shadow-xl
        "
      >
        <img
          src={image || FALLBACK_POSTER}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_POSTER;
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

        {/* Hover Overlay */}

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
          <div className="flex gap-3">

            {/* Play */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-white
                shadow-lg
                transition
                hover:scale-110
              "
            >
              <Play
                size={22}
                fill="currentColor"
              />
            </button>

            {/* Watchlist */}

            <button
              disabled={pending}
              onClick={handleWatchlist}
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300

                ${
                  saved
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
                }

                disabled:opacity-50
                disabled:cursor-not-allowed
              `}
            >
              {saved ? (
                <Check size={22} />
              ) : (
                <Plus size={22} />
              )}
            </button>

          </div>
        </div>

        {/* Media Type */}

        <div
          className="
            absolute
            left-3
            top-3
            rounded-full
            bg-red-600
            px-3
            py-1
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-white
          "
        >
          {mediaType}
        </div>

        {/* Rating */}

        <div
          className="
            absolute
            right-3
            top-3
            flex
            items-center
            gap-1
            rounded-full
            bg-black/70
            px-3
            py-1
            backdrop-blur-md
          "
        >
          <Star
            size={13}
            fill="currentColor"
            className="text-yellow-400"
          />

          <span
            className="
              text-xs
              font-semibold
              text-white
            "
          >
            {typeof rating === "number"
              ? rating.toFixed(1)
              : "N/A"}
          </span>
        </div>

        {/* Bottom Info */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-4
          "
        >
          <h3
            className="
              line-clamp-2
              text-sm
              font-bold
              text-white
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              text-xs
              text-gray-300
            "
          >
            {year && <span>{year}</span>}

            {year && mediaType && <span>•</span>}

            {mediaType && (
              <span>{mediaType}</span>
            )}
          </div>

        </div>

      </div>
    </article>
  );
}

export default MediaCard;