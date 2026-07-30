import {
  Bookmark,
  Check,
  Heart,
  Play,
  Star,
} from "lucide-react";

function MediaDetailsHero({
  title,
  description,
  backdrop,
  poster,
  rating,
  year,
  genres = [],
  mediaType,
  runtime,
  status,
  isInWatchlist = false,
  isFavorite = false,
  onWatchlist,
  onFavorite,
  onPlayTrailer,
}) {
  return (
    <section className="relative overflow-hidden bg-black">

      {/* Backdrop */}
      <div className="absolute inset-0">

        {backdrop ? (
          <img
            src={backdrop}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:px-10 md:py-16 lg:px-14 lg:py-20">

        {/* Poster */}
        <div className="w-40 shrink-0 sm:w-48 md:w-56 lg:w-64">

          <div className="aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900 shadow-2xl">

            {poster ? (
              <img
                src={poster}
                alt={`${title || "Media"} poster`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-500">
                No poster available
              </div>
            )}

          </div>

        </div>

        {/* Information */}
        <div className="max-w-3xl">

          {/* Media type */}
          {mediaType && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              {mediaType}
            </p>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title || "Untitled"}
          </h1>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">

            {rating !== undefined && rating !== null && (
              <span className="flex items-center gap-1 font-semibold text-yellow-400">
                <Star
                  size={16}
                  fill="currentColor"
                />

                {rating}
              </span>
            )}

            {year && <span>{year}</span>}

            {runtime && <span>{runtime}</span>}

            {status && <span>{status}</span>}

          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  {genre}
                </span>
              ))}

            </div>
          )}

          {/* Description */}
          {description && (
            <p className="mt-6 max-w-2xl text-sm leading-6 text-gray-300 md:text-base md:leading-7">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">

            {onPlayTrailer && (
              <button
                type="button"
                onClick={onPlayTrailer}
                className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                <Play
                  size={18}
                  fill="currentColor"
                />

                Trailer
              </button>
            )}

            <button
              type="button"
              onClick={onWatchlist}
              className="flex items-center gap-2 rounded-md bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              {isInWatchlist ? (
                <Check size={18} />
              ) : (
                <Bookmark size={18} />
              )}

              {isInWatchlist
                ? "In Watchlist"
                : "Watchlist"}
            </button>

            <button
              type="button"
              onClick={onFavorite}
              className="flex items-center gap-2 rounded-md bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <Heart
                size={18}
                fill={isFavorite ? "currentColor" : "none"}
              />

              {isFavorite
                ? "Favorited"
                : "Favorite"}
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MediaDetailsHero;