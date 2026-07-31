import MediaCard from "../../common/MediaCard";

function MediaGrid({
  items = [],
  onItemClick,
  onAddWatchlist,
  emptyMessage = "No content available.",
}) {
  if (!items.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-6">
        <p className="text-center text-sm text-gray-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-4
        gap-y-8
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        2xl:grid-cols-7
      "
    >
      {items.map((item, index) => (
        <MediaCard
          key={`${item.mediaType || "media"}-${item.id ?? index}`}
          title={item.title}
          image={item.image}
          rating={item.rating}
          year={item.year}
          mediaType={item.mediaType}
          onClick={() => onItemClick?.(item)}
          onAddWatchlist={() => onAddWatchlist?.(item)}
        />
      ))}
    </div>
  );
}

export default MediaGrid;