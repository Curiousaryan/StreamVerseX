import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  Check,
  Star,
} from "lucide-react";

const AUTOPLAY_INTERVAL = 7000;

function HeroBanner({
  items = [],
  onViewDetails,
  onWatchlist,
  watchlistIds = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return undefined;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  const current = items[currentIndex];
  const isInWatchlist = watchlistIds.includes(current.id);

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="group relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-black">
      <style>{`
        @keyframes heroKenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>

      {/* Background */}
      <img
        key={current.id ?? currentIndex}
        src={current.backdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          animation: `heroKenBurns ${AUTOPLAY_INTERVAL}ms linear forwards`,
        }}
      />

      {/* Top gradient — keeps the navbar legible over any image */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />

      {/* Left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="ml-6 max-w-xl md:ml-16 lg:ml-24">
          {/* Label */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e50914]">
              {current.mediaType}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl">
            {current.title}
          </h1>

          {/* Metadata */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {current.rating !== undefined && current.rating !== null && (
              <div className="flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-semibold text-emerald-400">
                <Star size={14} className="fill-emerald-400 text-emerald-400" />
                {typeof current.rating === "number"
                  ? current.rating.toFixed(1)
                  : current.rating}
              </div>
            )}

            {current.year && (
              <span className="font-medium text-white/70">{current.year}</span>
            )}

            {current.genres?.length > 0 && (
              <span className="text-white/50">
                {current.genres.slice(0, 3).join("  •  ")}
              </span>
            )}
          </div>

          {/* Description */}
          {current.description && (
            <p className="mt-6 line-clamp-3 max-w-xl text-base leading-7 text-white/70 drop-shadow-md md:text-lg">
              {current.description}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onViewDetails?.(current)}
              className="flex items-center gap-2.5 rounded-md bg-white px-7 py-3 font-bold text-black transition duration-200 hover:bg-white/85 active:scale-[0.98]"
            >
              <Info size={20} />
              More Info
            </button>

            <button
              type="button"
              onClick={() => onWatchlist?.(current)}
              className="flex items-center gap-2.5 rounded-md border border-white/15 bg-white/10 px-7 py-3 font-bold text-white backdrop-blur-md transition duration-200 hover:bg-white/20 active:scale-[0.98]"
            >
              {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
              {isInWatchlist ? "In Watchlist" : "Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Left arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={previous}
          aria-label="Previous"
          className="
            absolute left-5 top-1/2 z-20 hidden -translate-y-1/2
            rounded-full bg-black/40 p-3 text-white backdrop-blur-md
            opacity-0 transition-all duration-300
            hover:bg-black/60 group-hover:opacity-100
            lg:flex
          "
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="
            absolute right-5 top-1/2 z-20 hidden -translate-y-1/2
            rounded-full bg-black/40 p-3 text-white backdrop-blur-md
            opacity-0 transition-all duration-300
            hover:bg-black/60 group-hover:opacity-100
            lg:flex
          "
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {items.map((item, index) => (
            <button
              key={item.id ?? index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                h-1 rounded-full transition-all duration-500
                ${
                  currentIndex === index
                    ? "w-8 bg-[#e50914]"
                    : "w-1 bg-white/30 hover:bg-white/50"
                }
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroBanner;