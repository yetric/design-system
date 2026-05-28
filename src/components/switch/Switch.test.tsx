import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders without crashing", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders a label when label prop is provided", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("label htmlFor points to switch id", () => {
    render(<Switch label="Dark mode" id="dark-mode" />);
    const label = screen.getByText("Dark mode");
    expect(label).toHaveAttribute("for", "dark-mode");
  });

  it("auto-generates id when none provided (label still wired)", () => {
    render(<Switch label="Auto ID" />);
    const switchEl = screen.getByRole("switch");
    const label = screen.getByText("Auto ID");
    expect(switchEl.id).not.toBe("");
    expect(label).toHaveAttribute("for", switchEl.id);
  });

  it("calls onCheckedChange when toggled", async () => {
    const handler = vi.fn();
    render(<Switch onCheckedChange={handler} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders checked by default when defaultChecked is true", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });
});
