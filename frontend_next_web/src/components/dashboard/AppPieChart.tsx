"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Tambahkan kembali type PieDataItem
export interface PieDataItem {
  browser: "JLT" | "RK" | "RT" | "RBV";
  visitors: number;
  fill?: string;
}

// Optional: bisa dipakai untuk chartConfig typing
type BrowserKey = "JLT" | "RK" | "RT" | "RBV";

const chartConfig: ChartConfig & Record<BrowserKey, { label: string; color: string }> = {
  visitors: {
    label: "Visitors",
  },
  JLT: {
    label: "Jumlah Laporan Terkini",
    color: "var(--chart-1)",
  },
  RK: {
    label: "Rekomendasi Terkini",
    color: "var(--chart-2)",
  },
  RT: {
    label: "Rekomendasi Tervalidasi",
    color: "var(--chart-3)",
  },
  RBV: {
    label: "Rekomendasi Butuh Validasi",
    color: "var(--chart-4)",
  },
};

export function AppPieChart({ data }: { data: PieDataItem[] }) {
  return (
    <Card className="flex flex-col shadow-xl dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)]">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <h1 className="text-md font-medium mb-0 flex items-center gap-1 dark:text-white">
            Ringkasan terkini data laporan masyarakat
            <TrendingUp className="h-6 w-6 text-green-500" />
          </h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[200px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>

        <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-4 justify-center">
          {data.map((item) => {
            const config = chartConfig[item.browser];
            return (
              <div key={item.browser} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
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
