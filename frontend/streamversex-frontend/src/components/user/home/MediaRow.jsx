import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import MediaCard from "../../common/MediaCard";

function MediaRow({
  title,
  items = [],
  onItemClick,
  onAddWatchlist,
  onViewAll,
}) {
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className="group/section py-5">
      {/* Section heading */}
      <div className="mb-4 flex items-center justify-between px-6 md:px-10 lg:px-14">

        <h2 className="text-xl font-bold text-white md:text-2xl">
          {title}
        </h2>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            View All
          </button>
        )}

      </div>

      {/* Row container */}
      <div className="relative">

        {/* Left button */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label={`Scroll ${title} left`}
          className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 transition hover:bg-black group-hover/section:opacity-100 md:flex"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto px-6 pb-3 md:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.mediaType || "media"}-${item.id ?? index}`}
              className="w-[145px] shrink-0 sm:w-[165px] md:w-[180px] lg:w-[195px]"
            >
              <MediaCard
                title={item.title}
                image={item.image}
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

        {/* Right button */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label={`Scroll ${title} right`}
          className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 transition hover:bg-black group-hover/section:opacity-100 md:flex"
        >
          <ChevronRight size={28} />
        </button>

      </div>
    </section>
  );
}

export default MediaRow;