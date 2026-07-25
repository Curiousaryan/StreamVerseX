import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./routeConstants";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Splash from "../pages/public/Splash";
import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";

import Dashboard from "../pages/user/Dashboard";
import Home from "../pages/user/Home";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Full-screen application entry */}
      <Route path={ROUTES.SPLASH} element={<Splash />} />

      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />

        {/* Guest-only pages */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={ROUTES.RESET_PASSWORD}
            element={<ResetPassword />}
          />
        </Route>
      </Route>

      {/* Authenticated user pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
      </Route>

      {/* Admin pages */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={<AdminDashboard />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;