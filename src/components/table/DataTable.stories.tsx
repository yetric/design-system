import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../badge/Badge";
import { DataTable } from "./DataTable";

const meta = {
  title: "Components/DataTable",
  component: DataTable
} satisfies Meta<typeof DataTable>;

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
  { id: "1", name: "Mattias Hising",   email: "mattias@yetric.com",  role: "Admin",  status: "active",   joined: "2024-01-15" },
  { id: "2", name: "Anna Lindqvist",   email: "anna@example.com",    role: "Editor", status: "active",   joined: "2024-03-22" },
  { id: "3", name: "Erik Johansson",   email: "erik@example.com",    role: "Viewer", status: "inactive", joined: "2024-05-08" },
  { id: "4", name: "Sara Bergström",   email: "sara@example.com",    role: "Editor", status: "active",   joined: "2024-06-30" },
  { id: "5", name: "Lars Eriksson",    email: "lars@example.com",    role: "Viewer", status: "active",   joined: "2024-08-14" },
  { id: "6", name: "Maria Karlsson",   email: "maria@example.com",   role: "Admin",  status: "active",   joined: "2024-09-02" },
  { id: "7", name: "Johan Nilsson",    email: "johan@example.com",   role: "Viewer", status: "inactive", joined: "2024-10-19" },
  { id: "8", name: "Emma Persson",     email: "emma@example.com",    role: "Editor", status: "active",   joined: "2024-11-25" },
  { id: "9", name: "Olof Svensson",    email: "olof@example.com",    role: "Viewer", status: "active",   joined: "2025-01-07" },
  { id: "10", name: "Karin Gustafsson", email: "karin@example.com",  role: "Editor", status: "inactive", joined: "2025-02-14" },
  { id: "11", name: "Anders Magnusson", email: "anders@example.com", role: "Viewer", status: "active",   joined: "2025-03-01" },
  { id: "12", name: "Lena Olsson",     email: "lena@example.com",    role: "Editor", status: "active",   joined: "2025-04-11" }
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    )
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <Badge variant={status === "active" ? "success" : "secondary"} size="sm">
          {status}
        </Badge>
      );
    }
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) =>
      new Date(row.getValue<string>("joined")).toLocaleDateString("en-SE")
  }
];

export const Default: Story = {
  render: () => <DataTable data={users} columns={columns} />
};

export const Searchable: Story = {
  render: () => <DataTable data={users} columns={columns} searchable />
};

export const WithRowSelection: Story = {
  render: () => <DataTable data={users} columns={columns} searchable selectable />
};

export const WithPagination: Story = {
  render: () => (
    <DataTable data={users} columns={columns} searchable selectable pageSize={5} />
  )
};

export const EmptyState: Story = {
  render: () => <DataTable data={[]} columns={columns} searchable />
};
