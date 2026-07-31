import {
  Info,
  Plus,
  Star,
  Check,
} from "lucide-react";

function HeroBanner({
  title,
  description,
  backdrop,
  rating,
  year,
  genres = [],
  mediaType,
  isInWatchlist = false,
  onViewDetails,
  onWatchlist,
}) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-black md:min-h-[78vh]">

      {/* Background */}
      {backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}

      {/* Horizontal gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1600px] items-end px-6 pb-16 md:min-h-[78vh] md:px-10 md:pb-20 lg:px-14">

        <div className="max-w-2xl">

          {/* Type */}
          {mediaType && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              {mediaType}
            </p>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title || "Featured Content"}
          </h1>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">

            {rating !== undefined && rating !== null && (
              <div className="flex items-center gap-1 font-medium text-yellow-400">
                <Star
                  size={16}
                  fill="currentColor"
                />

                <span>{rating}</span>
              </div>
            )}

            {year && (
              <span className="text-gray-300">
                {year}
              </span>
            )}

            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-gray-300"
              >
                {genre}
              </span>
            ))}

          </div>

          {/* Description */}
          {description && (
            <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-6 text-gray-300 md:text-base md:leading-7">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={onViewDetails}
              className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              <Info size={19} />

              More Info
            </button>

            <button
              type="button"
              onClick={onWatchlist}
              className="flex items-center gap-2 rounded-md bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              {isInWatchlist ? (
                <Check size={19} />
              ) : (
                <Plus size={19} />
              )}

              {isInWatchlist
                ? "In Watchlist"
                : "My Watchlist"}
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroBanner;