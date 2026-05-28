import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Blockquote } from "./Blockquote";

describe("Blockquote", () => {
  it("renders quote text", () => {
    render(<Blockquote>Design is how it works.</Blockquote>);
    expect(screen.getByText("Design is how it works.")).toBeInTheDocument();
  });

  it("renders cite when provided", () => {
    render(<Blockquote cite="Steve Jobs">Design is how it works.</Blockquote>);
    expect(screen.getByText("Steve Jobs")).toBeInTheDocument();
  });

  it("does not render cite element when omitted", () => {
    render(<Blockquote>Some quote</Blockquote>);
    expect(screen.queryByRole("group")).toBeNull();
    expect(document.querySelector("cite")).toBeNull();
  });

  it("applies size class", () => {
    render(<Blockquote size="lg">Quote</Blockquote>);
    expect(document.querySelector("blockquote")).toHaveClass("text-lg");
  });
});
