import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TagsInput } from "./TagsInput";

describe("TagsInput", () => {
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
});
