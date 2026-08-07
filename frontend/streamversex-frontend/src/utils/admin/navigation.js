import {
  LayoutDashboard,
  Users,
  Star,
  CreditCard,
  Gem,
  BarChart3,
  Settings,
} from "lucide-react";

import { ROUTES } from "../../routes/routeConstants";

export const ADMIN_NAVIGATION = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.ADMIN_DASHBOARD,
  },
  {
    title: "Users",
    icon: Users,
    path: ROUTES.ADMIN_USERS,
  },
  {
    title: "Reviews",
    icon: Star,
    path: ROUTES.ADMIN_REVIEWS,
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: ROUTES.ADMIN_PAYMENTS,
  },
  {
    title: "Premium",
    icon: Gem,
    path: ROUTES.ADMIN_PREMIUM,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: ROUTES.ADMIN_ANALYTICS,
  },
  {
    title: "Settings",
    icon: Settings,
    path: ROUTES.ADMIN_SETTINGS,
  },
];