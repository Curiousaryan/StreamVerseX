import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Landing from "../pages/public/Landing";
import Splash from "../pages/public/Splash";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";
import Dashboard from "../pages/user/Dashboard";
import Home from "../pages/user/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes(){
    return(<>
    <Routes>

            {/*Public Routes*/}
            <Route element={<PublicLayout/>}>
                    <Route path="/" element={<Splash />} />
                    <Route path="/welcome" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Route>

       {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

    </Routes>
    </>);
}

export default AppRoutes;