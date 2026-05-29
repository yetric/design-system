import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AIChat, type ChatMessage } from "./AIChat";

const messages: ChatMessage[] = [
  {
    id: "system-1",
    role: "system",
    content: "Responses may be concise.",
  },
  {
    id: "user-1",
    role: "user",
    content: "How many active users signed up today?",
  },
  {
    id: "assistant-1",
    role: "assistant",
    content: "There were 24 active signups today.",
  },
];

describe("AIChat", () => {
  it("renders the empty state when no messages are provided", () => {
    render(<AIChat />);

    expect(screen.getByText("Start a conversation")).toBeInTheDocument();
    expect(
      screen.getByText(/ask a question, provide context, or use a suggestion/i)
    ).toBeInTheDocument();
  });

  it("renders the messages list", () => {
    render(<AIChat messages={messages} />);

    expect(screen.getByText("Responses may be concise.")).toBeInTheDocument();
    expect(screen.getByText("How many active users signed up today?")).toBeInTheDocument();
    expect(screen.getByText("There were 24 active signups today.")).toBeInTheDocument();
  });

  it("calls onSend when typing and pressing Enter", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn().mockResolvedValue(undefined);

    render(<AIChat onSend={onSend} />);

    const textbox = screen.getByRole("textbox");
    await user.type(textbox, "Summarize the last deployment{enter}");

    await waitFor(() => {
      expect(onSend).toHaveBeenCalledWith("Summarize the last deployment");
    });
    expect(textbox).toHaveValue("");
  });

  it("shows the thinking indicator while loading", () => {
    render(<AIChat isLoading />);

    expect(screen.getByLabelText(/assistant is thinking/i)).toBeInTheDocument();
  });

  it("renders suggestions and handles selection", async () => {
    const user = userEvent.setup();
    const onSuggestionSelect = vi.fn();

    render(
      <AIChat
        suggestions={["Summarize this thread", "Draft a follow-up"]}
        onSuggestionSelect={onSuggestionSelect}
      />
    );

    await user.click(screen.getByRole("button", { name: "Draft a follow-up" }));

    expect(screen.getByRole("button", { name: "Summarize this thread" })).toBeInTheDocument();
    expect(onSuggestionSelect).toHaveBeenCalledWith("Draft a follow-up");
  });
});
