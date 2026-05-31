import { Sparkles } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SuggestionChips } from "./SuggestionChips";

const chips = [
  { id: "summarize", label: "Summarize", icon: Sparkles },
  { id: "rewrite", label: "Rewrite" },
  { id: "translate", label: "Translate" },
  { id: "brainstorm", label: "Brainstorm" },
];

describe("SuggestionChips", () => {
  it("renders chips", () => {
    render(<SuggestionChips chips={chips} />);

    expect(screen.getByRole("button", { name: "Summarize" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rewrite" })).toBeInTheDocument();
  });

  it("calls onSelect when a chip is clicked", async () => {
    const onSelect = vi.fn();
    render(<SuggestionChips chips={chips} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("button", { name: "Translate" }));

    expect(onSelect).toHaveBeenCalledWith(chips[2]);
  });

  it("hides extra chips when maxVisible is set", () => {
    render(<SuggestionChips chips={chips} maxVisible={2} />);

    expect(screen.getByRole("button", { name: "Summarize" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rewrite" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Translate" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+2 more" })).toBeInTheDocument();
  });

  it("toggles hidden chips", async () => {
    render(<SuggestionChips chips={chips} maxVisible={2} />);

    await userEvent.click(screen.getByRole("button", { name: "+2 more" }));

    expect(screen.getByRole("button", { name: "Translate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Brainstorm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show less" })).toBeInTheDocument();
  });

  it("supports the disabled state", () => {
    render(<SuggestionChips chips={chips} disabled maxVisible={2} />);

    expect(screen.getByRole("button", { name: "Summarize" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+2 more" })).toBeDisabled();
  });
});
