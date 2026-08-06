import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  {
    label: "Trending",
    value: "trending",
  },
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top-rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Now Playing",
    value: "now-playing",
  },
];

function SortDropdown({
  value,
  onChange,
}) {
  return (
    <div className="relative w-full sm:w-56">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          appearance-none
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
          pr-10
          text-sm
          text-white
          outline-none
          transition-all
          duration-300
          hover:border-zinc-500
          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/30
        "
      >
        {SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />
    </div>
  );
}

export default SortDropdown;