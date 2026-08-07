// src/components/admin/common/ChartCard.jsx
import { Box, Paper, Typography, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import { MoreVertical, Download } from "lucide-react";
import { useState } from "react";

/**
 * Wraps any chart (Recharts component) in a consistent premium card
 * with title, subtitle, optional menu (export/refresh), and loading state.
 *
 * Props:
 *  - title, subtitle: string
 *  - children: chart content (ResponsiveContainer etc.)
 *  - loading: bool
 *  - height: number (px) — default 320
 *  - onExport: fn — optional, shows "Export" menu item
 *  - actions: ReactNode — optional custom node instead of the menu
 */
export default function ChartCard({
  title,
  subtitle,
  children,
  loading = false,
  height = 320,
  onExport,
  actions,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#1E293B",
        border: "1px solid #334155",
        height: "100%",
      }}
    >
      <Box className="flex items-start justify-between mb-3">
        <Box>
          <Typography sx={{ color: "#F8FAFC", fontWeight: 600, fontSize: 16 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions ??
          (onExport && (
            <>
              <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: "#94A3B8" }}
              >
                <MoreVertical size={18} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: "#1E293B",
                      border: "1px solid #334155",
                      color: "#F8FAFC",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    onExport();
                  }}
                  sx={{ gap: 1, fontSize: 14 }}
                >
                  <Download size={16} /> Export data
                </MenuItem>
              </Menu>
            </>
          ))}
      </Box>

      {loading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={height}
          sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
        />
      ) : (
        <Box sx={{ width: "100%", height }}>{children}</Box>
      )}
    </Paper>
  );
}