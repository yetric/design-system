import { render, screen } from "@testing-library/react";

import { AIMessage } from "./AIMessage";

describe("AIMessage", () => {
  it("renders user messages right aligned", () => {
    render(<AIMessage role="user" content="Hello" />);

    expect(screen.getByTestId("ai-message")).toHaveClass("justify-end");
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders assistant messages left aligned", () => {
    render(<AIMessage role="assistant" content="Hi there" />);

    expect(screen.getByTestId("ai-message")).toHaveClass("justify-start");
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("renders system messages centered", () => {
    render(<AIMessage role="system" content="System update" />);

    expect(screen.getByTestId("ai-message")).toHaveClass("justify-center");
    expect(screen.getByText("System update")).toBeInTheDocument();
  });

  it("shows and hides the streaming cursor", () => {
    const { rerender } = render(<AIMessage role="assistant" content="Streaming" isStreaming />);

    expect(screen.getByTestId("ai-message-cursor")).toBeInTheDocument();

    rerender(<AIMessage role="assistant" content="Streaming" isStreaming={false} />);

    expect(screen.queryByTestId("ai-message-cursor")).not.toBeInTheDocument();
  });

  it("formats the timestamp as HH:mm", () => {
    render(<AIMessage role="assistant" content="At time" timestamp={new Date(2024, 0, 1, 9, 5)} />);

    expect(screen.getByText("09:05")).toBeInTheDocument();
  });
});
