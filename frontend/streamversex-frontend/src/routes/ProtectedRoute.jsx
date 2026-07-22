import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routeConstants";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;