import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routeConstants";

function AdminRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

export default AdminRoute;