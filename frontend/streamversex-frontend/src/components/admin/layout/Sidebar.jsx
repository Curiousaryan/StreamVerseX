// src/components/admin/layout/Sidebar.jsx
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, LogOut, Film } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ADMIN_NAVIGATION } from "../../../utils/admin/navigation";
import { useAuth } from "../../../context/AuthContext";

const EXPANDED = 264;
const COLLAPSED = 84;

/**
 * Props:
 *  - collapsed: bool
 *  - onToggle: fn()
 */
export default function Sidebar({ collapsed, onToggle }) {
  const { logout } = useAuth();

  return (
    <Box
      component="aside"
      sx={{
        width: collapsed ? COLLAPSED : EXPANDED,
        transition: "width 0.25s ease",
        bgcolor: "#111827",
        borderRight: "1px solid #1E293B",
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        zIndex: 30,
      }}
    >
      {/* Brand */}
      <Box
        className="flex items-center justify-between"
        sx={{ px: collapsed ? 0 : 2.5, py: 2.5, justifyContent: collapsed ? "center" : "space-between" }}
      >
        <Box className="flex items-center gap-2" sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Film size={20} color="#fff" />
          </Box>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
              >
                <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>
                  StreamVerseX
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: 11 }}>Admin Console</Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Nav */}
      <Box component="nav" sx={{ flex: 1, px: collapsed ? 1 : 1.5, py: 1, overflowY: "auto" }}>
        {ADMIN_NAVIGATION.map((item) => (
          <Tooltip
            key={item.path}
            title={collapsed ? item.title : ""}
            placement="right"
          >
            <NavLink
              to={item.path}
              className="block"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Box
                  className="flex items-center gap-3"
                  sx={{
                    px: collapsed ? 0 : 1.75,
                    py: 1.25,
                    mb: 0.5,
                    borderRadius: "10px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    bgcolor: isActive ? "rgba(59,130,246,0.14)" : "transparent",
                    borderLeft: isActive ? "3px solid #3B82F6" : "3px solid transparent",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(59,130,246,0.14)" : "#1E293B",
                    },
                    transition: "background 0.15s ease",
                  }}
                >
                  <item.icon
                    size={19}
                    color={isActive ? "#60A5FA" : "#94A3B8"}
                    style={{ flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#F8FAFC" : "#94A3B8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>
                  )}
                </Box>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </Box>

      {/* Footer: collapse toggle + logout */}
      <Box sx={{ px: collapsed ? 1 : 1.5, py: 1.5, borderTop: "1px solid #1E293B" }}>
        <Box
          onClick={logout}
          className="flex items-center gap-3"
          sx={{
            px: collapsed ? 0 : 1.75,
            py: 1.1,
            mb: 0.5,
            borderRadius: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            "&:hover": { bgcolor: "#1E293B" },
          }}
        >
          <LogOut size={18} color="#F87171" />
          {!collapsed && (
            <Typography sx={{ fontSize: 14, color: "#F87171", fontWeight: 500 }}>
              Logout
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={onToggle}
          size="small"
          sx={{
            width: "100%",
            borderRadius: "10px",
            color: "#94A3B8",
            "&:hover": { bgcolor: "#1E293B" },
          }}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </IconButton>
      </Box>
    </Box>
  );
}

export { EXPANDED as SIDEBAR_EXPANDED_WIDTH, COLLAPSED as SIDEBAR_COLLAPSED_WIDTH };