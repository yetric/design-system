import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();

    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toBeInTheDocument();

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("renders as a span", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("accepts a custom className", () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom-class");
  });
});
