import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataGrid, type DataGridColumn, type DataGridProps } from "./DataGrid";

type Customer = {
  id: string;
  name: string;
  plan: string;
  users: number;
  revenue: string;
};

const data: Customer[] = [
  { id: "c-1", name: "Acme Inc.", plan: "Enterprise", users: 48, revenue: "$12,400" },
  { id: "c-2", name: "Globex", plan: "Growth", users: 16, revenue: "$4,200" },
  { id: "c-3", name: "Initech", plan: "Starter", users: 5, revenue: "$820" },
  { id: "c-4", name: "Umbrella", plan: "Growth", users: 21, revenue: "$5,600" },
  { id: "c-5", name: "Wayne Enterprises", plan: "Enterprise", users: 62, revenue: "$18,900" },
  { id: "c-6", name: "Stark Industries", plan: "Enterprise", users: 84, revenue: "$24,100" },
];

const columns: DataGridColumn<Customer>[] = [
  { id: "name", header: "Customer", accessorKey: "name", width: 220 },
  { id: "plan", header: "Plan", accessorKey: "plan" },
  { id: "users", header: "Users", accessorKey: "users", width: 120 },
  { id: "revenue", header: "Revenue", accessorKey: "revenue", width: 140 },
];

function DataGridStory(props: Partial<DataGridProps<Customer>>) {
  return <DataGrid<Customer> data={data} columns={columns} height={320} {...props} />;
}

const meta = {
  title: "Components/DataGrid",
  component: DataGridStory,
  tags: ["autodocs"],
} satisfies Meta<typeof DataGridStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  render: () => <DataGridStory loading />,
};

export const Empty: Story = {
  render: () => <DataGridStory data={[]} emptyMessage="No customers found." />,
};
