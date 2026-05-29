import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("renders trigger button with current color value", () => {
    render(<ColorPicker value="#3b82f6" />);
    expect(screen.getByRole("button", { name: /color picker/i })).toBeInTheDocument();
    expect(screen.getByText("#3B82F6")).toBeInTheDocument();
  });

  it("opens popover when trigger clicked", () => {
    render(<ColorPicker value="#3b82f6" />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    expect(screen.getByLabelText(/hex color value/i)).toBeInTheDocument();
  });

  it("calls onChange when swatch is clicked", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#3b82f6" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    fireEvent.click(screen.getByRole("button", { name: /select color #ef4444/i }));
    expect(onChange).toHaveBeenCalledWith("#ef4444");
  });

  it("calls onChange when hex input changes to valid hex", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#3b82f6" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    const input = screen.getByLabelText(/hex color value/i);
    fireEvent.change(input, { target: { value: "#ff0000" } });
    expect(onChange).toHaveBeenCalledWith("#ff0000");
  });

  it("does not call onChange for invalid hex", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#3b82f6" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    const input = screen.getByLabelText(/hex color value/i);
    fireEvent.change(input, { target: { value: "#zzz" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<ColorPicker value="#3b82f6" disabled />);
    expect(screen.getByRole("button", { name: /color picker/i })).toBeDisabled();
  });

  it("renders with custom swatches", () => {
    render(<ColorPicker value="#6366f1" swatches={["#6366f1", "#8b5cf6"]} onChange={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    expect(screen.getByRole("button", { name: /select color #6366f1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /select color #8b5cf6/i })).toBeInTheDocument();
  });

  it("renders no swatches when swatches is empty", () => {
    render(<ColorPicker value="#3b82f6" swatches={[]} />);
    fireEvent.click(screen.getByRole("button", { name: /color picker/i }));
    expect(screen.queryByRole("button", { name: /select color/i })).not.toBeInTheDocument();
  });
});
