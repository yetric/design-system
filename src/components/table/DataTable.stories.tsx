import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../badge/Badge";
import { Table } from "./Table";

const meta = {
  title: "Components/Table/Data-driven",
  component: Table,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "active" | "inactive";
  joined: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Mattias Hising",
    email: "mattias@yetric.com",
    role: "Admin",
    status: "active",
    joined: "2024-01-15",
  },
  {
    id: "2",
    name: "Anna Lindqvist",
    email: "anna@example.com",
    role: "Editor",
    status: "active",
    joined: "2024-03-22",
  },
  {
    id: "3",
    name: "Erik Johansson",
    email: "erik@example.com",
    role: "Viewer",
    status: "inactive",
    joined: "2024-05-08",
  },
  {
    id: "4",
    name: "Sara Bergström",
    email: "sara@example.com",
    role: "Editor",
    status: "active",
    joined: "2024-06-30",
  },
  {
    id: "5",
    name: "Lars Eriksson",
    email: "lars@example.com",
    role: "Viewer",
    status: "active",
    joined: "2024-08-14",
  },
  {
    id: "6",
    name: "Maria Karlsson",
    email: "maria@example.com",
    role: "Admin",
    status: "active",
    joined: "2024-09-02",
  },
  {
    id: "7",
    name: "Johan Nilsson",
    email: "johan@example.com",
    role: "Viewer",
    status: "inactive",
    joined: "2024-10-19",
  },
  {
    id: "8",
    name: "Emma Persson",
    email: "emma@example.com",
    role: "Editor",
    status: "active",
    joined: "2024-11-25",
  },
  {
    id: "9",
    name: "Olof Svensson",
    email: "olof@example.com",
    role: "Viewer",
    status: "active",
    joined: "2025-01-07",
  },
  {
    id: "10",
    name: "Karin Gustafsson",
    email: "karin@example.com",
    role: "Editor",
    status: "inactive",
    joined: "2025-02-14",
  },
  {
    id: "11",
    name: "Anders Magnusson",
    email: "anders@example.com",
    role: "Viewer",
    status: "active",
    joined: "2025-03-01",
  },
  {
    id: "12",
    name: "Lena Olsson",
    email: "lena@example.com",
    role: "Editor",
    status: "active",
    joined: "2025-04-11",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { filterType: "text" },
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { filterType: "text" },
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: { filterType: "select", filterOptions: ["Admin", "Editor", "Viewer"] },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { filterType: "select", filterOptions: ["active", "inactive"] },
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <Badge variant={status === "active" ? "success" : "secondary"} size="sm">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    meta: { filterType: "date" },
    cell: ({ row }) => new Date(row.getValue<string>("joined")).toLocaleDateString("en-SE"),
  },
];

export const Default: Story = {
  render: () => <Table data={users} columns={columns} />,
};

export const Searchable: Story = {
  render: () => <Table data={users} columns={columns} searchable />,
};

export const WithColumnFilters: Story = {
  render: () => <Table data={users} columns={columns} searchable />,
};

export const WithRowSelection: Story = {
  render: () => <Table data={users} columns={columns} searchable selectable />,
};

export const WithPagination: Story = {
  render: () => <Table data={users} columns={columns} searchable selectable pageSize={5} />,
};

export const Striped: Story = {
  render: () => <Table data={users} columns={columns} striped />,
};

export const CompactDensity: Story = {
  render: () => <Table data={users} columns={columns} density="compact" striped />,
};

export const GridBorders: Story = {
  render: () => <Table data={users} columns={columns} borders="grid" />,
};

export const EmptyState: Story = {
  render: () => <Table data={[]} columns={columns} searchable />,
};
