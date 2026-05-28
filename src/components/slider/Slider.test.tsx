import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a slider", () => {
    render(<Slider defaultValue={[50]} max={100} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("shows correct aria-valuenow", () => {
    render(<Slider defaultValue={[30]} max={100} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30");
  });

  it("renders two thumbs for range slider", () => {
    render(<Slider defaultValue={[20, 80]} max={100} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("calls onValueChange when value changes", async () => {
    const handler = vi.fn();
    render(<Slider defaultValue={[50]} max={100} onValueChange={handler} />);
    const slider = screen.getByRole("slider");
    // Move right with arrow key
    await userEvent.click(slider);
    await userEvent.keyboard("{ArrowRight}");
    expect(handler).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Slider defaultValue={[50]} disabled />);
    // Radix Slider uses data-disabled on the thumb element
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });
});
