import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

function AuthLayout({ children }) {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      {/* =========================
          BACKGROUND
      ========================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_75%_30%,rgba(229,9,20,0.12),transparent_35%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-[-20%] left-[-10%]
          h-[clamp(25rem,55vw,60rem)]
          w-[clamp(25rem,55vw,60rem)]
          rounded-full
          bg-red-950/15
          blur-[160px]
        "
      />

      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="absolute inset-x-0 top-0 z-30">
        <nav
          className="
            mx-auto flex w-full max-w-[1600px]
            items-center justify-between
            gap-4
            px-[clamp(1rem,4vw,4rem)]
            py-[clamp(1rem,2.2vw,1.75rem)]
          "
        >
          <Link
            to={ROUTES.LANDING}
            className="
              text-[clamp(1rem,2vw,1.6rem)]
              font-black
              tracking-[0.07em]
              text-[#e50914]
            "
          >
            STREAMVERSEX
          </Link>

          <Link
            to={ROUTES.LANDING}
            className="
              text-sm font-semibold
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            Back to home
          </Link>
        </nav>
      </header>

      {/* =========================
          CONTENT
      ========================== */}

      <div
        className="
          relative z-10
          mx-auto flex
          min-h-[100svh]
          w-full max-w-[1600px]
          items-center
          justify-center
          px-[clamp(1rem,4vw,4rem)]
          pb-[clamp(2rem,5vh,4rem)]
          pt-[clamp(6.5rem,12vh,9rem)]
        "
      >
        <div
          className="
            grid w-full max-w-[1200px]
            gap-[clamp(3rem,7vw,7rem)]
            lg:grid-cols-[1fr_0.85fr]
            lg:items-center
          "
        >
          {/* LEFT SIDE */}

          <section className="hidden max-w-xl lg:block">
            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.24em]
                text-[#e50914]
              "
            >
              Welcome to StreamVerseX
            </p>

            <h1
              className="
                mt-5
                text-[clamp(3rem,5vw,5.5rem)]
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                text-white
              "
            >
              Your universe
              <span className="text-[#e50914]">
                {" "}awaits.
              </span>
            </h1>

            <p
              className="
                mt-6 max-w-lg
                text-[clamp(0.95rem,1.2vw,1.1rem)]
                leading-[1.7]
                text-white/45
              "
            >
              Sign in to continue exploring movies, TV shows,
              anime, personalized recommendations, watchlists,
              favorites and reviews.
            </p>

            {/* Features */}
            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Movies",
                "TV Shows",
                "Anime",
                "AI Discovery",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border border-white/10
                    bg-white/[0.03]
                    px-3 py-1.5
                    text-xs text-white/40
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* RIGHT SIDE */}

          <section className="mx-auto w-full max-w-[460px]">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;