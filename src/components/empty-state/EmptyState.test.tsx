import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PackageSearch } from "lucide-react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items yet" />);
    expect(screen.getByText("No items yet")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No items" description="Get started by adding your first item." />);
    expect(screen.getByText("Get started by adding your first item.")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<EmptyState title="No items" />);
    expect(screen.queryByText("Get started by adding your first item.")).not.toBeInTheDocument();
  });

  it("renders action button with label", () => {
    render(<EmptyState title="No items" action={{ label: "Add item" }} />);
    expect(screen.getByRole("button", { name: /add item/i })).toBeInTheDocument();
  });

  it("calls onClick when action button is clicked", () => {
    const onClick = vi.fn();
    render(<EmptyState title="No items" action={{ label: "Add item", onClick }} />);
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render action button when action is omitted", () => {
    render(<EmptyState title="No items" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<EmptyState title="No items" icon={PackageSearch} />);
    // Icon renders as an SVG inside the component
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<EmptyState title="No items" className="custom-class" />);
    expect(document.querySelector(".custom-class")).toBeInTheDocument();
  });
});
