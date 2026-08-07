// src/components/admin/dashboard/PaymentChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartCard from "../common/ChartCard";

const STATUS_COLOR = {
  Paid: "#34D399",
  Completed: "#34D399",
  Pending: "#FBBF24",
  Failed: "#F87171",
  Refunded: "#22D3EE",
};

/**
 * Props:
 *  - data: [{ status: string, count: number }]
 *  - loading: bool
 */
export default function PaymentChart({ data = [], loading }) {
  return (
    <ChartCard title="Payments by Status" subtitle="Current period" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis
            dataKey="status"
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              background: "#0B1120",
              border: "1px solid #334155",
              borderRadius: 10,
            }}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLOR[entry.status] ?? "#3B82F6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}