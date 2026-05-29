import { render, screen } from "@testing-library/react";
import _userEvent from "@testing-library/user-event";
import { Code } from "./Code";

describe("Code (inline)", () => {
  it("renders a code element", () => {
    const { container } = render(<Code>const x = 1;</Code>);
    expect(container.querySelector("code")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Code>import React</Code>);
    expect(screen.getByText("import React")).toBeInTheDocument();
  });
});

describe("Code (block)", () => {
  it("renders a pre element in block mode", () => {
    const { container } = render(<Code block>const x = 1;</Code>);
    expect(container.querySelector("pre")).toBeInTheDocument();
  });

  it("shows language label when provided", () => {
    render(
      <Code block language="TypeScript">
        const x = 1;
      </Code>
    );
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("shows copy button when copyable", () => {
    render(
      <Code block copyable>
        code here
      </Code>
    );
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });
});
