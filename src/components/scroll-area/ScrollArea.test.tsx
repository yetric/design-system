import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea className="h-40">
        <p>Scrollable content</p>
      </ScrollArea>
    );
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <ScrollArea className="my-class">
        <p>Content</p>
      </ScrollArea>
    );
    expect(container.firstChild).toHaveClass("my-class");
  });
});
