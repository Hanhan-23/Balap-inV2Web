"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const chartConfig = {
  jalan: {
    label: "Jalan Rusak",
    color: "var(--chart-3)",
  },
  lampu: {
    label: "Lampu Penerangan Rusak",
    color: "var(--chart-2)",
  },
  jembatan: {
    label: "Jembatan Rusak",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Januari", jalan: 12, lampu: 2, jembatan: 1, },
  { month: "Februari", jalan: 18, lampu: 4, jembatan: 4, },
  { month: "Maret", jalan: 16, lampu: 8, jembatan: 1, },
  { month: "April", jalan: 9, lampu: 1, jembatan: 3, },
  { month: "Mei", jalan: 28, lampu: 9, jembatan: 2, },
  { month: "Juni", jalan: 3, lampu: 0, jembatan: 3, },
];

const AppAreaChart = () => {
  return (
    <div className="h-full">
      {/* untuk ubah ukuran tinggi chart */ }
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={12}
            />
            <YAxis 
              tickLine={false} 
              tickMargin={8} 
              axisLine={false}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id="fillJalan_Rusak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-jalan)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-jalan)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLampu_Penerangan_Rusak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lampu)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-lampu)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillJembatan_Rusak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-jembatan)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-jembatan)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="jalan"
              type="natural"
              fill="url(#fillJalan_Rusak)"
              fillOpacity={0.4}
              stroke="var(--color-jalan)"
              strokeWidth={2}
            />
            <Area
              dataKey="lampu"
              type="natural"
              fill="url(#fillLampu_Penerangan_Rusak)"
              fillOpacity={0.4}
              stroke="var(--color-lampu)"
              strokeWidth={2}
            />
            <Area
              dataKey="jembatan"
              type="natural"
              fill="url(#fillJembatan_Rusak)"
              fillOpacity={0.4}
              stroke="var(--color-jembatan)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;