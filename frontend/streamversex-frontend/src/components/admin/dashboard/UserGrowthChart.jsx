// src/components/admin/dashboard/UserGrowthChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../common/ChartCard";

const tooltipStyle = {
  background: "#0B1120",
  border: "1px solid #334155",
  borderRadius: 10,
};

/**
 * Props:
 *  - data: [{ label: string, newUsers: number, premiumUsers: number }]
 *  - loading: bool
 */
export default function UserGrowthChart({ data = [], loading }) {
  return (
    <ChartCard title="User Growth" subtitle="New vs Premium signups" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#94A3B8" }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#94A3B8" }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            name="New Users"
            stroke="#60A5FA"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="premiumUsers"
            name="Premium Users"
            stroke="#B794F6"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}