import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

import {
  Film,
  Tv,
  Sparkles,
  Bookmark,
  Heart,
  Star,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";

import { ROUTES } from "../../routes/routeConstants";

const BROWSE_LINKS = [
  { name: "Movies", path: ROUTES.MOVIES, icon: Film },
  { name: "TV Shows", path: ROUTES.TV_SHOWS, icon: Tv },
  { name: "Anime", path: ROUTES.ANIME, icon: Sparkles },
  { name: "Watchlist", path: ROUTES.WATCHLIST, icon: Bookmark },
];

const ACCOUNT_LINKS = [
  { name: "My Profile", path: ROUTES.PROFILE },
  { name: "Favorites", path: ROUTES.FAVORITES },
  { name: "My Reviews", path: ROUTES.REVIEWS },
  { name: "Subscription", path: ROUTES.SUBSCRIPTION },
  { name: "Notifications", path: ROUTES.NOTIFICATIONS },
];

const SUPPORT_LINKS = [
  { name: "AI Assistant", path: ROUTES.AI },
  { name: "Payments", path: ROUTES.PAYMENTS },
  { name: "Edit Profile", path: ROUTES.EDIT_PROFILE },
];

const SOCIALS = [
  { name: "Website", icon: Globe, href: "https://streamversex.com" },
  { name: "Contact us", icon: Mail, href: "mailto:support@streamversex.com" },
  { name: "Community", icon: MessageCircle, href: "https://streamversex.com/community" },
];

const columnMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

function FooterColumn({ title, links, delay = 0 }) {
  return (
    <motion.div {...columnMotion} transition={{ duration: 0.4, delay }}>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "grey.400",
        }}
      >
        {title}
      </Typography>

      <Box component="ul" className="mt-4 space-y-3 list-none p-0 m-0">
        {links.map(({ name, path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className="group flex items-center gap-2 text-sm text-gray-500 no-underline transition hover:text-white"
            >
              {Icon && (
                <Icon size={14} className="text-gray-600 transition group-hover:text-[#e50914]" />
              )}
              {name}
            </NavLink>
          </li>
        ))}
      </Box>
    </motion.div>
  );
}

function UserFooter() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", bgcolor: "#0b0b0f" }}>
      <Box className="mx-auto max-w-[1600px] px-6 py-14 md:px-8">
        <Box className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            {...columnMotion}
            transition={{ duration: 0.4 }}
            className="col-span-2 md:col-span-1"
          >
            <Typography
              component={NavLink}
              to={ROUTES.HOME}
              sx={{
                fontWeight: 900,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              StreamVerse<span style={{ color: "#fff" }}>X</span>
            </Typography>

            <Typography sx={{ mt: 1.5, maxWidth: 320, fontSize: "0.875rem", lineHeight: 1.6, color: "grey.500" }}>
              Movies, TV shows and anime in one place. Track what you love,
              build your watchlist, and never lose your spot.
            </Typography>

            <Box className="mt-5 flex items-center gap-2 text-xs" sx={{ color: "grey.600" }}>
              <Heart size={14} style={{ color: theme.palette.primary.main }} />
              <span>Crafted for people who binge responsibly.</span>
            </Box>

            <Box className="mt-5 flex items-center gap-1">
              {SOCIALS.map(({ name, icon: Icon, href }) => (
                <Tooltip key={name} title={name}>
                  <IconButton
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      color: "grey.500",
                      "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
                    }}
                  >
                    <Icon size={16} />
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </motion.div>

          <FooterColumn title="Browse" links={BROWSE_LINKS} delay={0.05} />
          <FooterColumn title="Account" links={ACCOUNT_LINKS} delay={0.1} />
          <FooterColumn title="More" links={SUPPORT_LINKS} delay={0.15} />
        </Box>

        <Divider sx={{ mt: 6, mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom bar */}
        <Box className="flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center" sx={{ color: "grey.600" }}>
          <Typography sx={{ fontSize: "0.75rem", color: "grey.600" }}>
            &copy; {new Date().getFullYear()} StreamVerseX. All rights reserved.
          </Typography>

          <Box className="flex items-center gap-1.5" sx={{ color: "grey.600" }}>
            <Star size={12} style={{ color: theme.palette.primary.main }} />
            <Typography sx={{ fontSize: "0.75rem", color: "grey.600" }}>
              Rated and reviewed by our community.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserFooter;