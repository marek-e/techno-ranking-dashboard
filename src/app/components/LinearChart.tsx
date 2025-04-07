"use client";

import { LineChart, CartesianGrid, XAxis, Line, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Trend } from "../page";
import { useState } from "react";
export function LinearChart({ trends }: { trends: Trend[] }) {
  const ticks = ["2024-09-07", "2024-11-07", "2025-02-06", "2025-04-03"];
  const data = [];
  for (const tick of ticks) {
    const tickData = {
      date: tick,
    } as Record<string, number | string>;
    for (const trend of trends) {
      const trendValue = trend[tick as keyof Trend] as number;
      if (trendValue) {
        tickData[trend.name] = trendValue;
      }
    }
    data.push(tickData);
  }

  const chartConfig = {} as Record<string, { label: string; color: string }>;
  trends.forEach((trend) => {
    chartConfig[trend.name] = {
      label: trend.name,
      color: trend.color,
    };
  });

  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] h-[700px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis reversed />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent activeItem={activeItem} />}
        />
        {trends.map((trend) => (
          <Line
            key={trend.name}
            dataKey={trend.name}
            type="linear"
            stroke={trend.color}
            strokeWidth={trends.length > 10 ? 2 : 4}
            dot
            onMouseEnter={() => setActiveItem(trend.name)}
            onMouseLeave={() => setActiveItem(null)}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

export default LinearChart;
