"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  visitors: {
    label: "Jumlah Laporan Terkini",
    color: "#60a5fa",
  },
  chrome: {
    label: "Rekomendasi Terkini",
    color: "#c4b5fd",
  },
  safari: {
    label: "Rekomendasi Tervalidasi",
    color: "#86efac",
  },
  firefox: {
    label: "Rekomendasi Butuh Validasi",
    color: "#fde68a",
  },
} satisfies ChartConfig;

const chartData = [
  { browser: "Jumlah Laporan Terkini", visitors: 30, fill: "#60a5fa" },
  { browser: "Rekomendasi Terkini", visitors: 4, fill: "#c4b5fd" },
  { browser: "Rekomendasi Tervalidasi", visitors: 9, fill: "#86efac" },
  { browser: "Rekomendasi Butuh Validasi", visitors: 12, fill: "#fde68a" },
];

const AppPieChart = () => {
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  
  return (
    <div className="">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="dark:[&>tspan]:fill-white"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground dark:fill-black"
                      >
                        Ringkasan
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default AppPieChart;