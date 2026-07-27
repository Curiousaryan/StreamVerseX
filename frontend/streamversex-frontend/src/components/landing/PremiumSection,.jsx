import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const premiumFeatures = [
  {
    number: "01",
    title: "Smarter AI discovery",
    description:
      "Get deeper entertainment recommendations based on your mood, interests and viewing preferences.",
  },
  {
    number: "02",
    title: "Advanced personalization",
    description:
      "A more personalized StreamVerseX experience shaped around the entertainment you love.",
  },
  {
    number: "03",
    title: "Premium experience",
    description:
      "Unlock premium-only capabilities and get more from your entertainment universe.",
  },
  {
    number: "04",
    title: "Everything connected",
    description:
      "Keep your movies, shows, anime, favorites, watchlist and recommendations together.",
  },
];

function PremiumSection() {
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
          left-1/2 top-1/2
          h-[clamp(30rem,65vw,70rem)]
          w-[clamp(30rem,65vw,70rem)]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#e50914]/[0.08]
          blur-[180px]
        "
      />

      <div
        className="
          relative mx-auto w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
        "
      >
        <div
          className="
            relative overflow-hidden
            rounded-[clamp(1.25rem,2.5vw,2.5rem)]
            border border-white/10
            bg-[#080808]
          "
        >
          {/* Top red line */}
          <div
            aria-hidden="true"
            className="
              absolute inset-x-[10%] top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#e50914]/80
              to-transparent
            "
          />

          {/* Internal glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              right-[-10%] top-[-20%]
              h-[500px] w-[500px]
              rounded-full
              bg-[#e50914]/10
              blur-[130px]
            "
          />

          <div
            className="
              relative grid
              gap-[clamp(3rem,7vw,7rem)]
              p-[clamp(1.5rem,5vw,5rem)]
              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
            "
          >
            {/* LEFT */}

            <div>
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-[#e50914]/25
                  bg-[#e50914]/10
                  px-3 py-1.5
                  text-xs font-bold uppercase
                  tracking-[0.18em]
                  text-[#ff3944]
                "
              >
                <span
                  className="
                    h-1.5 w-1.5
                    rounded-full bg-[#e50914]
                  "
                />

                StreamVerseX Premium
              </div>

              <h2
                className="
                  mt-5 max-w-[12ch]
                  text-[clamp(2.3rem,5vw,5.4rem)]
                  font-black leading-[0.98]
                  tracking-[-0.045em]
                  text-white
                "
              >
                More from your
                <span className="text-[#e50914]">
                  {" "}universe.
                </span>
              </h2>

              <p
                className="
                  mt-6 max-w-xl
                  text-[clamp(0.95rem,1.3vw,1.1rem)]
                  leading-[1.7]
                  text-white/50
                "
              >
                Upgrade your StreamVerseX experience with
                enhanced personalization, intelligent discovery
                and premium features built around how you
                explore entertainment.
              </p>

              <div
                className="
                  mt-8 flex flex-wrap
                  items-center gap-4
                "
              >
                <Link
                  to={ROUTES.SUBSCRIPTION}
                  className="
                    inline-flex min-h-12
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
                  Explore Premium

                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>

                <span className="text-sm text-white/35">
                  Upgrade anytime
                </span>
              </div>
            </div>

            {/* RIGHT — FEATURE GRID */}

            <div
              className="
                grid gap-3
                sm:grid-cols-2
              "
            >
              {premiumFeatures.map((feature) => (
                <article
                  key={feature.number}
                  className="
                    group relative
                    min-h-[190px]
                    overflow-hidden
                    rounded-2xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-[clamp(1.25rem,3vw,1.75rem)]
                    transition duration-300
                    hover:-translate-y-1
                    hover:border-[#e50914]/25
                    hover:bg-white/[0.04]
                  "
                >
                  {/* Hover glow */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      right-[-50px] top-[-50px]
                      h-[130px] w-[130px]
                      rounded-full
                      bg-[#e50914]/0
                      blur-[60px]
                      transition-colors duration-300
                      group-hover:bg-[#e50914]/10
                    "
                  />

                  <span
                    className="
                      relative text-xs font-bold
                      tracking-[0.15em]
                      text-[#e50914]/60
                    "
                  >
                    {feature.number}
                  </span>

                  <h3
                    className="
                      relative mt-8
                      text-[clamp(1.05rem,1.6vw,1.35rem)]
                      font-bold text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      relative mt-2
                      text-sm leading-relaxed
                      text-white/40
                    "
                  >
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom strip */}

          <div
            className="
              relative grid
              border-t border-white/[0.07]
              bg-white/[0.015]
              sm:grid-cols-3
            "
          >
            <div className="px-6 py-5 text-center">
              <p className="text-sm font-bold text-white">
                Movies + TV
              </p>

              <p className="mt-1 text-xs text-white/30">
                One entertainment library
              </p>
            </div>

            <div
              className="
                border-y border-white/[0.07]
                px-6 py-5 text-center
                sm:border-x sm:border-y-0
              "
            >
              <p className="text-sm font-bold text-white">
                Anime + AI
              </p>

              <p className="mt-1 text-xs text-white/30">
                Discovery made personal
              </p>
            </div>

            <div className="px-6 py-5 text-center">
              <p className="text-sm font-bold text-white">
                One Profile
              </p>

              <p className="mt-1 text-xs text-white/30">
                Everything stays connected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PremiumSection;