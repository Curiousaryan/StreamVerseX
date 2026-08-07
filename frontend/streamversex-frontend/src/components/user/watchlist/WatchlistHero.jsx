import {
  Bookmark,
  PlayCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function WatchlistHero({
  total = 0,
  planned = 0,
  watching = 0,
  completed = 0,
}) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-gradient-to-br
        from-zinc-900
        via-[#111]
        to-[#050505]
        p-8
        shadow-2xl
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-24
          -top-24
          h-80
          w-80
          rounded-full
          bg-red-600/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* ================= Header ================= */}

        <div
          className="
            flex
            flex-col
            gap-10

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Left */}

          <div className="max-w-2xl">

            <span
              className="
                inline-flex
                rounded-full
                border
                border-red-600/30
                bg-red-600/10
                px-4
                py-2
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-red-400
              "
            >
              PERSONAL COLLECTION
            </span>

            <h1
              className="
                mt-6
                text-5xl
                font-black
                tracking-tight
                text-white

                lg:text-6xl
              "
            >
              My Watchlist
            </h1>

            <p
              className="
                mt-5
                text-lg
                leading-8
                text-gray-400
              "
            >
              Save your favourite movies, TV shows and anime.
              Organize what you're planning to watch,
              continue where you left off,
              and keep track of completed titles.
            </p>

          </div>

          {/* Right */}

          <div
            className="
              flex
              h-48
              w-48
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-red-600/30
              bg-red-600/10
              backdrop-blur-md
              transition-all
              duration-500

              hover:scale-105
              hover:border-red-500
            "
          >

            <Bookmark
              size={38}
              className="text-red-500"
            />

            <h2
              className="
                mt-3
                text-6xl
                font-black
                text-white
              "
            >
              {total}
            </h2>

            <p className="mt-1 text-gray-400">
              Saved Titles
            </p>

          </div>

        </div>

        {/* ================= Statistics ================= */}

        <div
          className="
            mt-12
            grid
            gap-6

            md:grid-cols-3
          "
        >

          {/* Planned */}

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              transition-all
              duration-300

              hover:-translate-y-1

              hover:border-red-600
            "
          >

            <div className="flex items-center gap-3">

              <Clock3
                size={22}
                className="text-red-400"
              />

              <span className="font-semibold text-white">
                Planned
              </span>

            </div>

            <h3
              className="
                mt-5
                text-4xl
                font-black
                text-white
              "
            >
              {planned}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Ready to watch
            </p>

          </div>

          {/* Watching */}

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              transition-all
              duration-300

              hover:-translate-y-1

              hover:border-red-600
            "
          >

            <div className="flex items-center gap-3">

              <PlayCircle
                size={22}
                className="text-red-400"
              />

              <span className="font-semibold text-white">
                Watching
              </span>

            </div>

            <h3
              className="
                mt-5
                text-4xl
                font-black
                text-white
              "
            >
              {watching}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Continue watching
            </p>

          </div>

          {/* Completed */}

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              transition-all
              duration-300

              hover:-translate-y-1

              hover:border-red-600
            "
          >

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={22}
                className="text-red-400"
              />

              <span className="font-semibold text-white">
                Completed
              </span>

            </div>

            <h3
              className="
                mt-5
                text-4xl
                font-black
                text-white
              "
            >
              {completed}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Finished titles
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WatchlistHero;