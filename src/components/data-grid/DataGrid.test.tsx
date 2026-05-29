import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataGrid, type DataGridColumn } from "./DataGrid";

type User = {
  id: string;
  name: string;
  role: string;
  age: number;
};

const data: User[] = [
  { id: "1", name: "Carol", role: "Editor", age: 31 },
  { id: "2", name: "Alice", role: "Admin", age: 42 },
  { id: "3", name: "Bob", role: "Viewer", age: 27 },
];

const columns: DataGridColumn<User>[] = [
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "role", header: "Role", accessorKey: "role" },
  { id: "age", header: "Age", accessorKey: "age" },
];

function getBodyNames() {
  const [headerRow, ...bodyRows] = within(screen.getByRole("table")).getAllByRole("row");
  void headerRow;
  return bodyRows.map((row) => within(row).getAllByRole("cell")[0]?.textContent ?? "");
}

describe("DataGrid", () => {
  it("renders rows and columns", () => {
    render(<DataGrid data={data} columns={columns} height={240} />);

    expect(screen.getByRole("button", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  it("sorts rows when a sortable header is clicked", async () => {
    const user = userEvent.setup();
    render(<DataGrid data={data} columns={columns} height={240} />);

    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(getBodyNames()).toEqual(["Alice", "Bob", "Carol"]);

    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(getBodyNames()).toEqual(["Carol", "Bob", "Alice"]);
  });

  it("renders a loading state", () => {
    render(<DataGrid data={data} columns={columns} loading height={240} />);

    expect(screen.getAllByTestId("data-grid-skeleton-row")).not.toHaveLength(0);
  });

  it("renders an empty state", () => {
    render(<DataGrid data={[]} columns={columns} emptyMessage="Nothing here yet." />);

    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  });

  it("calls onRowClick with the clicked row", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();

    render(<DataGrid data={data} columns={columns} onRowClick={onRowClick} height={240} />);

    await user.click(screen.getByText("Alice"));

    expect(onRowClick).toHaveBeenCalledWith(data[1]);
  });
});
