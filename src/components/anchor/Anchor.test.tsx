import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Anchor } from "./Anchor";

describe("Anchor", () => {
  it("renders children", () => {
    render(<Anchor href="/about">About</Anchor>);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("applies href", () => {
    render(<Anchor href="/test">Link</Anchor>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });

  it("external adds target and rel", () => {
    render(
      <Anchor href="https://example.com" external>
        Example
      </Anchor>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("external renders icon", () => {
    render(
      <Anchor href="https://example.com" external>
        External
      </Anchor>
    );
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("non-external has no target", () => {
    render(<Anchor href="/local">Local</Anchor>);
    expect(screen.getByRole("link")).not.toHaveAttribute("target");
  });
});
