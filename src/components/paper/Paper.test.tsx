import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Paper } from "./Paper";

describe("Paper", () => {
  it("renders children", () => {
    render(<Paper>Content</Paper>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies shadow class", () => {
    render(<Paper shadow="lg">Content</Paper>);
    expect(screen.getByText("Content")).toHaveClass("shadow-lg");
  });

  it("applies radius class", () => {
    render(<Paper radius="sm">Content</Paper>);
    expect(screen.getByText("Content")).toHaveClass("rounded");
  });

  it("uses card background", () => {
    render(<Paper>Content</Paper>);
    expect(screen.getByText("Content")).toHaveClass("bg-card");
  });

  it("renders as a different element", () => {
    render(
      <Paper as="section" aria-label="test-section">
        Content
      </Paper>
    );
    expect(screen.getByRole("region", { name: "test-section" })).toBeInTheDocument();
  });
});
