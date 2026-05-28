import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>React</Chip>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("has role=checkbox", () => {
    render(<Chip>React</Chip>);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("has aria-checked=false by default", () => {
    render(<Chip>React</Chip>);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
  });

  it("has aria-checked=true when checked", () => {
    render(<Chip checked>React</Chip>);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with toggled value on click", async () => {
    const onChange = vi.fn();
    render(<Chip checked={false} onChange={onChange}>React</Chip>);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Chip disabled>React</Chip>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it.each(["xs", "sm", "md", "lg", "xl"] as const)("renders size %s without crashing", (size) => {
    render(<Chip size={size}>{size}</Chip>);
    expect(screen.getByText(size)).toBeInTheDocument();
  });
});
