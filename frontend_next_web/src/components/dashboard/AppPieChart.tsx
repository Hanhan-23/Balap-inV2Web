"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

// const chartData = [
//   { browser: "JLT", visitors: 20, fill: "var(--color-JLT)" },
//   { browser: "RK", visitors: 89, fill: "var(--color-RK)" },
//   { browser: "RT", visitors: 18, fill: "var(--color-RT)" },
//   { browser: "RBV", visitors: 73, fill: "var(--color-RBV)" },
// ]

const chartConfig = {
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
} satisfies ChartConfig

export function AppPieChart({ data }) {
  return (
    <Card className="flex flex-col">
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
      </CardContent>
    </Card>
  )
}