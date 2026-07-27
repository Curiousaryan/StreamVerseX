import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const suggestions = [
  "Dark sci-fi",
  "Mind-bending",
  "Under 2 hours",
];

function AIDiscoverySection() {
  return (
    <section
      className="
        relative overflow-hidden bg-black
        py-[clamp(4rem,9vw,9rem)]
      "
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[clamp(25rem,55vw,60rem)]
          w-[clamp(25rem,55vw,60rem)]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-red-950/20
          blur-[160px]
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
        "
      >
        <div
          className="
            relative overflow-hidden
            rounded-[clamp(1rem,2vw,2rem)]
            border border-white/10
            bg-white/[0.035]
          "
        >
          {/* Top glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              left-[15%] top-[-45%]
              h-[350px] w-[350px]
              rounded-full
              bg-[#e50914]/15
              blur-[100px]
            "
          />

          <div
            className="
              relative grid
              gap-[clamp(3rem,7vw,7rem)]
              p-[clamp(1.5rem,5vw,5rem)]
              lg:grid-cols-[1fr_0.9fr]
              lg:items-center
            "
          >
            {/* ========================
                LEFT CONTENT
            ========================= */}

            <div className="max-w-2xl">
              <div
                className="
                  mb-5 inline-flex items-center gap-2
                  rounded-full
                  border border-[#e50914]/25
                  bg-[#e50914]/10
                  px-3 py-1.5
                  text-xs font-bold uppercase
                  tracking-[0.18em]
                  text-[#ff3440]
                "
              >
                <span
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-[#e50914]
                  "
                />

                StreamVerseX AI
              </div>

              <h2
                className="
                  max-w-[13ch]
                  text-[clamp(2.2rem,5vw,5.2rem)]
                  font-black
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-white
                "
              >
                Stop scrolling.
                <span className="text-[#e50914]">
                  {" "}Start watching.
                </span>
              </h2>

              <p
                className="
                  mt-[clamp(1.25rem,3vw,2rem)]
                  max-w-xl
                  text-[clamp(0.95rem,1.3vw,1.1rem)]
                  leading-[1.7]
                  text-white/55
                "
              >
                Tell StreamVerseX what you feel like watching.
                Our AI assistant turns your mood, genre,
                available time, and preferences into personalized
                entertainment recommendations.
              </p>

              <Link
                to={ROUTES.AI}
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
                Try AI Assistant
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            {/* ========================
                AI PREVIEW CARD
            ========================= */}

            <div className="relative mx-auto w-full max-w-[500px]">
              {/* Behind-card glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute
                  inset-[12%]
                  rounded-full
                  bg-[#e50914]/20
                  blur-[80px]
                "
              />

              <div
                className="
                  relative overflow-hidden
                  rounded-2xl
                  border border-white/10
                  bg-[#090909]/90
                  shadow-2xl
                  shadow-black/50
                  backdrop-blur-xl
                "
              >
                {/* Window header */}
                <div
                  className="
                    flex items-center
                    justify-between
                    border-b border-white/10
                    px-5 py-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-lg
                        bg-[#e50914]
                        font-black text-white
                      "
                    >
                      X
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        StreamVerseX AI
                      </p>

                      <p className="text-xs text-white/35">
                        Entertainment assistant
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      flex items-center gap-1.5
                      text-xs text-white/40
                    "
                  >
                    <span
                      className="
                        h-1.5 w-1.5
                        rounded-full bg-emerald-400
                      "
                    />

                    Online
                  </span>
                </div>

                {/* Conversation */}
                <div className="p-[clamp(1rem,3vw,1.5rem)]">
                  <div
                    className="
                      ml-auto max-w-[90%]
                      rounded-2xl rounded-br-md
                      bg-white/10
                      px-4 py-3
                    "
                  >
                    <p
                      className="
                        text-sm leading-relaxed
                        text-white/80
                      "
                    >
                      I want something dark and futuristic
                      with a strong story, but not longer
                      than two hours.
                    </p>
                  </div>

                  {/* Chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <span
                        key={suggestion}
                        className="
                          rounded-full
                          border border-white/10
                          bg-white/[0.04]
                          px-3 py-1.5
                          text-xs text-white/55
                        "
                      >
                        {suggestion}
                      </span>
                    ))}
                  </div>

                  {/* AI response */}
                  <div className="mt-6 flex gap-3">
                    <div
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-[#e50914]
                        text-xs font-black text-white
                      "
                    >
                      X
                    </div>

                    <div>
                      <p
                        className="
                          text-sm leading-relaxed
                          text-white/65
                        "
                      >
                        I found something that matches your
                        mood.
                      </p>

                      {/* Recommendation */}
                      <div
                        className="
                          mt-3 flex gap-4
                          rounded-xl
                          border border-white/10
                          bg-white/[0.04]
                          p-3
                        "
                      >
                        <div
                          className="
                            aspect-[2/3] w-16 shrink-0
                            rounded-lg
                            bg-gradient-to-br
                            from-red-950
                            via-zinc-900
                            to-black
                          "
                        />

                        <div className="min-w-0 py-1">
                          <p
                            className="
                              truncate
                              font-bold text-white
                            "
                          >
                            Neon Horizon
                          </p>

                          <div
                            className="
                              mt-1 flex flex-wrap
                              items-center gap-2
                              text-xs text-white/40
                            "
                          >
                            <span>2026</span>
                            <span>•</span>
                            <span>Sci-Fi</span>
                            <span>•</span>
                            <span>1h 52m</span>
                          </div>

                          <div
                            className="
                              mt-3 inline-flex
                              items-center gap-1
                              text-xs font-bold
                              text-[#ff3944]
                            "
                          >
                            ★ 91% Match
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fake input */}
                  <div
                    className="
                      mt-6 flex items-center
                      justify-between gap-3
                      rounded-xl
                      border border-white/10
                      bg-white/[0.035]
                      px-4 py-3
                    "
                  >
                    <span
                      className="
                        truncate text-sm
                        text-white/25
                      "
                    >
                      Ask what to watch...
                    </span>

                    <div
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-[#e50914]
                        text-sm font-bold text-white
                      "
                    >
                      ↑
                    </div>
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

export default AIDiscoverySection;