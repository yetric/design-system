import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a span", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("accepts a custom className", () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom-class");
  });

  it.each([
    "default", "secondary", "outline", "ghost",
    "destructive", "warning", "success", "info"
  ] as const)("renders variant %s without crashing", (variant) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant)).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("renders size %s without crashing", (size) => {
    render(<Badge size={size}>{size}</Badge>);
    expect(screen.getByText(size)).toBeInTheDocument();
  });
});
