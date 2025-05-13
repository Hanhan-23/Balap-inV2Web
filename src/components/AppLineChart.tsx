"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const chartData = [
  { month: "Jan", reports: 45 },
  { month: "Feb", reports: 68 },
  { month: "Mar", reports: 52 },
  { month: "Apr", reports: 79 },
  { month: "May", reports: 63 },
  { month: "Jun", reports: 91 },
];

const chartConfig = {
  reports: {
    label: "Jumlah Laporan",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppLineChart = () => {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
        height={300}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis 
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip 
          cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
          content={<ChartTooltipContent />}
        />
        <Line
          dataKey="reports"
          type="monotone"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default AppLineChart;