import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserNavbar from "../components/user/navigation/UserNavbar";
import UserMobileMenu from "../components/user/navigation/UserMobileMenu";
import UserFooter from "../components/user/UserFooter";

function UserLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">

      <UserNavbar
        onMenuClick={() => setMenuOpen(true)}
      />

      <UserMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <UserFooter />

    </div>
  );
}

export default UserLayout;