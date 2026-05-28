import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("forwards the type prop", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });

  it("accepts typed input", async () => {
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText("Name");
    await userEvent.type(input, "Mattias");
    expect(input).toHaveValue("Mattias");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("sets aria-invalid when error is true", () => {
    render(<Input error placeholder="Error input" />);
    expect(screen.getByPlaceholderText("Error input")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid by default", () => {
    render(<Input placeholder="Normal" />);
    expect(screen.getByPlaceholderText("Normal")).not.toHaveAttribute("aria-invalid");
  });

  it("applies size prop classes", () => {
    const { rerender } = render(<Input placeholder="sized" size="xs" />);
    expect(screen.getByPlaceholderText("sized")).toHaveClass("h-7");
    rerender(<Input placeholder="sized" size="lg" />);
    expect(screen.getByPlaceholderText("sized")).toHaveClass("h-12");
  });

  it("defaults to md size", () => {
    render(<Input placeholder="default" />);
    expect(screen.getByPlaceholderText("default")).toHaveClass("h-10");
  });
});
