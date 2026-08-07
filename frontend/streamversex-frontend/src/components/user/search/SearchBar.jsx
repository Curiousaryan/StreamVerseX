import { Search, X } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  autoFocus = true,
}) {
  return (
    <div className="mb-10 flex justify-center px-4">
      <div className="relative w-full max-w-3xl">

        {/* Search Icon */}
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />

        {/* Input */}
        <input
          type="text"
          data-page-search-input
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900/95
            py-4
            pl-12
            pr-12
            text-white
            text-base
            placeholder:text-gray-500
            shadow-xl
            backdrop-blur-md
            outline-none
            transition-all
            duration-300
            focus:border-red-500
            focus:ring-2
            focus:ring-red-500/30
            hover:border-zinc-500
          "
        />

        {/* Clear */}
        {value && (
          <button
            type="button"
            aria-label="Clear Search"
            onClick={onClear}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              rounded-full
              p-1
              text-gray-400
              transition-all
              duration-200
              hover:bg-zinc-800
              hover:text-white
              active:scale-90
            "
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;