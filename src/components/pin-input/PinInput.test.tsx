import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PinInput } from "./PinInput";

describe("PinInput", () => {
  it("renders correct number of inputs", () => {
    render(<PinInput length={4} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("renders custom length", () => {
    render(<PinInput length={6} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("calls onChange when digit entered", () => {
    const onChange = vi.fn();
    render(<PinInput length={4} value="" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("applies error class when error=true", () => {
    render(<PinInput length={4} error />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toHaveClass("border-destructive"));
  });

  it("disables all inputs when disabled", () => {
    render(<PinInput length={4} disabled />);
    screen.getAllByRole("textbox").forEach((input) => expect(input).toBeDisabled());
  });

  it("uses password type when mask=true", () => {
    render(<PinInput length={4} mask />);
    screen.getAllByDisplayValue("").forEach((input) => {
      expect(input).toHaveAttribute("type", "password");
    });
  });
});
