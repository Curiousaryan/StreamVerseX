// src/components/admin/layout/Topbar.jsx
import { Box, Avatar, IconButton, Badge, Menu, MenuItem, Typography, Divider } from "@mui/material";
import { Bell, Menu as MenuIcon, Search, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ROUTES } from "../../../routes/routeConstants";

/**
 * Props:
 *  - onMenuClick: fn() — toggles sidebar on mobile
 *  - notificationCount: number
 */
export default function Topbar({ onMenuClick, notificationCount = 0 }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: 68,
        px: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "rgba(11,17,32,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Box className="flex items-center gap-3">
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "#94A3B8" }}
        >
          <MenuIcon size={20} />
        </IconButton>

        <Box
          className="hidden md:flex items-center gap-2"
          sx={{
            bgcolor: "#1E293B",
            borderRadius: "10px",
            px: 1.5,
            py: 0.9,
            minWidth: 260,
          }}
        >
          <Search size={16} color="#64748B" />
          <Typography sx={{ color: "#64748B", fontSize: 13 }}>
            Quick search... (⌘K)
          </Typography>
        </Box>
      </Box>

      <Box className="flex items-center gap-2">
        <IconButton sx={{ color: "#94A3B8" }}>
          <Badge badgeContent={notificationCount} color="error">
            <Bell size={19} />
          </Badge>
        </IconButton>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#334155", mx: 0.5, my: 1.5 }}
        />

        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="flex items-center gap-2"
          sx={{ cursor: "pointer", pl: 0.5 }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#3B82F6",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {(user?.name || "A").charAt(0).toUpperCase()}
          </Avatar>
          <Box className="hidden sm:block">
            <Typography sx={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>
              {user?.name || "Admin"}
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: 11 }}>
              Administrator
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                bgcolor: "#1E293B",
                border: "1px solid #334155",
                color: "#F8FAFC",
                minWidth: 200,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate(ROUTES.ADMIN_SETTINGS);
            }}
            sx={{ gap: 1.5, fontSize: 14 }}
          >
            <Settings size={16} /> Settings
          </MenuItem>
          <Divider sx={{ borderColor: "#334155" }} />
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              logout();
              navigate(ROUTES.LOGIN);
            }}
            sx={{ gap: 1.5, fontSize: 14, color: "#F87171" }}
          >
            <LogOut size={16} /> Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}