import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const features = [
  {
    id: "watchlist",
    number: "01",
    title: "Build your watchlist",
    description:
      "Save movies, TV shows and anime you want to watch and keep everything organized in one place.",
  },
  {
    id: "favorites",
    number: "02",
    title: "Keep your favorites close",
    description:
      "Create a personal collection of the stories, characters and worlds you love most.",
  },
  {
    id: "reviews",
    number: "03",
    title: "Rate. Review. Remember.",
    description:
      "Share your opinion, rate what you watch and keep track of your entertainment journey.",
  },
];

const savedItems = [
  {
    id: 1,
    title: "Neon Horizon",
    meta: "Movie • 2026",
    rating: "8.9",
  },
  {
    id: 2,
    title: "After Dark",
    meta: "TV Series • 2026",
    rating: "9.2",
  },
  {
    id: 3,
    title: "Crimson Moon",
    meta: "Anime • 2025",
    rating: "9.0",
  },
];

function PersonalHubSection() {
  return (
    <section
      className="
        relative overflow-hidden bg-black
        py-[clamp(4rem,9vw,9rem)]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[-15%] top-[15%]
          h-[clamp(25rem,50vw,55rem)]
          w-[clamp(25rem,50vw,55rem)]
          rounded-full
          bg-red-950/15
          blur-[160px]
        "
      />

      <div
        className="
          relative mx-auto w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
        "
      >
        {/* =================================
            SECTION HEADER
        ================================= */}

        <div className="mx-auto max-w-4xl text-center">
          <p
            className="
              text-[clamp(0.7rem,1vw,0.85rem)]
              font-bold uppercase
              tracking-[0.22em]
              text-[#e50914]
            "
          >
            Your Entertainment. Your Space.
          </p>

          <h2
            className="
              mt-4
              text-[clamp(2.2rem,5vw,5rem)]
              font-black
              leading-[1]
              tracking-[-0.04em]
              text-white
            "
          >
            Never lose track of
            <span className="text-white/35">
              {" "}what you love.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-2xl
              text-[clamp(0.9rem,1.3vw,1.1rem)]
              leading-[1.7]
              text-white/50
            "
          >
            Build your own entertainment library, save what
            matters, and keep your ratings and reviews connected
            to your profile.
          </p>
        </div>

        {/* =================================
            MAIN GRID
        ================================= */}

        <div
          className="
            mt-[clamp(3rem,7vw,6rem)]
            grid gap-[clamp(2rem,5vw,5rem)]
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-center
          "
        >
          {/* =============================
              LEFT — FEATURES
          ============================== */}

          <div>
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`
                  group grid
                  grid-cols-[auto_1fr]
                  gap-4
                  py-6
                  sm:gap-6
                  sm:py-8

                  ${
                    index !== features.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }
                `}
              >
                <span
                  className="
                    pt-1
                    text-xs font-bold
                    tracking-[0.15em]
                    text-[#e50914]/60
                  "
                >
                  {feature.number}
                </span>

                <div>
                  <h3
                    className="
                      text-[clamp(1.15rem,2vw,1.6rem)]
                      font-bold text-white
                      transition-colors duration-200
                      group-hover:text-[#ff3440]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-2 max-w-xl
                      text-[clamp(0.85rem,1.1vw,1rem)]
                      leading-relaxed
                      text-white/45
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to={ROUTES.REGISTER}
              className="
                mt-8 inline-flex min-h-12
                items-center justify-center
                rounded-md bg-[#e50914]
                px-6 py-3
                font-bold text-white
                transition duration-200
                hover:scale-[1.02]
                hover:bg-[#f6121d]
                active:scale-[0.98]
              "
            >
              Create Your Profile
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* =============================
              RIGHT — DASHBOARD PREVIEW
          ============================== */}

          <div className="relative mx-auto w-full max-w-[650px]">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                inset-[15%]
                rounded-full
                bg-[#e50914]/15
                blur-[100px]
              "
            />

            <div
              className="
                relative overflow-hidden
                rounded-[clamp(1rem,2vw,1.5rem)]
                border border-white/10
                bg-[#090909]
                shadow-2xl shadow-black/60
              "
            >
              {/* Preview navbar */}

              <div
                className="
                  flex items-center justify-between
                  border-b border-white/10
                  px-[clamp(1rem,3vw,1.5rem)]
                  py-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9 items-center
                      justify-center rounded-full
                      bg-gradient-to-br
                      from-[#e50914] to-red-950
                      text-sm font-black text-white
                    "
                  >
                    SV
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      My Library
                    </p>

                    <p className="text-xs text-white/35">
                      StreamVerseX
                    </p>
                  </div>
                </div>

                <span
                  className="
                    rounded-full
                    border border-white/10
                    bg-white/[0.04]
                    px-3 py-1
                    text-xs text-white/45
                  "
                >
                  12 saved
                </span>
              </div>

              {/* Tabs */}

              <div
                className="
                  flex gap-5 overflow-x-auto
                  border-b border-white/10
                  px-[clamp(1rem,3vw,1.5rem)]
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                <button
                  type="button"
                  className="
                    whitespace-nowrap
                    border-b-2 border-[#e50914]
                    py-4 text-sm font-semibold
                    text-white
                  "
                >
                  Watchlist
                </button>

                <button
                  type="button"
                  className="
                    whitespace-nowrap
                    border-b-2 border-transparent
                    py-4 text-sm
                    text-white/35
                  "
                >
                  Favorites
                </button>

                <button
                  type="button"
                  className="
                    whitespace-nowrap
                    border-b-2 border-transparent
                    py-4 text-sm
                    text-white/35
                  "
                >
                  Reviews
                </button>
              </div>

              {/* Saved items */}

              <div className="p-[clamp(1rem,3vw,1.5rem)]">
                <div className="space-y-3">
                  {savedItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="
                        group flex items-center gap-4
                        rounded-xl
                        border border-white/[0.07]
                        bg-white/[0.025]
                        p-3
                        transition-colors
                        hover:bg-white/[0.05]
                      "
                    >
                      {/* Fake poster */}

                      <div
                        className="
                          relative aspect-[2/3]
                          w-[clamp(3rem,7vw,4.5rem)]
                          shrink-0 overflow-hidden
                          rounded-lg
                          bg-gradient-to-br
                          from-red-950
                          via-zinc-900
                          to-black
                        "
                      >
                        <div
                          className="
                            absolute inset-0
                            flex items-center justify-center
                            text-2xl font-black
                            text-white/10
                          "
                        >
                          {index + 1}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4
                          className="
                            truncate
                            text-sm font-bold text-white
                            sm:text-base
                          "
                        >
                          {item.title}
                        </h4>

                        <p
                          className="
                            mt-1 text-xs
                            text-white/35
                          "
                        >
                          {item.meta}
                        </p>

                        <p
                          className="
                            mt-2 text-xs
                            font-bold text-[#ff3944]
                          "
                        >
                          ★ {item.rating}
                        </p>
                      </div>

                      {/* Saved indicator */}

                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-[#e50914]/20
                          bg-[#e50914]/10
                          text-[#ff3440]
                        "
                        title="Saved to watchlist"
                      >
                        ✓
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}

                <div
                  className="
                    mt-5 grid grid-cols-3
                    divide-x divide-white/10
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.025]
                    py-4
                  "
                >
                  <div className="px-2 text-center">
                    <p
                      className="
                        text-[clamp(1rem,2vw,1.4rem)]
                        font-black text-white
                      "
                    >
                      12
                    </p>

                    <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
                      Watchlist
                    </p>
                  </div>

                  <div className="px-2 text-center">
                    <p
                      className="
                        text-[clamp(1rem,2vw,1.4rem)]
                        font-black text-white
                      "
                    >
                      28
                    </p>

                    <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
                      Favorites
                    </p>
                  </div>

                  <div className="px-2 text-center">
                    <p
                      className="
                        text-[clamp(1rem,2vw,1.4rem)]
                        font-black text-white
                      "
                    >
                      17
                    </p>

                    <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
                      Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalHubSection;