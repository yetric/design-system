import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";

// ─── Children mode ───────────────────────────────────────────────────────────

describe("Table — children mode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it("applies density classes in children mode", () => {
    render(
      <Table density="comfortable">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mattias</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Name").closest("th")).toHaveClass("h-14", "px-4");
    expect(screen.getByText("Mattias").closest("td")).toHaveClass("px-4", "py-5");
  });
});

// ─── Data-driven mode ────────────────────────────────────────────────────────

type Row = {
  id: string;
  name: string;
  age: number;
  role: "Admin" | "Editor" | "Viewer";
  status: "active" | "inactive";
  joined: string;
};

const data: Row[] = [
  { id: "1", name: "Bob", age: 28, role: "Viewer", status: "inactive", joined: "2024-03-10" },
  { id: "2", name: "Carol", age: 35, role: "Editor", status: "active", joined: "2024-01-05" },
  { id: "3", name: "Alice", age: 42, role: "Admin", status: "active", joined: "2024-02-12" },
  { id: "4", name: "Dave", age: 24, role: "Viewer", status: "active", joined: "2024-04-18" },
];

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { filterType: "text" },
  },
  {
    accessorKey: "age",
    header: "Age",
    meta: { filterType: "number" },
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: { filterType: "select", filterOptions: ["Admin", "Editor", "Viewer"] },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "joined",
    header: "Joined",
    meta: { filterType: "date" },
  },
];

function getBodyRows() {
  return Array.from(document.querySelectorAll("tbody tr"));
}

function getFirstCellValues() {
  return getBodyRows().map((row) => row.querySelector("td")?.textContent ?? "");
}

describe("Table — data-driven mode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all rows", () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });

  it("shows empty state when data is empty", () => {
    render(<Table data={[]} columns={columns} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders a search input when searchable", () => {
    render(<Table data={data} columns={columns} searchable />);
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("filters rows when using global search", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} searchable />);

    await user.type(screen.getByPlaceholderText("Search…"), "Admin");

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
      expect(screen.queryByText("Carol")).not.toBeInTheDocument();
    });
  });

  it("sorts rows when a sortable header is clicked", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: "Name" }));
    await waitFor(() => expect(getFirstCellValues()).toEqual(["Alice", "Bob", "Carol", "Dave"]));

    await user.click(screen.getByRole("button", { name: "Name" }));
    await waitFor(() => expect(getFirstCellValues()).toEqual(["Dave", "Carol", "Bob", "Alice"]));
  });

  it("renders select-all checkbox when selectable", () => {
    render(<Table data={data} columns={columns} selectable />);
    expect(screen.getByRole("checkbox", { name: "Select all" })).toBeInTheDocument();
  });

  it("selects rows and updates the selected count", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} selectable pageSize={2} />);

    await user.click(screen.getAllByRole("checkbox", { name: "Select row" })[0]);
    expect(screen.getByText("1 selected")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "Select all" }));
    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });

  it("shows Columns button", () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByRole("button", { name: /columns/i })).toBeInTheDocument();
  });

  it("toggles column visibility from the columns menu", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /columns/i }));
    await user.click(screen.getByText("role"));

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Role" })).not.toBeInTheDocument();
    });
  });

  it("closes the columns menu when clicking outside", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /columns/i }));
    expect(screen.getByText("joined")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText("joined")).not.toBeInTheDocument();
    });
  });

  it("shows and clears a text column filter", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /filters/i }));
    await user.type(screen.getByPlaceholderText("Filter…"), "Ali");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /filters \(1\)/i })).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /clear/i }));

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Carol")).toBeInTheDocument();
    });
  });

  it("filters rows with a number column filter", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /filters/i }));
    await user.type(screen.getByPlaceholderText("Min"), "30");
    await user.type(screen.getByPlaceholderText("Max"), "40");

    await waitFor(() => {
      expect(screen.getByText("Carol")).toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
      expect(screen.queryByText("Dave")).not.toBeInTheDocument();
    });
  });

  it("filters rows with a select column filter", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /filters/i }));
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Admin" }));

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
      expect(screen.queryByText("Carol")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "All" }));

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Carol")).toBeInTheDocument();
    });
  });

  it("filters rows with a date range filter", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} />);

    await user.click(screen.getByRole("button", { name: /filters/i }));
    const dateInputs = Array.from(
      document.querySelectorAll('input[type="date"]')
    ) as HTMLInputElement[];

    await user.type(dateInputs[0], "2024-02-01");
    await user.type(dateInputs[1], "2024-03-31");

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.queryByText("Carol")).not.toBeInTheDocument();
      expect(screen.queryByText("Dave")).not.toBeInTheDocument();
    });
  });

  it("renders skeleton rows while loading", () => {
    const { container } = render(<Table data={data} columns={columns} isLoading loadingRows={2} />);

    expect(container.querySelectorAll("tbody tr")).toHaveLength(2);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(columns.length * 2);
  });

  it("omits the filters button when no columns are filterable", () => {
    const plainColumns: ColumnDef<Row>[] = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status" },
    ];

    render(<Table data={data} columns={plainColumns} />);

    expect(screen.queryByRole("button", { name: /filters/i })).not.toBeInTheDocument();
  });

  it("shows pagination controls when pageSize is set", () => {
    render(<Table data={data} columns={columns} pageSize={2} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("paginates rows correctly", async () => {
    const user = userEvent.setup();
    render(<Table data={data} columns={columns} pageSize={2} />);

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));
    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    await waitFor(() => expect(screen.getByText("Bob")).toBeInTheDocument());
  });

  it("applies compact density styles in data mode", () => {
    render(<Table data={data} columns={columns} density="compact" />);

    expect(screen.getByRole("button", { name: "Name" }).closest("th")).toHaveClass("h-9", "px-3");
    expect(screen.getByText("Bob").closest("td")).toHaveClass("px-3", "py-1.5");
  });
});
