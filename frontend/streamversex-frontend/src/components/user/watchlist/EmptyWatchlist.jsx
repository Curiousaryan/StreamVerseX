import {
  BookmarkX,
  Film,
  Tv,
  Clapperboard,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../routes/routeConstants";

function EmptyWatchlist() {
  const navigate = useNavigate();

  return (
    <section
      className="
        flex
        min-h-[70vh]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          border
          border-red-600/30
          bg-red-600/10
          shadow-xl
          shadow-red-600/10
        "
      >
        <BookmarkX
          size={70}
          className="text-red-500"
        />
      </div>

      {/* Heading */}

      <h2
        className="
          mt-8
          text-4xl
          font-black
          text-white
        "
      >
        Your Watchlist is Empty
      </h2>

      {/* Description */}

      <p
        className="
          mt-5
          max-w-2xl
          text-lg
          leading-8
          text-gray-400
        "
      >
        Start building your personal collection by adding
        your favourite movies, TV shows and anime.
      </p>

      {/* Quick Navigation */}

      <div
        className="
          mt-12
          flex
          flex-wrap
          justify-center
          gap-5
        "
      >
        {/* Movies */}

        <button
          onClick={() =>
            navigate(ROUTES.MOVIES)
          }
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-red-600
            px-6
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-red-700
          "
        >
          <Film size={20} />

          Explore Movies
        </button>

        {/* TV */}

        <button
          onClick={() =>
            navigate(ROUTES.TV_SHOWS)
          }
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-6
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-red-600
          "
        >
          <Tv size={20} />

          TV Shows
        </button>

        {/* Anime */}

        <button
          onClick={() =>
            navigate(ROUTES.ANIME)
          }
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-6
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-red-600
          "
        >
          <Clapperboard size={20} />

          Anime
        </button>

      </div>

      {/* Footer Text */}

      <p
        className="
          mt-12
          text-sm
          tracking-wide
          text-zinc-500
        "
      >
        Discover. Save. Watch. Repeat.
      </p>

    </section>
  );
}

export default EmptyWatchlist;