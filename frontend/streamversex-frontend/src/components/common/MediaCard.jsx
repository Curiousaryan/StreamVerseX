function MediaCard({
  title,
  image,
  year,
  rating,
  type = "Movie",
}) {
  return (
    <article
      className="
        group relative
        w-[clamp(140px,16vw,220px)]
        shrink-0 cursor-pointer
      "
    >
      {/* Poster */}
      <div
        className="
          relative aspect-[2/3]
          overflow-hidden rounded-lg
          bg-zinc-900
        "
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/90
            via-black/10
            to-transparent
            opacity-70
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Rating */}
        <div
          className="
            absolute right-2 top-2
            rounded-md
            bg-black/70
            px-2 py-1
            text-xs font-bold
            text-white
            backdrop-blur-md
          "
        >
          ★ {rating}
        </div>

        {/* Information */}
        <div
          className="
            absolute inset-x-0 bottom-0
            translate-y-1
            p-3
            transition-transform
            duration-300
            group-hover:translate-y-0
          "
        >
          <h3
            className="
              line-clamp-2
              text-sm font-bold
              leading-tight
              text-white
              sm:text-base
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-1.5 flex items-center
              gap-2 text-xs
              text-white/65
            "
          >
            <span>{year}</span>

            <span className="h-1 w-1 rounded-full bg-white/40" />

            <span>{type}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MediaCard;