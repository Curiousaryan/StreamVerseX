import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import WatchlistHero from "../../components/user/watchlist/WatchlistHero";
import WatchlistHeader from "../../components/user/watchlist/WatchlistHeader";
import WatchlistFilters from "../../components/user/watchlist/WatchlistFilters";
import WatchlistGrid from "../../components/user/watchlist/WatchlistGrid";
import { useWatchlist } from "../../context/WatchlistContext";

function Watchlist() {
  const navigate = useNavigate();

  const {
    watchlist,
    loading,
    remove,
    updateStatus,
  } = useWatchlist();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");
  const [view, setView] = useState("GRID");

  // =========================================
  // Search + Filter + Sort
  // =========================================

  const filteredItems = useMemo(() => {
    let items = [...watchlist];

    // Search

    if (search.trim()) {
      items = items.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter

    if (filter !== "ALL") {
      items = items.filter(
        (item) => item.contentType === filter
      );
    }

    // Sort

    switch (sort) {
      case "TITLE":
        items.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "OLDEST":
        items.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "STATUS":
        items.sort((a, b) =>
          a.status.localeCompare(b.status)
        );
        break;

      default:
        items.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return items;
  }, [watchlist, search, filter, sort]);

  // =========================================
  // Statistics
  // =========================================

  const counts = {
    ALL: watchlist.length,

    MOVIE: watchlist.filter(
      (item) => item.contentType === "MOVIE"
    ).length,

    TV: watchlist.filter(
      (item) => item.contentType === "TV"
    ).length,

    ANIME: watchlist.filter(
      (item) => item.contentType === "ANIME"
    ).length,
  };

  const planned = watchlist.filter(
    (item) => item.status === "PLANNED"
  ).length;

  const watching = watchlist.filter(
    (item) => item.status === "WATCHING"
  ).length;

  const completed = watchlist.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const dropped = watchlist.filter(
    (item) => item.status === "DROPPED"
  ).length;

  // =========================================
  // Navigate
  // =========================================

  const handleView = (item) => {
    switch (item.contentType) {
      case "MOVIE":
        navigate(`/movies/${item.contentId}`);
        break;

      case "TV":
        navigate(`/tv/${item.contentId}`);
        break;

      case "ANIME":
        navigate(`/anime/${item.contentId}`);
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Hero */}

      <section className="mx-auto max-w-7xl px-6 pt-32">

        <WatchlistHero
          total={watchlist.length}
          planned={planned}
          watching={watching}
          completed={completed}
          dropped={dropped}
        />

      </section>

      {/* Toolbar */}

      <section className="mx-auto mt-10 max-w-7xl px-6">

        <WatchlistHeader
          total={watchlist.length}
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
          sort={sort}
          onSort={setSort}
          view={view}
          onViewChange={setView}
        />

      </section>

      {/* Filter Chips */}

      <section className="mx-auto mt-8 max-w-7xl px-6">

        <WatchlistFilters
          selected={filter}
          counts={counts}
          onChange={setFilter}
        />

      </section>

      {/* Cards */}

      <section className="mx-auto mt-6 max-w-7xl px-6 pb-20">

        <WatchlistGrid
          loading={loading}
          items={filteredItems}
          view={view}
          onView={handleView}
          onRemove={remove}
          onStatusChange={updateStatus}
        />

      </section>

    </div>
  );
}

export default Watchlist;