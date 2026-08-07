// src/components/admin/layout/Breadcrumb.jsx
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Props:
 *  - items: [{ label, path? }]  — last item is treated as current page (no link)
 *
 * Usage: <Breadcrumb items={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Users" }]} />
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <Box className="flex items-center flex-wrap" sx={{ gap: 0.5, mb: 0.5 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Box key={item.label} className="flex items-center" sx={{ gap: 0.5 }}>
            {item.path && !isLast ? (
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#64748B",
                    "&:hover": { color: "#94A3B8" },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ) : (
              <Typography
                sx={{
                  fontSize: 13,
                  color: isLast ? "#94A3B8" : "#64748B",
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {item.label}
              </Typography>
            )}
            {!isLast && <ChevronRight size={13} color="#475569" />}
          </Box>
        );
      })}
    </Box>
  );
}