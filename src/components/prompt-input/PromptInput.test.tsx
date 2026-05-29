import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PromptInput } from "./PromptInput";

describe("PromptInput", () => {
  it("renders a textarea", () => {
    render(<PromptInput placeholder="Ask anything" />);

    expect(screen.getByPlaceholderText("Ask anything")).toBeInTheDocument();
  });

  it("emits changes while typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<PromptInput onChange={onChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(onChange).toHaveBeenLastCalledWith("Hello");
    expect(input).toHaveValue("Hello");
  });

  it("submits on Enter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<PromptInput onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");
    await user.keyboard("{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("Hello");
  });

  it("does not submit on Shift+Enter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<PromptInput onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue("Hello\n");
  });

  it("respects the disabled state", () => {
    render(<PromptInput disabled value="Hello" />);

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: /send prompt/i })).toBeDisabled();
  });

  it("shows loading state", () => {
    render(<PromptInput loading value="Hello" />);

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /loading/i }).querySelector("svg")
    ).toBeInTheDocument();
  });
});
