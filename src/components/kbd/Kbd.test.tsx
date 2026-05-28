import { render, screen } from "@testing-library/react";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders a kbd element", () => {
    const { container } = render(<Kbd>⌘K</Kbd>);
    expect(container.querySelector("kbd")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });

  it.each(["xs", "sm", "md", "lg"] as const)("renders size %s without crashing", (size) => {
    render(<Kbd size={size}>{size}</Kbd>);
    expect(screen.getByText(size)).toBeInTheDocument();
  });

  it.each(["default", "outline", "ghost"] as const)("renders variant %s", (variant) => {
    render(<Kbd variant={variant}>{variant}</Kbd>);
    expect(screen.getByText(variant)).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const { container } = render(<Kbd className="custom">K</Kbd>);
    expect(container.querySelector("kbd")).toHaveClass("custom");
  });
});
