// src/components/admin/dashboard/DashboardStats.jsx
import { Grid } from "@mui/material";
import { Users, UserCheck, Ban, Gem, CreditCard, Star, Heart, Bookmark } from "lucide-react";
import StatCard from "../common/StatCard";

/**
 * Props:
 *  - data: exact response of GET /api/admin/dashboard:
 *    {
 *      totalUsers, activeUsers, blockedUsers, premiumUsers,
 *      totalPayments, successfulPayments, failedPayments,
 *      totalRevenue, monthlyRevenue,
 *      totalReviews, totalFavorites, totalWatchlistItems
 *    }
 *  - loading: bool
 */
export default function DashboardStats({ data, loading }) {
  const d = data ?? {};

  const stats = [
    { title: "Total Users", value: d.totalUsers ?? 0, icon: Users, color: "primary" },
    { title: "Active Users", value: d.activeUsers ?? 0, icon: UserCheck, color: "success" },
    { title: "Blocked Users", value: d.blockedUsers ?? 0, icon: Ban, color: "danger" },
    { title: "Premium Users", value: d.premiumUsers ?? 0, icon: Gem, color: "info" },
    { title: "Total Revenue", value: d.totalRevenue ?? 0, icon: CreditCard, color: "success", prefix: "₹" },
    { title: "Monthly Revenue", value: d.monthlyRevenue ?? 0, icon: CreditCard, color: "primary", prefix: "₹" },
    { title: "Successful Payments", value: d.successfulPayments ?? 0, icon: CreditCard, color: "success" },
    { title: "Failed Payments", value: d.failedPayments ?? 0, icon: CreditCard, color: "danger" },
    { title: "Total Payments", value: d.totalPayments ?? 0, icon: CreditCard, color: "info" },
    { title: "Total Reviews", value: d.totalReviews ?? 0, icon: Star, color: "warning" },
    { title: "Total Favorites", value: d.totalFavorites ?? 0, icon: Heart, color: "danger" },
    { title: "Watchlist Items", value: d.totalWatchlistItems ?? 0, icon: Bookmark, color: "info" },
  ];

  return (
    <Grid container spacing={2.5}>
      {stats.map((s) => (
        <Grid key={s.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={s.title}
            value={s.value}
            prefix={s.prefix}
            icon={s.icon}
            color={s.color}
            loading={loading}
          />
        </Grid>
      ))}
    </Grid>
  );
}