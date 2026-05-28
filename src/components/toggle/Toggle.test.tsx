import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./Toggle";
import { Bold } from "lucide-react";

describe("Toggle", () => {
  it("renders", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("is off by default", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "off");
  });

  it("toggles to on when clicked", async () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
  });

  it("calls onPressedChange on click", async () => {
    const handler = vi.fn();
    render(<Toggle aria-label="Bold" onPressedChange={handler}>B</Toggle>);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledWith(true);
  });
});

describe("ToggleGroup", () => {
  it("renders all items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
        <ToggleGroupItem value="i" aria-label="Italic">I</ToggleGroupItem>
      </ToggleGroup>
    );
    // type="single" renders items as role="radio"
    expect(screen.getByRole("radio", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Italic" })).toBeInTheDocument();
  });

  it("selects an item on click", async () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="b" aria-label="Bold">B</ToggleGroupItem>
        <ToggleGroupItem value="i" aria-label="Italic">I</ToggleGroupItem>
      </ToggleGroup>
    );
    await userEvent.click(screen.getByRole("radio", { name: "Bold" }));
    expect(screen.getByRole("radio", { name: "Bold" })).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("radio", { name: "Italic" })).toHaveAttribute("data-state", "off");
  });
});
