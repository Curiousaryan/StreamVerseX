import {
  Film,
  Tv,
  Clapperboard,
  Layers3,
} from "lucide-react";

const FILTERS = [
  {
    id: "ALL",
    label: "All",
    icon: Layers3,
  },
  {
    id: "MOVIE",
    label: "Movies",
    icon: Film,
  },
  {
    id: "TV",
    label: "TV Shows",
    icon: Tv,
  },
  {
    id: "ANIME",
    label: "Anime",
    icon: Clapperboard,
  },
];

function WatchlistFilters({
  selected = "ALL",
  counts = {},
  onChange,
}) {
  return (
    <div
      className="
        mb-8
        flex
        flex-wrap
        gap-4
      "
    >
      {FILTERS.map((filter) => {
        const Icon = filter.icon;

        const active =
          selected === filter.id;

        return (
          <button
            key={filter.id}
            onClick={() =>
              onChange(filter.id)
            }
            className={`
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              px-5
              py-3
              transition-all
              duration-300

              ${
                active
                  ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "border-zinc-700 bg-zinc-900 text-gray-300 hover:border-red-500 hover:text-white"
              }
            `}
          >
            <Icon size={18} />

            <span
              className="
                text-sm
                font-semibold
              "
            >
              {filter.label}
            </span>

            <span
              className={`
                flex
                h-6
                min-w-[24px]
                items-center
                justify-center
                rounded-full
                px-2
                text-xs
                font-bold

                ${
                  active
                    ? "bg-white/20"
                    : "bg-zinc-800"
                }
              `}
            >
              {counts[filter.id] ?? 0}
            </span>

          </button>
        );
      })}
    </div>
  );
}

export default WatchlistFilters;