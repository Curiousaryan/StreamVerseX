// src/pages/admin/AdminDashboard.jsx
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/admin/layout/PageHeader";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import UserGrowthChart from "../../components/admin/dashboard/UserGrowthChart";
import ContentChart from "../../components/admin/dashboard/ContentChart";
import PaymentChart from "../../components/admin/dashboard/PaymentChart";
import TopContentChart from "../../components/admin/dashboard/TopContentChart";
import RecentActivity from "../../components/admin/dashboard/RecentActivity";
import {
  getAdminDashboard,
  getUserAnalytics,
  getRevenueAnalytics,
  getPaymentAnalytics,
  getContentAnalytics,
  getTopWatchlisted,
  getTopReviewed,
  getTopFavorites,
} from "../../services/adminService";

/**
 * GET /api/admin/dashboard only returns flat totals (confirmed shape):
 *   { totalUsers, activeUsers, blockedUsers, premiumUsers, totalPayments,
 *     successfulPayments, failedPayments, totalRevenue, monthlyRevenue,
 *     totalReviews, totalFavorites, totalWatchlistItems }
 *
 * There's no time-series data in it, so the trend charts (revenue over
 * time, user growth, content split, payment status split) are fed by the
 * dedicated /api/admin/analytics/* endpoints instead — that's what they're
 * for. Each chart component still defends against `undefined`/empty
 * arrays, so nothing breaks if a given analytics endpoint returns a shape
 * you haven't told me about yet — just swap the `mapX` functions below
 * once you confirm those response shapes too.
 */

// Best-effort mappers — adjust once you confirm each analytics endpoint's
// exact response shape. They accept common alternate key names so a lot of
// real backends will "just work" without edits.
const mapRevenueTrend = (res) =>
  (res?.trend ?? res?.data ?? res ?? []).map((r) => ({
    label: r.label ?? r.month ?? r.period ?? r.date,
    revenue: r.revenue ?? r.amount ?? r.value ?? 0,
  }));

const mapUserGrowth = (res) =>
  (res?.trend ?? res?.data ?? res ?? []).map((r) => ({
    label: r.label ?? r.month ?? r.period ?? r.date,
    newUsers: r.newUsers ?? r.users ?? r.count ?? 0,
    premiumUsers: r.premiumUsers ?? r.premium ?? 0,
  }));

const mapContentSplit = (res) =>
  (res?.breakdown ?? res?.data ?? res ?? []).map((r) => ({
    name: r.name ?? r.type ?? r.category,
    value: r.value ?? r.count ?? 0,
  }));

const mapPaymentSplit = (res) =>
  (res?.breakdown ?? res?.data ?? res ?? []).map((r) => ({
    status: r.status ?? r.label,
    count: r.count ?? r.value ?? 0,
  }));

const mapTopList = (res) =>
  (res?.items ?? res?.data ?? res ?? []).map((r) => ({
    name: r.title ?? r.name,
    value: r.count ?? r.value ?? 0,
  }));

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [charts, setCharts] = useState({});
  const [chartsLoading, setChartsLoading] = useState(true);

  const [topData, setTopData] = useState({});
  const [topLoading, setTopLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setStats(await getAdminDashboard());
      } catch (err) {
        toast.error(err.friendlyMessage ?? "Failed to load dashboard stats");
      } finally {
        setStatsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [users, revenue, payments, content] = await Promise.all([
          getUserAnalytics(),
          getRevenueAnalytics(),
          getPaymentAnalytics(),
          getContentAnalytics(),
        ]);
        setCharts({
          userGrowth: mapUserGrowth(users),
          revenueTrend: mapRevenueTrend(revenue),
          paymentsByStatus: mapPaymentSplit(payments),
          contentDistribution: mapContentSplit(content),
        });
      } catch (err) {
        toast.error(err.friendlyMessage ?? "Failed to load analytics");
      } finally {
        setChartsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [watchlist, reviewed, favorites] = await Promise.all([
          getTopWatchlisted(),
          getTopReviewed(),
          getTopFavorites(),
        ]);
        setTopData({
          watchlist: mapTopList(watchlist),
          reviewed: mapTopList(reviewed),
          favorites: mapTopList(favorites),
        });
      } catch (err) {
        toast.error(err.friendlyMessage ?? "Failed to load top content");
      } finally {
        setTopLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Platform overview and key metrics"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Dashboard" }]}
      />

      <Grid container spacing={2.5}>
        <Grid size={12}>
          <DashboardStats data={stats} loading={statsLoading} />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart data={charts.revenueTrend ?? []} loading={chartsLoading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ContentChart data={charts.contentDistribution ?? []} loading={chartsLoading} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <UserGrowthChart data={charts.userGrowth ?? []} loading={chartsLoading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PaymentChart data={charts.paymentsByStatus ?? []} loading={chartsLoading} />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <TopContentChart datasets={topData} loading={topLoading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <RecentActivity items={[]} loading={false} />
        </Grid>
      </Grid>
    </>
  );
}