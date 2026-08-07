// src/components/admin/dashboard/RecentActivity.jsx
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { UserPlus, Star, CreditCard, Gem, Ban } from "lucide-react";
import EmptyState from "../common/EmptyState";

const TYPE_META = {
  NEW_USER: { icon: UserPlus, color: "#60A5FA", label: "signed up" },
  REVIEW: { icon: Star, color: "#FBBF24", label: "posted a review" },
  PAYMENT: { icon: CreditCard, color: "#34D399", label: "made a payment" },
  PREMIUM: { icon: Gem, color: "#B794F6", label: "upgraded to premium" },
  BLOCKED: { icon: Ban, color: "#F87171", label: "was blocked" },
};

/**
 * Props:
 *  - items: [{ id, type, actorName, meta, timestamp }]
 *  - loading: bool
 */
export default function RecentActivity({ items = [], loading }) {
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
      <Typography sx={{ color: "#F8FAFC", fontWeight: 600, fontSize: 16, mb: 2 }}>
        Recent Activity
      </Typography>

      {!loading && items.length === 0 && <EmptyState message="No recent activity" />}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 340, overflowY: "auto" }}>
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} className="flex items-center gap-3">
              <Box sx={{ width: 34, height: 34, borderRadius: "50%", bgcolor: "#263244" }} />
              <Box sx={{ flex: 1, height: 14, borderRadius: 1, bgcolor: "#263244" }} />
            </Box>
          ))}

        {!loading &&
          items.map((item) => {
            const meta = TYPE_META[item.type] ?? TYPE_META.NEW_USER;
            const Icon = meta.icon;
            return (
              <Box key={item.id} className="flex items-start gap-3">
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: `${meta.color}22`,
                    color: meta.color,
                  }}
                >
                  <Icon size={16} />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: "#F8FAFC", fontSize: 13.5 }}>
                    <b>{item.actorName}</b> {meta.label}
                    {item.detail ? ` — ${item.detail}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#64748B", fontSize: 12 }}>
                    {item.timestamp}
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Paper>
  );
}