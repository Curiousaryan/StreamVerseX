import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import MediaCard from "../../common/MediaCard";

function MediaRow({
  title,
  items = [],
  onItemClick,
  onViewAll,
}) {
  const rowRef = useRef(null);

  const animationRef = useRef(null);

  const pause = useRef(false);

  const isDragging = useRef(false);

  const startX = useRef(0);

  const scrollStart = useRef(0);

  const [showButtons, setShowButtons] =
    useState(false);

  // ==========================
  // Infinite Items
  // ==========================

  const loopItems = [
    ...items,
    ...items,
  ];

  // ==========================
  // GPU Smooth Auto Scroll
  // ==========================

  useEffect(() => {
    const container = rowRef.current;

    if (!container) return;

    let speed = 0.5;

    const animate = () => {
      if (
        !pause.current &&
        !isDragging.current
      ) {
        container.scrollLeft += speed;

        if (
          container.scrollLeft >=
          container.scrollWidth / 2
        ) {
          container.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(
        animationRef.current
      );
  }, []);

  // ==========================
  // Manual Scroll
  // ==========================

  const scrollPrevious = () => {
    rowRef.current?.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  const scrollNext = () => {
    rowRef.current?.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  // ==========================
  // Drag
  // ==========================

  const handleMouseDown = (e) => {
    if (!rowRef.current) return;

    isDragging.current = true;

    startX.current =
      e.pageX -
      rowRef.current.offsetLeft;

    scrollStart.current =
      rowRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (
      !isDragging.current ||
      !rowRef.current
    )
      return;

    e.preventDefault();

    const x =
      e.pageX -
      rowRef.current.offsetLeft;

    const walk =
      (x - startX.current) * 1.5;

    rowRef.current.scrollLeft =
      scrollStart.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  if (!items.length) {
    return null;
  }
    return (
    <section
      className="relative py-8"
      onMouseEnter={() => {
        pause.current = true;
        setShowButtons(true);
      }}
      onMouseLeave={() => {
        pause.current = false;
        setShowButtons(false);
      }}
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between px-6 md:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="h-7 w-1 rounded-full bg-red-600" />

          <h2 className="text-xl font-bold text-white md:text-2xl">
            {title}
          </h2>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            View All →
          </button>
        )}
      </div>

      {/* Left Fade */}

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#050505] to-transparent" />

      {/* Right Fade */}

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#050505] to-transparent" />

      {/* Left Arrow */}

      <button
        onClick={scrollPrevious}
        className={`absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 backdrop-blur-md transition-all duration-300 md:flex ${
          showButtons
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}

      <button
        onClick={scrollNext}
        className={`absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 backdrop-blur-md transition-all duration-300 md:flex ${
          showButtons
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight size={28} />
      </button>

      {/* Cards */}

      <div
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="
          flex
          gap-5
          overflow-x-auto
          px-6
          pb-4
          pt-2
          md:px-10
          lg:px-14
          scroll-smooth
          snap-x
          snap-mandatory
          cursor-grab
          active:cursor-grabbing
          select-none
          [&::-webkit-scrollbar]:hidden
        "
        style={{
          scrollbarWidth: "none",
        }}
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.mediaType}-${item.id}-${index}`}
            className="
              w-[150px]
              shrink-0
              snap-start
              sm:w-[170px]
              md:w-[185px]
              lg:w-[210px]
            "
          >
            <MediaCard
              id={item.id}
              title={item.title}
              image={item.poster}
              rating={item.rating}
              year={item.year}
              mediaType={item.mediaType}
              onClick={() => onItemClick?.(item)}
              onAddWatchlist={() =>
                onAddWatchlist?.(item)
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MediaRow;