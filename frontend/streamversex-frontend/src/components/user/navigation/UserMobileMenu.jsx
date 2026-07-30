import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Film,
  Tv,
  Heart,
  Bookmark,
  Bot,
  Crown,
  UserRound,
  LogOut,
} from "lucide-react";

import { ROUTES } from "../../../routes/routeConstants";

function UserMobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: ROUTES.HOME, icon: Home },
    { name: "Movies", path: ROUTES.MOVIES, icon: Film },
    { name: "TV Shows", path: ROUTES.TV_SHOWS, icon: Tv },
    { name: "Anime", path: ROUTES.ANIME, icon: Tv },
    { name: "Favorites", path: ROUTES.FAVORITES, icon: Heart },
    { name: "Watchlist", path: ROUTES.WATCHLIST, icon: Bookmark },
    { name: "AI Assistant", path: ROUTES.AI, icon: Bot },
    { name: "Subscription", path: ROUTES.SUBSCRIPTION, icon: Crown },
    { name: "Profile", path: ROUTES.PROFILE, icon: UserRound },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] md:hidden">

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Drawer */}
      <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/10 bg-zinc-950 p-5">

        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            StreamVerseX
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />

              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-3 text-gray-400 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={19} />

          Logout
        </button>

      </aside>
    </div>
  );
}

export default UserMobileMenu;