import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ModelSelector } from "./ModelSelector";

const models = [
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", badge: "Fast" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", badge: "Latest" },
  { id: "claude-3-7", name: "Claude 3.7 Sonnet", provider: "Anthropic", badge: "Smart" },
];

describe("ModelSelector", () => {
  it("renders models", () => {
    render(<ModelSelector models={models} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "GPT-4o Mini · Fast" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Claude 3.7 Sonnet · Smart" })).toBeInTheDocument();
  });

  it("selects a model", () => {
    render(<ModelSelector models={models} value="gpt-4.1" />);

    expect(screen.getByRole("combobox")).toHaveValue("gpt-4.1");
  });

  it("calls onChange", async () => {
    const onChange = vi.fn();
    render(<ModelSelector models={models} onChange={onChange} />);

    await userEvent.selectOptions(screen.getByRole("combobox"), "claude-3-7");

    expect(onChange).toHaveBeenCalledWith("claude-3-7");
  });

  it("shows a placeholder when no value is selected", () => {
    render(<ModelSelector models={models} placeholder="Pick a model" />);

    expect(screen.getByRole("option", { name: "Pick a model" })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("supports the disabled state", () => {
    render(<ModelSelector models={models} disabled />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
