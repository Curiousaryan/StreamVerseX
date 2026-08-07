// src/components/admin/common/StatCard.jsx
import { Box, Paper, Typography, Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "motion/react";

/**
 * Premium KPI stat card.
 *
 * Props:
 *  - title: string
 *  - value: number (raw numeric value, will animate with CountUp)
 *  - prefix / suffix: string (e.g. "₹", "%")
 *  - icon: lucide-react component
 *  - color: "primary" | "success" | "warning" | "danger" | "info"
 *  - trend: number (e.g. 12.4 => +12.4%) — optional
 *  - loading: bool
 */
const COLOR_MAP = {
  primary: { bg: "rgba(59,130,246,0.12)", fg: "#60A5FA" },
  success: { bg: "rgba(16,185,129,0.12)", fg: "#34D399" },
  warning: { bg: "rgba(245,158,11,0.12)", fg: "#FBBF24" },
  danger: { bg: "rgba(239,68,68,0.12)", fg: "#F87171" },
  info: { bg: "rgba(6,182,212,0.12)", fg: "#22D3EE" },
};

export default function StatCard({
  title,
  value = 0,
  prefix = "",
  suffix = "",
  icon: Icon,
  color = "primary",
  trend,
  loading = false,
}) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.primary;
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      elevation={0}
      className="relative overflow-hidden"
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#1E293B",
        border: "1px solid #334155",
      }}
    >
      <Box className="flex items-start justify-between">
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#94A3B8", fontWeight: 500, mb: 0.5 }}
          >
            {title}
          </Typography>

          {loading ? (
            <Skeleton
              variant="text"
              width={100}
              height={40}
              sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
            />
          ) : (
            <Typography
              variant="h4"
              sx={{ color: "#F8FAFC", fontWeight: 700, lineHeight: 1.2 }}
            >
              {prefix}
              <CountUp end={value} duration={1.2} separator="," />
              {suffix}
            </Typography>
          )}

          {trend !== undefined && !loading && (
            <Box className="flex items-center gap-1 mt-1.5">
              {isPositive ? (
                <TrendingUp size={14} color="#34D399" />
              ) : (
                <TrendingDown size={14} color="#F87171" />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: isPositive ? "#34D399" : "#F87171",
                  fontWeight: 600,
                }}
              >
                {isPositive ? "+" : ""}
                {trend}%
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B" }}>
                vs last period
              </Typography>
            </Box>
          )}
        </Box>

        {Icon && (
          <Box
            sx={{
              bgcolor: c.bg,
              color: c.fg,
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={22} />
          </Box>
        )}
      </Box>

      {/* subtle glow accent */}
      <Box
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: c.fg,
          opacity: 0.06,
          filter: "blur(10px)",
        }}
      />
    </Paper>
  );
}