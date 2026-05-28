import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders with a value", () => {
    render(<Progress value={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "40");
  });

  it("renders without a value (indeterminate)", () => {
    render(<Progress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("clamps display correctly at 0", () => {
    render(<Progress value={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps display correctly at 100", () => {
    render(<Progress value={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});
