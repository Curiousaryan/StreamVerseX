import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

function UserFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1600px] px-6 py-10">

        <div className="flex flex-col justify-between gap-8 md:flex-row">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-red-600">
              StreamVerseX
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Discover movies, TV shows and anime. Build your
              watchlist, save favourites and find what to watch next.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">

            <NavLink
              to={ROUTES.HOME}
              className="hover:text-white"
            >
              Home
            </NavLink>

            <NavLink
              to={ROUTES.MOVIES}
              className="hover:text-white"
            >
              Movies
            </NavLink>

            <NavLink
              to={ROUTES.TV_SHOWS}
              className="hover:text-white"
            >
              TV Shows
            </NavLink>

            <NavLink
              to={ROUTES.ANIME}
              className="hover:text-white"
            >
              Anime
            </NavLink>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} StreamVerseX. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default UserFooter;