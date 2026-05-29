import { useState, type ComponentProps } from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

function StatefulMultiSelect({
  initialValue = [],
  onChange = vi.fn(),
  ...props
}: Partial<ComponentProps<typeof MultiSelect>> & {
  initialValue?: string[];
  onChange?: (value: string[]) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
      {...props}
    />
  );
}

describe("MultiSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders placeholder when no value selected", () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} />);
    expect(screen.getByText("Select…")).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    render(
      <MultiSelect options={options} value={[]} onChange={() => {}} placeholder="Pick frameworks" />
    );
    expect(screen.getByText("Pick frameworks")).toBeInTheDocument();
  });

  it("shows selected tags", () => {
    render(<MultiSelect options={options} value={["react"]} onChange={() => {}} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={[]} onChange={() => {}} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects an option from dropdown", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /React/ }));
    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("deselects an option from dropdown", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={["react"]} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /React/ }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("filters options when searchable", async () => {
    const user = userEvent.setup();
    render(<StatefulMultiSelect searchable />);

    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search…"), "sv");

    expect(screen.getByRole("option", { name: "Svelte" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "React" })).not.toBeInTheDocument();
  });

  it("shows an empty state when search has no matches", async () => {
    const user = userEvent.setup();
    render(<StatefulMultiSelect searchable />);

    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search…"), "ember");

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("respects the maxValues selection limit", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect options={options} value={["react", "vue"]} onChange={onChange} maxValues={2} />
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Angular/ }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports keyboard open and close interactions", async () => {
    render(<StatefulMultiSelect searchable />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("removes a selected tag with its remove button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StatefulMultiSelect initialValue={["react", "vue"]} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Remove React" }));

    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={[]} onChange={() => {}} disabled />);

    expect(screen.getByRole("combobox")).toHaveAttribute("tabIndex", "-1");
    expect(screen.getByRole("combobox")).toHaveClass("cursor-not-allowed", "opacity-50");

    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
