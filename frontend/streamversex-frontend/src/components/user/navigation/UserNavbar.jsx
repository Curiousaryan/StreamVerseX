import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  UserRound,
  LogOut,
  Menu,
  Heart,
} from "lucide-react";

import { ROUTES } from "../../../routes/routeConstants";

function UserNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Movies", path: ROUTES.MOVIES },
    { name: "TV Shows", path: ROUTES.TV_SHOWS },
    { name: "Anime", path: ROUTES.ANIME },
    { name: "Watchlist", path: ROUTES.WATCHLIST },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4 md:px-8">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-4 text-gray-300 transition hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <NavLink
          to={ROUTES.HOME}
          className="mr-10 text-xl font-bold tracking-wide text-red-600 md:text-2xl"
        >
          StreamVerseX
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3 md:gap-5">

          <button
            type="button"
            onClick={() => navigate(ROUTES.SEARCH)}
            className="text-gray-300 transition hover:text-white"
            aria-label="Search"
          >
            <Search size={21} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.FAVORITES)}
            className="hidden text-gray-300 transition hover:text-white sm:block"
            aria-label="Favorites"
          >
            <Heart size={21} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            className="text-gray-300 transition hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={21} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.PROFILE)}
            className="text-gray-300 transition hover:text-white"
            aria-label="Profile"
          >
            <UserRound size={21} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden text-gray-300 transition hover:text-red-500 sm:block"
            aria-label="Logout"
          >
            <LogOut size={21} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default UserNavbar;