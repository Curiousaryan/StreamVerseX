import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      {/* Topbar */}

      {/* Sidebar */}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;