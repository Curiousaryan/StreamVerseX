import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
} from "lucide-react";

function WatchlistHeader({
  total = 0,

  search = "",
  onSearch,

  filter = "ALL",
  onFilter,

  sort = "NEWEST",
  onSort,

  view = "GRID",
  onViewChange,
}) {
  return (
    <section className="mb-10">

      {/* Title */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-white
              md:text-5xl
            "
          >
            My Watchlist
          </h1>

          <p className="mt-3 text-gray-400">

            {total} saved titles

          </p>

        </div>

      </div>

      {/* Controls */}

      <div
        className="
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/70
          p-5
          backdrop-blur-xl
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4

            xl:flex-row
            xl:items-center
          "
        >

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearch(e.target.value)
              }
              placeholder="Search your watchlist..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-[#111]
                pl-11
                pr-4
                text-white
                outline-none
                transition

                focus:border-red-600
              "
            />

          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) =>
              onFilter(e.target.value)
            }
            className="
              h-12
              rounded-xl
              border
              border-zinc-700
              bg-[#111]
              px-4
              text-white
              outline-none
              focus:border-red-600
            "
          >
            <option value="ALL">
              All
            </option>

            <option value="MOVIE">
              Movies
            </option>

            <option value="TV">
              TV Shows
            </option>

            <option value="ANIME">
              Anime
            </option>

          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) =>
              onSort(e.target.value)
            }
            className="
              h-12
              rounded-xl
              border
              border-zinc-700
              bg-[#111]
              px-4
              text-white
              outline-none
              focus:border-red-600
            "
          >
            <option value="NEWEST">
              Newest
            </option>

            <option value="OLDEST">
              Oldest
            </option>

            <option value="TITLE">
              Title
            </option>

            <option value="STATUS">
              Status
            </option>

          </select>

          {/* View */}

          <div
            className="
              flex
              overflow-hidden
              rounded-xl
              border
              border-zinc-700
            "
          >

            <button
              onClick={() =>
                onViewChange("GRID")
              }
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                transition

                ${
                  view === "GRID"
                    ? "bg-red-600 text-white"
                    : "bg-[#111] text-gray-400 hover:text-white"
                }
              `}
            >
              <Grid3X3 size={18} />
            </button>

            <button
              onClick={() =>
                onViewChange("LIST")
              }
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                transition

                ${
                  view === "LIST"
                    ? "bg-red-600 text-white"
                    : "bg-[#111] text-gray-400 hover:text-white"
                }
              `}
            >
              <List size={18} />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WatchlistHeader;