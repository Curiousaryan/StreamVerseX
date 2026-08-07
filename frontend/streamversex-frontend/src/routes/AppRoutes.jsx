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
import Anime from "../pages/user/Anime";
import MovieDetails from "../pages/user/MovieDetails";
import TVDetails from "../pages/user/TVDetails";
import AnimeDetails from "../pages/user/AnimeDetails";
import Search from "../pages/user/Search";
import Favorites from "../pages/user/Favorites";

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
        <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetails />} />
        <Route path={ROUTES.TV_SHOWS} element={<TVShows />}/>
        <Route path={ROUTES.TV_DETAILS} element={<TVDetails />} />
        <Route path={ROUTES.ANIME} element={<Anime />}/>
        <Route path={ROUTES.ANIME_DETAILS} element={<AnimeDetails />} />
        <Route path={ROUTES.SEARCH} element={<Search />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />

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