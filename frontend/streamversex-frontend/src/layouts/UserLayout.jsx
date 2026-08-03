import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import UserNavbar from "../components/user/navigation/UserNavbar";
import UserFooter from "../components/user/UserFooter";

function UserLayout() {
  return (
    <Box
      className="flex min-h-screen flex-col"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <UserNavbar />

      <Box component="main" className="flex-1">
        <Outlet />
      </Box>

      <UserFooter />
    </Box>
  );
}

export default UserLayout;