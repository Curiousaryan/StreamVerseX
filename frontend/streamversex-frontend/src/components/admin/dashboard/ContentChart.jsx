// src/components/admin/dashboard/ContentChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartCard from "../common/ChartCard";
import { CHART_COLORS } from "../../../utils/admin/chartColors";

/**
 * Props:
 *  - data: [{ name: string, value: number }]  e.g. Movies / TV / Anime split
 *  - loading: bool
 */
export default function ContentChart({ data = [], loading }) {
  return (
    <ChartCard title="Content Distribution" subtitle="By category" loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0B1120",
              border: "1px solid #334155",
              borderRadius: 10,
            }}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#94A3B8" }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}