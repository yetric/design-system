import { useState, type ComponentProps } from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TagsInput } from "./TagsInput";

function StatefulTagsInput({
  initialValue = [],
  onChange = vi.fn(),
  ...props
}: Partial<ComponentProps<typeof TagsInput>> & {
  initialValue?: string[];
  onChange?: (value: string[]) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <TagsInput
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
      {...props}
    />
  );
}

describe("TagsInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders placeholder when no tags", () => {
    render(<TagsInput placeholder="Add tag" />);
    expect(screen.getByPlaceholderText("Add tag")).toBeInTheDocument();
  });

  it("renders existing tags", () => {
    render(<TagsInput value={["react", "typescript"]} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("calls onChange when Enter adds a tag", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} />);
    const input = document.querySelector("input")!;
    fireEvent.change(input, { target: { value: "newtag" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(["newtag"]);
  });

  it("adds a tag with the Enter key in a controlled wrapper", async () => {
    const user = userEvent.setup();
    render(<StatefulTagsInput placeholder="Add tag" />);

    const input = screen.getByPlaceholderText("Add tag");
    await user.type(input, "react{enter}");

    await waitFor(() => {
      expect(screen.getByText("react")).toBeInTheDocument();
    });
  });

  it("adds a tag with a comma delimiter", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} />);
    const input = document.querySelector("input")!;

    fireEvent.change(input, { target: { value: "typescript" } });
    fireEvent.keyDown(input, { key: "," });

    expect(onChange).toHaveBeenCalledWith(["typescript"]);
  });

  it("removes the last tag with Backspace when the input is empty", () => {
    const onChange = vi.fn();
    render(<TagsInput value={["react", "vue"]} onChange={onChange} />);
    const input = document.querySelector("input")!;

    fireEvent.keyDown(input, { key: "Backspace" });

    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("calls onChange when remove button clicked", () => {
    const onChange = vi.fn();
    render(<TagsInput value={["react"]} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove react" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("respects max prop", () => {
    const onChange = vi.fn();
    render(<TagsInput value={["a", "b"]} onChange={onChange} max={2} />);
    const input = document.querySelector("input")!;
    fireEvent.change(input, { target: { value: "c" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("forwards tag updates through onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StatefulTagsInput onChange={onChange} placeholder="Add tag" />);

    await user.type(screen.getByPlaceholderText("Add tag"), "design{enter}");

    expect(onChange).toHaveBeenCalledWith(["design"]);
  });
});
