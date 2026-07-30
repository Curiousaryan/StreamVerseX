import { Play, Plus, Star } from "lucide-react";

function MediaCard({
  title,
  image,
  rating,
  year,
  mediaType,
  onClick,
  onAddWatchlist,
}) {
  const handleWatchlist = (event) => {
    event.stopPropagation();

    if (onAddWatchlist) {
      onAddWatchlist();
    }
  };

  return (
    <article
      onClick={onClick}
      className="group w-full cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-zinc-900">

        {image ? (
          <img
            src={image}
            alt={title || "Media poster"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-500">
            No image available
          </div>
        )}

        {/* Dark hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition duration-300 group-hover:opacity-100">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
              aria-label={`View ${title || "media"}`}
            >
              <Play size={18} fill="currentColor" />
            </button>

            <button
              type="button"
              onClick={handleWatchlist}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition hover:bg-white hover:text-black"
              aria-label={`Add ${title || "media"} to watchlist`}
            >
              <Plus size={20} />
            </button>

          </div>
        </div>

        {/* Media type */}
        {mediaType && (
          <span className="absolute left-2 top-2 rounded bg-black/75 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {mediaType}
          </span>
        )}

        {/* Rating */}
        {rating !== undefined && rating !== null && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
            <Star
              size={12}
              className="text-yellow-400"
              fill="currentColor"
            />

            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Information */}
      <div className="pt-3">

        <h3
          className="truncate text-sm font-semibold text-white transition group-hover:text-red-500"
          title={title}
        >
          {title || "Untitled"}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">

          {year && <span>{year}</span>}

          {year && mediaType && (
            <span>•</span>
          )}

          {mediaType && (
            <span className="capitalize">
              {mediaType}
            </span>
          )}

        </div>

      </div>
    </article>
  );
}

export default MediaCard;