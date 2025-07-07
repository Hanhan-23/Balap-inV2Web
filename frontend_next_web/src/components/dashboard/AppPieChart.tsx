"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendUpIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

// Type
export interface PieDataItem {
  browser: "JLT" | "RK" | "RT" | "RBV";
  visitors: number;
}
type BrowserKey = "JLT" | "RK" | "RT" | "RBV";

// **Perbaiki deklarasi ini!**
const chartConfig: Record<
  BrowserKey,
  { label: string; color: string; colorDark?: string }
> & {
  visitors: { label: string };
} = {
  visitors: { label: "Visitors" },
  JLT: {
    label: "Jumlah Laporan Terkini",
    color: "#D8B4FE",
    colorDark: "#6B21A8",
  },
  RK: {
    label: "Rekomendasi Terkini",
    color: "#99F6E4",
    colorDark: "#115E59",
  },
  RT: {
    label: "Rekomendasi Tervalidasi",
    color: "#93C5FD",
    colorDark: "#1E40AF",
  },
  RBV: {
    label: "Rekomendasi Butuh Validasi",
    color: "#F0ABFC", 
    colorDark: "#86198F",
  },
};

export function AppPieChart({ data }: { data: PieDataItem[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Card className="flex flex-col shadow-xl dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)]">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 border-blue-300 border rounded-md dark:bg-blue-900 dark:border-blue-700">
              <TrendUpIcon weight="bold" className="size-4 text-blue-600 dark:text-blue-300" />
            </div>
            <h1 className="text-base sm:text-lg font-semibold flex items-center dark:text-white">
              Ringkasan terkini data laporan masyarakat
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square pb-0"
        >
          <PieChart width={200} height={200}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="visitors"
              label
              nameKey="browser"
              outerRadius={90}
              stroke="white"
              strokeWidth={2}
              cx="50%"
              cy="50%"
              isAnimationActive
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.browser}`}
                  fill={
                    isDark
                      ? chartConfig[entry.browser as BrowserKey].colorDark
                      : chartConfig[entry.browser as BrowserKey].color
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-4 justify-center">
          {data.map((item) => {
            const config = chartConfig[item.browser];
            return (
              <div key={item.browser} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: isDark ? config.colorDark : config.color,
                  }}
                ></span>
                <span className="text-xs text-muted-foreground">
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
