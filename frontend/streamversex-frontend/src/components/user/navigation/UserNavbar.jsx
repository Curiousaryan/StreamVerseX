import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import {
  Search,
  Bell,
  UserRound,
  LogOut,
  Menu as MenuIcon,
  X,
  Heart,
  Home,
  Film,
  Tv,
  Sparkles,
  Bookmark,
  Bot,
  Crown,
  ChevronDown,
  Settings,
  Star,
} from "lucide-react";

import { ROUTES } from "../../../routes/routeConstants";

const NAV_LINKS = [
  { name: "Home", path: ROUTES.HOME, icon: Home },
  { name: "Movies", path: ROUTES.MOVIES, icon: Film },
  { name: "TV Shows", path: ROUTES.TV_SHOWS, icon: Tv },
  { name: "Anime", path: ROUTES.ANIME, icon: Sparkles },
  { name: "Watchlist", path: ROUTES.WATCHLIST, icon: Bookmark },
];

const MENU_LINKS = [
  { name: "AI Assistant", path: ROUTES.AI, icon: Bot },
  { name: "Subscription", path: ROUTES.SUBSCRIPTION, icon: Crown },
  { name: "My Reviews", path: ROUTES.REVIEWS, icon: Star },
  { name: "Profile", path: ROUTES.PROFILE, icon: UserRound },
  { name: "Settings", path: ROUTES.EDIT_PROFILE, icon: Settings },
];

function getInitial(name, email) {
  const source = name || email || "";
  return source.trim().charAt(0).toUpperCase() || "U";
}

function UserNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 12,
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const searchInputRef = useRef(null);
  const profileOpen = Boolean(anchorEl);

  const displayName = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const initial = getInitial(displayName, email);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setAnchorEl(null);
    setMobileOpen(false);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    navigate(query ? `${ROUTES.SEARCH}?q=${encodeURIComponent(query)}` : ROUTES.SEARCH);
    setSearchOpen(false);
    setSearchValue("");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component={motion.div}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        sx={{
          backgroundColor: scrolled
            ? "rgba(11, 11, 15, 0.95)"
            : "transparent",
          backgroundImage: scrolled
            ? "none"
            : "linear-gradient(to bottom, rgba(11,11,15,1), rgba(11,11,15,0))",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.3s ease",
          color: "#fff",
        }}
      >
        <Toolbar
          disableGutters
          className="relative mx-auto w-full max-w-[1600px] px-4 md:px-8"
        >
          {/* Mobile menu trigger */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            className="md:!hidden"
            sx={{ color: "grey.300", mr: 1, "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
            aria-label="Open menu"
          >
            <MenuIcon size={24} />
          </IconButton>

          {/* Logo */}
          <Typography
            component={NavLink}
            to={ROUTES.HOME}
            className="mr-2 shrink-0 no-underline md:mr-0"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              letterSpacing: "-0.02em",
              color: theme.palette.primary.main,
            }}
          >
            StreamVerse<span style={{ color: "#fff" }}>X</span>
          </Typography>

          {/* Desktop links — centered independent of logo/actions width */}
          <Box
            component="nav"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative whitespace-nowrap px-1 py-2 text-sm font-medium no-underline transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: theme.palette.primary.main }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </Box>

          {/* Actions */}
          <Box className="ml-auto flex items-center gap-1 md:gap-2">
            {/* Search */}
            <Box className="flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                {searchOpen ? (
                  <motion.form
                    key="search-open"
                    onSubmit={handleSearchSubmit}
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center overflow-hidden rounded-full border border-white/15 bg-white/5 pl-3 pr-1"
                  >
                    <Search size={16} className="shrink-0 text-gray-400" />
                    <InputBase
                      inputRef={searchInputRef}
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      onBlur={() => !searchValue && setSearchOpen(false)}
                      placeholder="Search titles..."
                      sx={{
                        color: "#fff",
                        px: 1,
                        py: 0.5,
                        fontSize: "0.875rem",
                        width: { xs: 112, sm: 176 },
                        "& input::placeholder": { color: "grey.500", opacity: 1 },
                      }}
                    />
                    <IconButton
                      type="button"
                      size="small"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchValue("");
                      }}
                      sx={{ color: "grey.400", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                      aria-label="Close search"
                    >
                      <X size={14} />
                    </IconButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="search-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <IconButton
                      onClick={() => setSearchOpen(true)}
                      sx={{ color: "grey.300", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
                      aria-label="Search"
                    >
                      <Search size={20} />
                    </IconButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            <Tooltip title="Favorites">
              <IconButton
                onClick={() => navigate(ROUTES.FAVORITES)}
                className="!hidden sm:!inline-flex"
                sx={{ color: "grey.300", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
                aria-label="Favorites"
              >
                <Heart size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                onClick={() => navigate(ROUTES.NOTIFICATIONS)}
                sx={{ color: "grey.300", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
                aria-label="Notifications"
              >
                <Badge variant="dot" color="error" overlap="circular">
                  <Bell size={20} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile dropdown */}
            <Tooltip title="Account">
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                className="!ml-1"
                sx={{ p: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label="Account menu"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                >
                  {initial}
                </Avatar>
                {isDesktop && (
                  <ChevronDown
                    size={16}
                    className={`ml-1 text-gray-400 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={profileOpen}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 224,
                    bgcolor: "#15151b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                  },
                },
              }}
            >
              <Box className="px-4 py-3">
                <Typography noWrap sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>
                  {displayName || "My Account"}
                </Typography>
                {email && (
                  <Typography noWrap sx={{ fontSize: "0.75rem", color: "grey.500" }}>
                    {email}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

              {MENU_LINKS.map(({ name, path, icon: Icon }) => (
                <MenuItem
                  key={path}
                  component={NavLink}
                  to={path}
                  onClick={() => setAnchorEl(null)}
                  sx={{
                    gap: 1.5,
                    py: 1.25,
                    px: 2,
                    fontSize: "0.875rem",
                    color: "grey.300",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "#fff" },
                  }}
                >
                  <Icon size={16} />
                  {name}
                </MenuItem>
              ))}

              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  gap: 1.5,
                  py: 1.25,
                  px: 2,
                  fontSize: "0.875rem",
                  color: "grey.300",
                  "&:hover": { bgcolor: "rgba(229,9,20,0.1)", color: theme.palette.primary.main },
                }}
              >
                <LogOut size={16} />
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80%",
              maxWidth: 320,
              bgcolor: "#0b0b0f",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              p: 2.5,
            },
          },
        }}
      >
        <Box className="mb-6 flex items-center justify-between">
          <Typography sx={{ fontWeight: 900, fontSize: "1.25rem", color: theme.palette.primary.main }}>
            StreamVerse<span style={{ color: "#fff" }}>X</span>
          </Typography>

          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "grey.400", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
            aria-label="Close menu"
          >
            <X size={22} />
          </IconButton>
        </Box>

        <Box className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              fontSize: "1rem",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {initial}
          </Avatar>
          <Box className="min-w-0">
            <Typography noWrap sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>
              {displayName || "My Account"}
            </Typography>
            {email && (
              <Typography noWrap sx={{ fontSize: "0.75rem", color: "grey.500" }}>
                {email}
              </Typography>
            )}
          </Box>
        </Box>

        <Box component="nav" className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {[...NAV_LINKS, ...MENU_LINKS].map(({ name, path, icon: Icon }, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
            >
              <NavLink
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium no-underline transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            </motion.div>
          ))}
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          component="button"
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={18} />
          Log out
        </Box>
      </Drawer>
    </>
  );
}

export default UserNavbar;