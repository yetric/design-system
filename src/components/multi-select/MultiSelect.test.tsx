import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

describe("MultiSelect", () => {
  it("renders placeholder when no value selected", () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} />);
    expect(screen.getByText("Select…")).toBeInTheDocument();
  });

  it("shows selected tags", () => {
    render(<MultiSelect options={options} value={["react"]} onChange={() => {}} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects an option from dropdown", async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: /React/ }));
    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("deselects an option from dropdown", async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={["react"]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: /React/ }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("renders error message", () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
