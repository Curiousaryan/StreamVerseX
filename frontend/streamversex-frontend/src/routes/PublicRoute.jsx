import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routeConstants";

function PublicRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;