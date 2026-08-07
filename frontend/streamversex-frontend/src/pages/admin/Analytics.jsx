// src/pages/admin/Analytics.jsx
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import UserGrowthChart from "../../components/admin/dashboard/UserGrowthChart";
import ContentChart from "../../components/admin/dashboard/ContentChart";
import PaymentChart from "../../components/admin/dashboard/PaymentChart";
import TopContentChart from "../../components/admin/dashboard/TopContentChart";

import {
  getUserAnalytics,
  getRevenueAnalytics,
  getPaymentAnalytics,
  getContentAnalytics,
  getTopWatchlisted,
  getTopReviewed,
  getTopFavorites,
} from "../../services/adminService";

/**
 * Deep analytics page — one dedicated chart per /api/admin/analytics/*
 * endpoint, plus the tabbed "Top Content" breakdown.
 *
 * Same disclaimer as AdminDashboard.jsx: exact response shapes for these
 * 7 endpoints weren't in your screenshots, so each map* function below
 * guesses common key names with fallbacks. Send me one real response per
 * endpoint (like you did for /api/admin/dashboard) and I'll tighten these
 * in under a minute each — nothing else in the page needs to change.
 */
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

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [charts, setCharts] = useState({});

  const [topLoading, setTopLoading] = useState(true);
  const [topData, setTopData] = useState({});

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
        setLoading(false);
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
        title="Analytics"
        subtitle="Deep dive into revenue, users, payments and content performance"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Analytics" }]}
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart data={charts.revenueTrend ?? []} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ContentChart data={charts.contentDistribution ?? []} loading={loading} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <UserGrowthChart data={charts.userGrowth ?? []} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PaymentChart data={charts.paymentsByStatus ?? []} loading={loading} />
        </Grid>

        <Grid size={12}>
          <TopContentChart datasets={topData} loading={topLoading} />
        </Grid>
      </Grid>
    </>
  );
}