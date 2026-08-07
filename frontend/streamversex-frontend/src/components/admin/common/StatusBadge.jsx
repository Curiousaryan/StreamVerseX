// src/components/admin/common/StatusBadge.jsx
import { Chip } from "@mui/material";

/**
 * Color-coded status chip. Pass any status string — it's matched
 * case-insensitively against the map below, with a sane fallback.
 *
 * Usage: <StatusBadge status="ACTIVE" /> <StatusBadge status="blocked" />
 */
const STATUS_STYLES = {
  active: { bg: "rgba(16,185,129,0.14)", fg: "#34D399" },
  success: { bg: "rgba(16,185,129,0.14)", fg: "#34D399" },
  completed: { bg: "rgba(16,185,129,0.14)", fg: "#34D399" },
  paid: { bg: "rgba(16,185,129,0.14)", fg: "#34D399" },

  blocked: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },
  failed: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },
  cancelled: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },
  expired: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },

  pending: { bg: "rgba(245,158,11,0.14)", fg: "#FBBF24" },
  processing: { bg: "rgba(245,158,11,0.14)", fg: "#FBBF24" },

  premium: { bg: "rgba(124,77,255,0.16)", fg: "#B794F6" },
  refunded: { bg: "rgba(6,182,212,0.14)", fg: "#22D3EE" },
};

const DEFAULT_STYLE = { bg: "rgba(148,163,184,0.14)", fg: "#94A3B8" };

export default function StatusBadge({ status, size = "small" }) {
  const key = String(status ?? "").toLowerCase();
  const style = STATUS_STYLES[key] ?? DEFAULT_STYLE;

  return (
    <Chip
      label={status ?? "Unknown"}
      size={size}
      sx={{
        bgcolor: style.bg,
        color: style.fg,
        fontWeight: 600,
        fontSize: 12,
        textTransform: "capitalize",
        border: `1px solid ${style.fg}33`,
      }}
    />
  );
}