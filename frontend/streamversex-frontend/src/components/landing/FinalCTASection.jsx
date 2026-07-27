import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

function FinalCTASection() {
  return (
    <section
      className="
        relative overflow-hidden bg-black
        py-[clamp(5rem,10vw,10rem)]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[clamp(25rem,60vw,65rem)]
          w-[clamp(25rem,60vw,65rem)]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#e50914]/10
          blur-[180px]
        "
      />

      {/* Horizontal red glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-px w-[80%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#e50914]/40
          to-transparent
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
            relative mx-auto
            max-w-5xl overflow-hidden
            rounded-[clamp(1.25rem,3vw,2.5rem)]
            border border-white/10
            bg-white/[0.025]
            px-[clamp(1.5rem,6vw,6rem)]
            py-[clamp(3rem,7vw,6rem)]
            text-center
          "
        >
          {/* Top highlight */}
          <div
            aria-hidden="true"
            className="
              absolute inset-x-[15%] top-0 h-px
              bg-gradient-to-r
              from-transparent
              via-[#e50914]
              to-transparent
            "
          />

          {/* X mark */}
          <div
            className="
              mx-auto flex
              h-12 w-12
              items-center justify-center
              rounded-xl
              bg-[#e50914]
              text-xl font-black
              text-white
              shadow-lg
              shadow-red-950/30
            "
          >
            X
          </div>

          <p
            className="
              mt-6
              text-[clamp(0.7rem,1vw,0.85rem)]
              font-bold uppercase
              tracking-[0.22em]
              text-[#e50914]
            "
          >
            Your next story is waiting
          </p>

          <h2
            className="
              mx-auto mt-4
              max-w-[15ch]
              text-[clamp(2.2rem,5.5vw,5.5rem)]
              font-black
              leading-[0.98]
              tracking-[-0.045em]
              text-white
            "
          >
            Find something worth
            <span className="text-[#e50914]">
              {" "}watching.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-[clamp(0.9rem,1.3vw,1.1rem)]
              leading-[1.7]
              text-white/50
            "
          >
            Movies, TV shows, anime, reviews, watchlists and
            intelligent recommendations — all inside your
            StreamVerseX universe.
          </p>

          {/* Actions */}
          <div
            className="
              mt-8 flex flex-wrap
              items-center justify-center
              gap-3
            "
          >
            <Link
              to={ROUTES.REGISTER}
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                bg-[#e50914]
                px-[clamp(1.5rem,3vw,2.25rem)]
                py-3
                font-bold text-white
                transition duration-200
                hover:scale-[1.02]
                hover:bg-[#f6121d]
                active:scale-[0.98]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              Get Started

              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              to={ROUTES.LOGIN}
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                border border-white/15
                bg-white/[0.05]
                px-[clamp(1.5rem,3vw,2.25rem)]
                py-3
                font-semibold text-white
                transition duration-200
                hover:border-white/25
                hover:bg-white/10
                active:scale-[0.98]
              "
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/25">
            Create your StreamVerseX account and start exploring.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;