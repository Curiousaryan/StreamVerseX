// src/components/admin/common/EmptyState.jsx
import { Box, Typography } from "@mui/material";
import { Inbox } from "lucide-react";

/**
 * Shown when a table/list has zero rows.
 *
 * Props:
 *  - message: string
 *  - icon: lucide-react component (default Inbox)
 */
export default function EmptyState({ message = "Nothing here yet", icon: Icon = Inbox }) {
  return (
    <Box
      className="flex flex-col items-center justify-center"
      sx={{ py: 6, color: "#64748B" }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
        }}
      >
        <Icon size={26} color="#475569" />
      </Box>
      <Typography sx={{ color: "#94A3B8", fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
}