import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { day: "1k", value: 20 },
  { day: "10k", value: 45 },
  { day: "15k", value: 30 },
  { day: "20k", value: 90 },
  { day: "25k", value: 40 },
  { day: "30k", value: 70 },
  { day: "35k", value: 45 },
  { day: "40k", value: 60 },
  { day: "45k", value: 30 },
  { day: "50k", value: 65 },
  { day: "55k", value: 50 },
  { day: "60k", value: 70 },
];

export default function RevenueChart() {
  return (
    <div className="w-full h-[400px] bg-[#0f172a] p-6 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-4">
        Chi tiết doanh số
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={revenueData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: "#1d4ed8" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
