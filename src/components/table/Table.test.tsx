import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./Table";
import { DataTable } from "./DataTable";

describe("Table primitives", () => {
  it("renders a basic table with rows and cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mattias</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Mattias")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});

type Row = { id: string; name: string; role: string };

const data: Row[] = [
  { id: "1", name: "Alice", role: "Admin" },
  { id: "2", name: "Bob",   role: "Viewer" },
  { id: "3", name: "Carol", role: "Editor" }
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" }
];

describe("DataTable", () => {
  it("renders all rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });

  it("shows empty state when data is empty", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders a search input when searchable", () => {
    render(<DataTable data={data} columns={columns} searchable />);
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("filters rows when searching", async () => {
    render(<DataTable data={data} columns={columns} searchable />);
    await userEvent.type(screen.getByPlaceholderText("Search…"), "Alice");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("renders select-all checkbox when selectable", () => {
    render(<DataTable data={data} columns={columns} selectable />);
    expect(screen.getByRole("checkbox", { name: "Select all" })).toBeInTheDocument();
  });

  it("shows Columns button", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByRole("button", { name: /columns/i })).toBeInTheDocument();
  });

  it("shows pagination controls when pageSize is set", () => {
    render(<DataTable data={data} columns={columns} pageSize={2} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("paginates rows correctly", async () => {
    render(<DataTable data={data} columns={columns} pageSize={2} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText("Carol")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });
});
