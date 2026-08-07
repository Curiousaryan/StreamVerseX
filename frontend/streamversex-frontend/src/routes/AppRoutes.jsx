// src/routes/AppRoutes.jsx
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
import VerifyEmail from "../pages/public/VerifyEmail";

import Dashboard from "../pages/user/Dashboard";
import Home from "../pages/user/Home";
import Movies from "../pages/user/Movies";
import TVShows from "../pages/user/TVShows";
import Watchlist from "../pages/user/Watchlist";

// --- Admin pages (previously referenced in JSX below but never imported —
// this was the build-breaking bug) ---
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Reviews from "../pages/admin/Reviews";
import Payments from "../pages/admin/Payments";
import PremiumUsers from "../pages/admin/PremiumUsers";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

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
          <Route
            path={ROUTES.VERIFY_EMAIL}
            element={<VerifyEmail />}
          />
        </Route>
      </Route>

      {/* Authenticated user pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MOVIES} element={<Movies />} />
          <Route path={ROUTES.TV_SHOWS} element={<TVShows />} />
          <Route path={ROUTES.WATCHLIST} element={<Watchlist />} />
        </Route>
      </Route>

      {/* =========================
              Admin
      ========================= */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_USERS} element={<Users />} />
          <Route path={ROUTES.ADMIN_REVIEWS} element={<Reviews />} />
          <Route path={ROUTES.ADMIN_PAYMENTS} element={<Payments />} />
          <Route path={ROUTES.ADMIN_PREMIUM} element={<PremiumUsers />} />
          <Route path={ROUTES.ADMIN_ANALYTICS} element={<Analytics />} />
          <Route path={ROUTES.ADMIN_SETTINGS} element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;