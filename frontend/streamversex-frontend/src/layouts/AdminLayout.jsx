import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      {/* Admin Topbar */}

      {/* Admin Sidebar */}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;