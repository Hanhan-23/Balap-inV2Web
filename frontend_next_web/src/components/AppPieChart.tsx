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
    color: "#bfdbfe",
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

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

type AppPieChartProps = {
  data: PieChartData[];
};

const AppPieChart: React.FC<AppPieChartProps> = ({ data }) => {
  // Transform the incoming data to match the expected format
  const chartData = data.map(item => ({
    browser: item.name,
    visitors: item.value,
    fill: item.color
  }));
  
  const totalVisitors = data.reduce((acc, curr) => acc + curr.value, 0);
  
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