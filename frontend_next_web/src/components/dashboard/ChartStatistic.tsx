"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartLineIcon } from "@phosphor-icons/react";

interface StatistikItem {
  date: string;
  desktop: number;
  mobile: number;
  device: number;
}

export const description = "An interactive area chart";
const chartConfig = {
  desktop: {
    label: "Jalan Rusak",
    color: "#5EEAD4", // teal-300
  },
  mobile: {
    label: "Lampu Rusak",
    color: "#D8B4FE", // purple-300
  },
  device: {
    label: "Jembatan Rusak",
    color: "#93C5FD", // blue-300
  },
};

const CustomChartLegendContent = ({
  colorMap,
}: {
  colorMap: Record<string, string>;
}) => (
  <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm font-medium">
    {Object.entries(colorMap).map(([key, color]) => (
      <div key={key} className="flex items-center gap-2 min-w-[140px]">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="whitespace-nowrap">
          {chartConfig[key as keyof typeof chartConfig]?.label}
        </span>
      </div>
    ))}
  </div>
);

interface ChartAreaInteractiveProps {
  itemStatistik: StatistikItem[];
  title: string;
  titleSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl";
  showDescription?: boolean;
}

export function ChartAreaInteractive({
  itemStatistik,
  title,
  titleSize = "text-3xl",
  showDescription = true,
}: ChartAreaInteractiveProps) {
  const mappedData = itemStatistik.map((item) => ({
    date: item.date,
    desktop: item.desktop,
    mobile: item.mobile,
    device: item.device,
  }));

  const [timeRange, setTimeRange] = React.useState("7d");

  // Urutkan data berdasarkan tanggal untuk memastikan data terbaru ada di akhir
  const sortedData = [...mappedData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Ambil tanggal terbaru dari data
  const latestDate = sortedData.length > 0 
    ? new Date(sortedData[sortedData.length - 1].date) 
    : new Date();

  const filteredData = sortedData.filter((item) => {
    const date = new Date(item.date);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0 rounded-xl">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 max-w-sm">
          <CardTitle className="flex items-center gap-2 mb-2">
            <span className={`${titleSize} p-1 bg-blue-100 border-blue-300 border rounded-md dark:bg-blue-900 dark:border-blue-700`}>
              <ChartLineIcon
                weight="bold"
                className="size-4 text-blue-600 dark:text-blue-300"
              />
            </span>
            <h1 className="text-base sm:text-lg font-semibold flex items-center dark:text-white">
              {title}
            </h1>
          </CardTitle>

          {showDescription && (
            <CardDescription className="text-black text-[10px] md:text-xs lg:text-sm">
              Memberikan gambaran komprehensif terkait intensitas dan persebaran
              laporan kerusakan jalan dari masyarakat.
            </CardDescription>
          )}
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
          style={
            {
              "--color-desktop": chartConfig.desktop.color,
              "--color-mobile": chartConfig.mobile.color,
              "--color-device": chartConfig.device.color,
            } as React.CSSProperties
          }
        >
          <AreaChart data={filteredData} stackOffset="expand">
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDevice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-device)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-device)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
            />
            <Area
              dataKey="device"
              type="natural"
              fill="url(#fillDevice)"
              stroke="var(--color-device)"
            />
            <ChartLegend
              content={
                <CustomChartLegendContent
                  colorMap={{
                    desktop: chartConfig.desktop.color,
                    mobile: chartConfig.mobile.color,
                    device: chartConfig.device.color,
                  }}
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
