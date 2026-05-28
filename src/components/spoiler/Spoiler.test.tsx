import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spoiler } from "./Spoiler";

describe("Spoiler", () => {
  it("renders children", () => {
    render(<Spoiler>Short text</Spoiler>);
    expect(screen.getByText("Short text")).toBeInTheDocument();
  });

  it("does not show toggle button when content fits", () => {
    render(<Spoiler maxHeight={9999}>Short text</Spoiler>);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
