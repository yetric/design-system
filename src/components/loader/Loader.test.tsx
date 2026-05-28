import { render } from "@testing-library/react";

import { Loader } from "./Loader";

describe("Loader", () => {
  it("renders an SVG", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has role=status", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector("svg")).toHaveAttribute("role", "status");
  });

  it("has default aria-label", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-label", "Loading…");
  });

  it("accepts custom label", () => {
    const { container } = render(<Loader label="Saving…" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-label", "Saving…");
  });

  it.each(["xs", "sm", "md", "lg", "xl"] as const)("renders size %s without crashing", (size) => {
    const { container } = render(<Loader size={size} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it.each(["default", "primary", "success", "warning", "destructive", "muted"] as const)(
    "renders variant %s without crashing",
    (variant) => {
      const { container } = render(<Loader variant={variant} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    }
  );

  it("accepts custom className", () => {
    const { container } = render(<Loader className="extra-class" />);
    expect(container.querySelector("svg")).toHaveClass("extra-class");
  });
});
