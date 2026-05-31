import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StreamingText } from "./StreamingText";

afterEach(() => {
  vi.useRealTimers();
});

describe("StreamingText", () => {
  it("renders empty initially", () => {
    vi.useFakeTimers();

    render(<StreamingText text="Hello" speed={50} cursor={false} />);

    expect(screen.getByText("", { selector: "span" })).toHaveTextContent("");
  });

  it("streams all characters", async () => {
    vi.useFakeTimers();

    render(<StreamingText text="Hello" speed={20} cursor={false} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onComplete when streaming finishes", async () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();

    render(<StreamingText text="Hi" speed={10} onComplete={onComplete} cursor={false} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("shows and hides the cursor based on the cursor prop", async () => {
    vi.useFakeTimers();

    const { rerender } = render(<StreamingText text="Hello" speed={20} />);

    expect(screen.getByTestId("streaming-text-cursor")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(screen.getByTestId("streaming-text-cursor")).toBeInTheDocument();

    rerender(<StreamingText text="Hello" speed={20} cursor={false} />);

    expect(screen.queryByTestId("streaming-text-cursor")).not.toBeInTheDocument();
  });
});
