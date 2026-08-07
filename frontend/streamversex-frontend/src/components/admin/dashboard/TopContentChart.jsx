// src/components/admin/dashboard/TopContentChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import ChartCard from "../common/ChartCard";

/**
 * Tabbed horizontal bar chart for "Top Watchlisted / Top Reviewed / Top
 * Favorites" — feeds straight off your analytics endpoints.
 *
 * Props:
 *  - datasets: { watchlist: [{name, value}], reviewed: [...], favorites: [...] }
 *  - loading: bool
 *  - onTabChange: fn(tabKey) — optional, lets the page lazily fetch per tab
 */
const TABS = [
  { key: "watchlist", label: "Top Watchlisted" },
  { key: "reviewed", label: "Top Reviewed" },
  { key: "favorites", label: "Top Favorites" },
];

export default function TopContentChart({ datasets = {}, loading, onTabChange }) {
  const [tab, setTab] = useState(0);
  const activeKey = TABS[tab].key;
  const data = datasets[activeKey] ?? [];

  const handleChange = (_, val) => {
    setTab(val);
    onTabChange?.(TABS[val].key);
  };

  return (
    <ChartCard
      title="Top Content"
      subtitle="Most engaged titles"
      loading={loading}
      height={340}
      actions={
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            minHeight: 0,
            "& .MuiTab-root": {
              minHeight: 0,
              py: 0.5,
              fontSize: 12,
              textTransform: "none",
              color: "#94A3B8",
            },
            "& .Mui-selected": { color: "#60A5FA !important" },
            "& .MuiTabs-indicator": { bgcolor: "#3B82F6" },
          }}
        >
          {TABS.map((t) => (
            <Tab key={t.key} label={t.label} />
          ))}
        </Tabs>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              background: "#0B1120",
              border: "1px solid #334155",
              borderRadius: 10,
            }}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Bar dataKey="value" fill="#8B5CF6" radius={[0, 6, 6, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}