"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  [key: string]: string | number;
}

export interface BaseChartProps {
  data: ChartData[];
  dataKey: string;
  xKey?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string;
}

export interface PieChartProps {
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string;
}

const defaultChartColors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
] as const;
const axisColor = "hsl(var(--muted-foreground))";
const gridColor = "hsl(var(--border))";
const tooltipStyle = {
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius)",
  backgroundColor: "hsl(var(--popover))",
  color: "hsl(var(--popover-foreground))",
};

function ChartContainer({
  children,
  className,
  height,
  testId,
}: {
  children: ReactNode;
  className?: string;
  height: number;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "w-full rounded-lg border border-border bg-card p-4 text-card-foreground",
        className
      )}
      style={{ height }}
    >
      {children}
    </div>
  );
}

export function LineChart({
  data,
  dataKey,
  xKey = "name",
  height = 300,
  color = defaultChartColors[0],
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: BaseChartProps) {
  return (
    <ChartContainer className={className} height={height} testId="line-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: axisColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
          {showLegend && <Legend />}
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BarChart({
  data,
  dataKey,
  xKey = "name",
  height = 300,
  color = defaultChartColors[0],
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: BaseChartProps) {
  return (
    <ChartContainer className={className} height={height} testId="bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: axisColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function AreaChart({
  data,
  dataKey,
  xKey = "name",
  height = 300,
  color = defaultChartColors[0],
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: BaseChartProps) {
  return (
    <ChartContainer className={className} height={height} testId="area-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: axisColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
          {showLegend && <Legend />}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function PieChart({
  data,
  height = 300,
  colors = [...defaultChartColors],
  showTooltip = true,
  showLegend = false,
  className,
}: PieChartProps) {
  return (
    <ChartContainer className={className} height={height} testId="pie-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%">
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
