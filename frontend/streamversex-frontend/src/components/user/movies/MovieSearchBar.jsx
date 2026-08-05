import { Search, X } from "lucide-react";

function MovieSearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search movies...",
}) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-700
          bg-zinc-900
          py-3
          pl-12
          pr-12
          text-white
          outline-none
          transition-all
          duration-300
          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/30
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default MovieSearchBar;