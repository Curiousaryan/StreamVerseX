import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  Check,
  Play,
  Star,
} from "lucide-react";

import palette from "../../../theme/palette";

const AUTOPLAY_INTERVAL = 8000;

function HeroBanner({
  items = [],
  onViewDetails,
  onWatchlist,
  onPlay,
  watchlistIds = [],
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [fade, setFade] =
    useState(true);

  /* ============================================
      AUTO SLIDE
  ============================================ */

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === items.length - 1
            ? 0
            : prev + 1
        );

        setFade(true);
      }, 250);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

 const current = items[currentIndex];

const isInWatchlist = watchlistIds.includes(current.id);

/* Clean description */
const cleanDescription =
  current.description
    ?.replace(/<[^>]*>/g, "")
    ?.replace(/\s+/g, " ")
    ?.trim() || "";

/* Short description */
const shortDescription =
  cleanDescription.length > 200
    ? cleanDescription.substring(0, 200) + "..."
    : cleanDescription;

/* Long title check */
const isLongTitle =
  (current.title || "").length > 35;

  /* ============================================
      NAVIGATION
  ============================================ */

  const previous = () => {
    setFade(false);

    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0
          ? items.length - 1
          : prev - 1
      );

      setFade(true);
    }, 250);
  };

  const next = () => {
    setFade(false);

    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === items.length - 1
          ? 0
          : prev + 1
      );

      setFade(true);
    }, 250);
  };
  /* ============================================
      UI
  ============================================ */

  return (
    <section
      className="group relative w-full overflow-hidden"
      style={{
        height: "88vh",
        minHeight: "620px",
        backgroundColor:
          palette.background.default,
      }}
    >
      {/* ============================================
            KEYFRAME
      ============================================ */}

      <style>{`
        @keyframes heroZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.08);
          }
        }
      `}</style>

      {/* ============================================
            BACKDROP
      ============================================ */}

      <img
        key={current.id}
        src={current.backdrop}
        alt={current.title}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          animation: `heroZoom ${AUTOPLAY_INTERVAL}ms linear forwards`,
          filter:
            "brightness(.72) contrast(1.08) saturate(1.15)",
        }}
      />

      {/* ============================================
            OVERLAYS
      ============================================ */}

      {/* Top */}

      <div
        className="absolute inset-x-0 top-0 h-44"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.92), rgba(0,0,0,.25), transparent)",
        }}
      />

      {/* Left */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,.96) 0%, rgba(0,0,0,.75) 30%, rgba(0,0,0,.35) 55%, transparent 100%)",
        }}
      />

      {/* Bottom */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,15,1) 0%, rgba(11,11,15,.88) 12%, rgba(11,11,15,.35) 45%, transparent 70%)",
        }}
      />

      {/* ============================================
            CONTENT
      ============================================ */}

      <div className="relative z-20 flex h-full items-center pb-16">

        <div className="ml-6 max-w-2xl md:ml-16 lg:ml-24">

          {/* Media Type */}

          <div className="mb-6 flex items-center gap-3">

            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  palette.primary.main,
              }}
            />

            <span
              className="text-xs font-bold uppercase tracking-[0.35em]"
              style={{
                color:
                  palette.primary.main,
              }}
            >
              STREAMVERSE ORIGINAL
            </span>

          </div>

          {/* Title */}

          <h1
  className={`
    font-black
    leading-tight
    tracking-tight
    drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]
    line-clamp-2
    max-w-3xl

    ${
      isLongTitle
        ? "text-4xl md:text-5xl lg:text-6xl"
        : "text-5xl md:text-6xl lg:text-7xl"
    }
  `}
>
  {current.title}
</h1>

          {/* Metadata */}

          <div className="mt-6 flex flex-wrap items-center gap-5">


                      {/* Rating */}

            {current.rating && (
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: "rgba(76,175,80,.15)",
                  border: `1px solid ${palette.success.main}`,
                  color: palette.success.main,
                }}
              >
                <Star
                  size={16}
                  className="fill-current"
                />

                <span className="font-semibold">
                  {Number(current.rating).toFixed(1)}
                </span>
              </div>
            )}

            {/* Release Year */}

            {current.year && (
              <span
                className="font-medium"
                style={{
                  color:
                    palette.text.secondary,
                }}
              >
                {current.year}
              </span>
            )}

            {/* Genres */}

            {current.genres?.length > 0 && (
              <span
                className="font-medium"
                style={{
                  color:
                    palette.text.secondary,
                }}
              >
                {current.genres
                  .slice(0, 3)
                  .join(" • ")}
              </span>
            )}

          </div>

          {/* ============================================
                DESCRIPTION
          ============================================ */}

{shortDescription && (
  <p
    className="
      mt-6
      max-w-2xl
      text-base
      leading-8
      text-white/75
      line-clamp-3
      md:text-lg
    "
  >
    {shortDescription}
  </p>
)}

          {/* ============================================
                ACTION BUTTONS
          ============================================ */}

          <div className="mt-10 flex flex-wrap items-center gap-4">

            {/* PLAY */}

            <button
              type="button"
              onClick={() =>
                onPlay?.(current)
              }
              className="flex items-center gap-3 rounded-lg px-8 py-3 font-bold shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  palette.primary.main,
                color:
                  palette.text.primary,
              }}
            >
              <Play size={22} />

              Play
            </button>

            {/* MORE INFO */}

            <button
              type="button"
              onClick={() =>
                onViewDetails?.(
                  current
                )
              }
              className="flex items-center gap-3 rounded-lg border px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                borderColor:
                  palette.text.secondary,
                color:
                  palette.text.primary,
                backgroundColor:
                  "rgba(255,255,255,.08)",
                backdropFilter:
                  "blur(10px)",
              }}
            >
              <Info size={20} />

              More Info
            </button>

            {/* WATCHLIST */}

            <button
              type="button"
              onClick={() =>
                onWatchlist?.(
                  current
                )
              }
              className="flex items-center gap-3 rounded-lg border px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                borderColor:
                  palette.primary.main,
                color:
                  palette.text.primary,
                backgroundColor:
                  "rgba(229,9,20,.15)",
              }}
            >
              {isInWatchlist ? (
                <Check size={20} />
              ) : (
                <Plus size={20} />
              )}

              {isInWatchlist
                ? "In Watchlist"
                : "Watchlist"}
            </button>

          </div>

        </div>

      </div>
      {/* ============================================
            PREVIOUS BUTTON
      ============================================ */}

      {items.length > 1 && (
        <button
          type="button"
          onClick={previous}
          aria-label="Previous"
          className="
            absolute left-6 top-1/2 z-30
            hidden -translate-y-1/2
            rounded-full p-4
            transition-all duration-300
            lg:flex
            opacity-0
            group-hover:opacity-100
            hover:scale-110
          "
          style={{
            backgroundColor: "rgba(0,0,0,.45)",
            color: palette.text.primary,
            backdropFilter: "blur(12px)",
          }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* ============================================
            NEXT BUTTON
      ============================================ */}

      {items.length > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="
            absolute right-6 top-1/2 z-30
            hidden -translate-y-1/2
            rounded-full p-4
            transition-all duration-300
            lg:flex
            opacity-0
            group-hover:opacity-100
            hover:scale-110
          "
          style={{
            backgroundColor: "rgba(0,0,0,.45)",
            color: palette.text.primary,
            backdropFilter: "blur(12px)",
          }}
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* ============================================
            INDICATORS
      ============================================ */}

      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">

          {items.map((item, index) => (

            <button
              key={item.id}
              type="button"
              onClick={() =>
                setCurrentIndex(index)
              }
              className="transition-all duration-500"
              style={{
                width:
                  currentIndex === index
                    ? "34px"
                    : "10px",

                height: "10px",

                borderRadius: "999px",

                backgroundColor:
                  currentIndex === index
                    ? palette.primary.main
                    : "rgba(255,255,255,.30)",
              }}
            />

          ))}

        </div>
      )}

    </section>
  );
}

export default HeroBanner;