import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renders an input of type number", () => {
    render(<NumberInput value={0} onChange={() => {}} />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("renders increment and decrement buttons", () => {
    render(<NumberInput value={5} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decrease/i })).toBeInTheDocument();
  });

  it("calls onChange with incremented value when + is clicked", async () => {
    const onChange = vi.fn();
    render(<NumberInput value={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with decremented value when - is clicked", async () => {
    const onChange = vi.fn();
    render(<NumberInput value={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("respects min boundary", async () => {
    const onChange = vi.fn();
    render(<NumberInput value={1} min={1} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects max boundary", async () => {
    const onChange = vi.fn();
    render(<NumberInput value={10} max={10} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders label when provided", () => {
    render(<NumberInput label="Quantity" value={1} onChange={() => {}} />);
    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<NumberInput value={0} onChange={() => {}} error="Must be positive" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Must be positive");
  });

  it("renders helper text", () => {
    render(<NumberInput value={0} onChange={() => {}} helpText="Enter a number" />);
    expect(screen.getByText("Enter a number")).toBeInTheDocument();
  });
});
