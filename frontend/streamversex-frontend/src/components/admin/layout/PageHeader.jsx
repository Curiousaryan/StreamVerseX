// src/components/admin/layout/PageHeader.jsx
import { Box, Typography } from "@mui/material";
import Breadcrumb from "./Breadcrumb";

/**
 * Standard header used at the top of every admin page.
 *
 * Props:
 *  - title: string
 *  - subtitle: string
 *  - breadcrumbItems: [{ label, path? }]
 *  - actions: ReactNode — right-aligned buttons/filters
 */
export default function PageHeader({ title, subtitle, breadcrumbItems, actions }) {
  return (
    <Box
      className="flex flex-col md:flex-row md:items-center md:justify-between"
      sx={{ mb: 3, gap: 2 }}
    >
      <Box>
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: 24 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "#94A3B8", fontSize: 14, mt: 0.3 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {actions && (
        <Box className="flex items-center flex-wrap" sx={{ gap: 1.5 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
}