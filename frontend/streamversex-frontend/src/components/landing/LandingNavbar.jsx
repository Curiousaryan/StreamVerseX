import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="
          mx-auto flex w-full max-w-[1600px]
          items-center justify-between
          gap-3
          px-[clamp(1rem,4vw,4rem)]
          py-[clamp(1rem,2.2vw,1.75rem)]
        "
      >
        {/* Brand */}
        <Link
          to={ROUTES.LANDING}
          className="
            min-w-0 shrink
            text-[clamp(1rem,2.1vw,1.65rem)]
            font-black
            tracking-[clamp(0.03em,0.3vw,0.08em)]
            text-[#e50914]
          "
        >
          STREAMVERSEX
        </Link>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-[clamp(0.4rem,1vw,0.75rem)]">
          <Link
            to={ROUTES.LOGIN}
            className="
              inline-flex min-h-10 items-center justify-center
              whitespace-nowrap rounded-md
              border border-white/25
              px-[clamp(0.7rem,1.5vw,1rem)]
              py-2
              text-[clamp(0.75rem,1.2vw,0.875rem)]
              font-semibold text-white
              transition-colors duration-200
              hover:border-white/50
              hover:bg-white/10
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white
            "
          >
            Sign In
          </Link>

          <Link
            to={ROUTES.REGISTER}
            className="
              inline-flex min-h-10 items-center justify-center
              whitespace-nowrap rounded-md
              bg-[#e50914]
              px-[clamp(0.7rem,1.5vw,1rem)]
              py-2
              text-[clamp(0.75rem,1.2vw,0.875rem)]
              font-bold text-white
              transition-colors duration-200
              hover:bg-[#f6121d]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white
            "
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default LandingNavbar;