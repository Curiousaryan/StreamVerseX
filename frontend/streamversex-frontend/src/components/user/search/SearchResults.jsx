import { SearchX } from "lucide-react";
import MediaCard from "../../common/MediaCard";
import palette from "../../../theme/palette";

function SearchResults({
  items = [],
  query = "",
  onItemClick,
  onAddWatchlist,
  emptyTitle = "No Results Found",
  emptySubtitle,
}) {
  if (!items.length) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
        <div
          className="mb-5 rounded-full p-5"
          style={{
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <SearchX
            size={54}
            style={{
              color: palette.text.secondary,
            }}
          />
        </div>

        <h2
          className="text-2xl font-bold"
          style={{
            color: palette.text.primary,
          }}
        >
          {emptyTitle}
        </h2>

        <p
          className="mt-3 max-w-md text-sm leading-6"
          style={{
            color: palette.text.secondary,
          }}
        >
          {emptySubtitle ||
            (query
              ? `No results found for "${query}". Try another title, actor, or keyword.`
              : "Search movies, TV shows, and anime from one place.")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        animate-fade-in
      "
    >
      {items.map((item) => (
        <div
          key={`${item.mediaType}-${item.id}`}
          className="
            transition-all
            duration-300
            hover:-translate-y-2
            hover:scale-105
          "
        >
          <MediaCard
            title={item.title}
            image={
              item.poster ||
              item.posterPath ||
              item.posterUrl
            }
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
  );
}

export default SearchResults;