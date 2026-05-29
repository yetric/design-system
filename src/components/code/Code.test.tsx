import * as React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Code } from "./Code";

let writeTextMock: ReturnType<typeof vi.fn>;

describe("Code (inline)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });
  });

  it("renders a code element", () => {
    const { container } = render(<Code>const x = 1;</Code>);
    expect(container.querySelector("code")).toBeInTheDocument();
    expect(container.querySelector("pre")).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Code>import React</Code>);
    expect(screen.getByText("import React")).toBeInTheDocument();
  });

  it("applies custom classes in inline mode", () => {
    render(<Code className="inline-test">const value = 1;</Code>);
    expect(screen.getByText("const value = 1;")).toHaveClass("inline-test");
  });
});

describe("Code (block)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });
  });

  it("renders a pre element in block mode", () => {
    const { container } = render(<Code block>const x = 1;</Code>);
    expect(container.querySelector("pre")).toBeInTheDocument();
    expect(container.querySelector("pre")).toHaveClass("rounded-md");
  });

  it("shows the language label and rounded block styling when provided", () => {
    const { container } = render(
      <Code block language="TypeScript">
        const x = 1;
      </Code>
    );

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(container.querySelector("pre")).toHaveClass("rounded-b-md");
  });

  it("shows copy button when copyable", async () => {
    const user = userEvent.setup();
    render(
      <Code block copyable>
        code here
      </Code>
    );

    await user.tab();
    expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument();
  });

  it("copies string children to the clipboard", async () => {
    render(
      <Code block copyable>
        const copied = true;
      </Code>
    );

    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
      expect(String(writeTextMock.mock.calls[0]?.[0]).trim()).toBe("const copied = true;");
      expect(screen.getByRole("button", { name: /copied!/i })).toBeInTheDocument();
    });
  });

  it("copies rendered text when children are not a string", async () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Code block copyable ref={ref}>
        <span>const rendered = true;</span>
      </Code>
    );

    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith("const rendered = true;");
    });
  });
});
