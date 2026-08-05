function GenreFilter({
  genres = [],
  selectedGenre = "all",
  onGenreChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* All */}
      <button
        type="button"
        onClick={() => onGenreChange("all")}
        className={`
          rounded-full
          px-4
          py-2
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            selectedGenre === "all"
              ? "bg-red-600 text-white"
              : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
          }
        `}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onGenreChange(genre.id)}
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition-all
            duration-300
            ${
              selectedGenre === genre.id
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }
          `}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;