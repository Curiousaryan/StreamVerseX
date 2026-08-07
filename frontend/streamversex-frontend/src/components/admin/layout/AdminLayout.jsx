// src/layouts/AdminLayout.jsx
//
// Replaces the previous empty stub. Renders the collapsible Sidebar +
// Topbar shell around every /admin/* route via <Outlet />.

import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/layout/Sidebar";
import Topbar from "../components/admin/layout/Topbar";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#0B1120",
      }}
    >
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar onMenuClick={() => setCollapsed((c) => !c)} />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3.5 },
            maxWidth: "1600px",
            width: "100%",
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;