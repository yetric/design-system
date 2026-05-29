import { render, screen } from "@testing-library/react";

import { ThinkingIndicator } from "./ThinkingIndicator";

describe("ThinkingIndicator", () => {
  it("renders with default props", () => {
    render(<ThinkingIndicator />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Thinking")).toBeInTheDocument();
  });

  it("shows a custom label", () => {
    render(<ThinkingIndicator label="Analyzing" />);

    expect(screen.getByText("Analyzing")).toBeInTheDocument();
  });

  it.each(["dots", "pulse", "spinner"] as const)("renders the %s variant", (variant) => {
    const { container } = render(<ThinkingIndicator variant={variant} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it.each([
    ["sm", "text-xs"],
    ["md", "text-sm"],
    ["lg", "text-base"],
  ] as const)("applies %s size classes", (size, expectedClass) => {
    render(<ThinkingIndicator size={size} />);

    expect(screen.getByRole("status")).toHaveClass(expectedClass);
  });
});
