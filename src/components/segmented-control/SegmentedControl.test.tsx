import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
  { value: "table", label: "Table" },
];

describe("SegmentedControl", () => {
  it("renders all options", () => {
    render(<SegmentedControl options={options} value="list" />);
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Grid")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
  });

  it("marks active option with aria-checked=true", () => {
    render(<SegmentedControl options={options} value="grid" />);
    const grid = screen.getByRole("radio", { name: "Grid" });
    expect(grid).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange when option clicked", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="list" onChange={onChange} />);
    await userEvent.click(screen.getByText("Grid"));
    expect(onChange).toHaveBeenCalledWith("grid");
  });

  it("does not call onChange for disabled option", async () => {
    const onChange = vi.fn();
    const opts = [
      { value: "a", label: "A" },
      { value: "b", label: "B", disabled: true },
    ];
    render(<SegmentedControl options={opts} value="a" onChange={onChange} />);
    await userEvent.click(screen.getByText("B"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
