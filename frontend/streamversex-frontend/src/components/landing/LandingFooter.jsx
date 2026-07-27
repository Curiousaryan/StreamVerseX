import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const exploreLinks = [
  {
    label: "Movies",
    route: ROUTES.MOVIES,
  },
  {
    label: "TV Shows",
    route: ROUTES.TV_SHOWS,
  },
  {
    label: "Anime",
    route: ROUTES.ANIME,
  },
  {
    label: "AI Assistant",
    route: ROUTES.AI,
  },
];

const accountLinks = [
  {
    label: "Sign In",
    route: ROUTES.LOGIN,
  },
  {
    label: "Create Account",
    route: ROUTES.REGISTER,
  },
  {
    label: "Premium",
    route: ROUTES.SUBSCRIPTION,
  },
];

function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative border-t
        border-white/[0.07]
        bg-[#050505]
      "
    >
      <div
        className="
          mx-auto w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
          py-[clamp(3rem,6vw,5rem)]
        "
      >
        <div
          className="
            grid gap-10
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_0.7fr_0.7fr]
          "
        >
          {/* Brand */}
          <div className="max-w-md">
            <Link
              to={ROUTES.LANDING}
              className="
                inline-block
                text-[clamp(1.3rem,2vw,1.8rem)]
                font-black
                tracking-[0.07em]
                text-[#e50914]
              "
            >
              STREAMVERSEX
            </Link>

            <p
              className="
                mt-4 max-w-sm
                text-sm leading-6
                text-white/40
              "
            >
              One universe for movies, TV shows, anime,
              reviews, personalized discovery and intelligent
              entertainment recommendations.
            </p>

            <p
              className="
                mt-5
                text-xs uppercase
                tracking-[0.16em]
                text-white/20
              "
            >
              Movies • TV • Anime • AI
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="
                text-xs font-bold uppercase
                tracking-[0.18em]
                text-white/70
              "
            >
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.route}
                    className="
                      text-sm text-white/40
                      transition-colors duration-200
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3
              className="
                text-xs font-bold uppercase
                tracking-[0.18em]
                text-white/70
              "
            >
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.route}
                    className="
                      text-sm text-white/40
                      transition-colors duration-200
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-[clamp(2.5rem,5vw,4rem)]
            flex flex-col
            gap-4
            border-t border-white/[0.07]
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-white/25">
            © {currentYear} StreamVerseX. All rights reserved.
          </p>

          <p
            className="
              text-xs
              text-white/20
            "
          >
            Discover your next obsession.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;