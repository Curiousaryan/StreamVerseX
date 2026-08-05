import MediaCard from "../../common/MediaCard";

function MediaGrid({
  items = [],
  mediaType = "Movie",
  onItemClick,
  onAddWatchlist,
  emptyMessage = "No content available.",
}) {
  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-400 text-lg">
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
        gap-5
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
    >
      {items.map((movie) => (
        <MediaCard
          key={movie.id}
          title={movie.title}
          image={movie.posterUrl}
          rating={movie.rating}
          year={
            movie.releaseDate
              ? movie.releaseDate.substring(0, 4)
              : ""
          }
          mediaType={mediaType}
          onClick={() => onItemClick?.(movie)}
          onAddWatchlist={() =>
            onAddWatchlist?.(movie)
          }
        />
      ))}
    </div>
  );
}

export default MediaGrid;