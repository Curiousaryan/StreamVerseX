import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

function HeroSection() {
  return (
    <section
      className="
        relative isolate
        flex min-h-[100svh]
        items-center
        overflow-hidden
        bg-black
      "
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-30
          bg-black
        "
      />

      {/* Main red atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -z-20
          left-[clamp(45%,65vw,75%)]
          top-[35%]
          h-[clamp(20rem,50vw,55rem)]
          w-[clamp(20rem,50vw,55rem)]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#e50914]/10
          blur-[clamp(70px,10vw,160px)]
        "
      />

      {/* Secondary glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -z-20
          bottom-[-15%] left-[-10%]
          h-[clamp(16rem,35vw,35rem)]
          w-[clamp(16rem,35vw,35rem)]
          rounded-full
          bg-red-950/20
          blur-[clamp(70px,10vw,150px)]
        "
      />

      {/* Top gradient for navbar readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 -z-10
          h-[30%]
          bg-gradient-to-b
          from-black/80 via-black/30 to-transparent
        "
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0 -z-10
          h-[40%]
          bg-gradient-to-t
          from-black via-black/60 to-transparent
        "
      />

      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          mx-auto w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
          pb-[clamp(3rem,8vh,7rem)]
          pt-[clamp(7rem,14vh,10rem)]
        "
      >
        <div className="w-full max-w-[min(52rem,92vw)]">

          {/* Eyebrow */}
          <p
            className="
              mb-[clamp(0.8rem,2vh,1.25rem)]
              text-[clamp(0.7rem,1.1vw,0.9rem)]
              font-bold uppercase
              tracking-[clamp(0.12em,0.5vw,0.25em)]
              text-[#e50914]
            "
          >
            Movies • TV • Anime • AI
          </p>

          {/* Heading */}
          <h1
            className="
              max-w-[14ch]
              text-[clamp(2.5rem,6vw,6.5rem)]
              font-black
              leading-[0.98]
              tracking-[-0.035em]
              text-white
            "
          >
            Your universe of{" "}
            <span className="text-[#e50914]">
              entertainment.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-[clamp(1.25rem,3vh,2rem)]
              max-w-[62ch]
              text-[clamp(0.95rem,1.4vw,1.2rem)]
              leading-[1.65]
              text-white/70
            "
          >
            Discover movies, TV shows and anime, build your
            watchlist, share reviews, and get intelligent
            recommendations from StreamVerseX.
          </p>

          {/* CTA */}
          <div
            className="
              mt-[clamp(1.5rem,4vh,2.5rem)]
              flex flex-wrap
              items-center
              gap-3
            "
          >
            <Link
              to={ROUTES.REGISTER}
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md bg-[#e50914]
                px-[clamp(1.25rem,2.5vw,2rem)]
                py-3
                text-[clamp(0.9rem,1.2vw,1rem)]
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
            </Link>

            <Link
              to={ROUTES.LOGIN}
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                border border-white/20
                bg-white/10
                px-[clamp(1.25rem,2.5vw,2rem)]
                py-3
                text-[clamp(0.9rem,1.2vw,1rem)]
                font-semibold text-white
                backdrop-blur-md
                transition duration-200
                hover:bg-white/15
                active:scale-[0.98]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;