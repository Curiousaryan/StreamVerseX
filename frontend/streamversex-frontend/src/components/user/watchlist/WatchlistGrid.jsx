import WatchlistCard from "./WatchlistCard";
import EmptyWatchlist from "./EmptyWatchlist";

function WatchlistGrid({
  items = [],
  loading = false,
  onView,
  onRemove,
  onStatusChange,
  view = "GRID",
}) {
  // ===========================
  // Loading State
  // ===========================

  if (loading) {
    return (
     <div
  className={
    view === "GRID"
      ? `
        grid
        gap-8
        px-6
        pb-12
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      `
      : `
        flex
        flex-col
        gap-5
        px-6
        pb-12
      `
  }
>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="
              animate-pulse
              overflow-hidden
              rounded-2xl
              bg-zinc-900
            "
          >
            <div className="aspect-[2/3] bg-zinc-800" />

            <div className="space-y-4 p-5">
              <div className="h-5 rounded bg-zinc-800" />
              <div className="h-4 w-2/3 rounded bg-zinc-800" />
              <div className="h-10 rounded bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ===========================
  // Empty State
  // ===========================

  if (!items.length) {
    return <EmptyWatchlist />;
  }

  // ===========================
  // Grid
  // ===========================

  return (
    <div
      className="
        grid
        gap-8
        px-6
        pb-12
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      "
    >
      {items.map((item) => (
        <WatchlistCard
          key={`${item.contentType}-${item.contentId}`}
          item={item}
          view = {view}
          onView={onView}
          onRemove={onRemove}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default WatchlistGrid;