// src/components/admin/dashboard/RevenueChart.jsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../common/ChartCard";
import { formatCurrency } from "../../../utils/admin/formatCurrency";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0B1120",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: "8px 12px",
      }}
    >
      <p style={{ color: "#94A3B8", fontSize: 12, margin: 0 }}>{label}</p>
      <p style={{ color: "#60A5FA", fontWeight: 700, margin: 0 }}>
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

/**
 * Props:
 *  - data: [{ label: string, revenue: number }]
 *  - loading: bool
 */
export default function RevenueChart({ data = [], loading }) {
  return (
    <ChartCard title="Revenue Trend" subtitle="Last 12 periods" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}k` : v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}