import type { Meta, StoryObj } from "@storybook/react-vite";
import { AreaChart, BarChart, LineChart, PieChart } from "./Charts";

const monthlyData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 320 },
  { name: "Mar", value: 510 },
  { name: "Apr", value: 470 },
  { name: "May", value: 620 },
  { name: "Jun", value: 580 },
];

const pieData = [
  { name: "Product", value: 48 },
  { name: "Services", value: 32 },
  { name: "Support", value: 20 },
];

const meta: Meta<typeof LineChart> = {
  title: "Components/Charts",
  component: LineChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const LineChartStory: Story = {
  render: () => <LineChart data={monthlyData} dataKey="value" className="mx-auto max-w-3xl" />,
};

export const BarChartStory: Story = {
  render: () => <BarChart data={monthlyData} dataKey="value" className="mx-auto max-w-3xl" />,
};

export const AreaChartStory: Story = {
  render: () => <AreaChart data={monthlyData} dataKey="value" className="mx-auto max-w-3xl" />,
};

export const PieChartStory: Story = {
  render: () => <PieChart data={pieData} className="mx-auto max-w-3xl" showLegend />,
};

export const WithLegend: Story = {
  render: () => (
    <LineChart data={monthlyData} dataKey="value" showLegend className="mx-auto max-w-3xl" />
  ),
};

export const WithoutGrid: Story = {
  render: () => (
    <BarChart data={monthlyData} dataKey="value" showGrid={false} className="mx-auto max-w-3xl" />
  ),
};
