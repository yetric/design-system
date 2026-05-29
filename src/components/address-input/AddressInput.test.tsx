import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AddressInput, type AddressSuggestion } from "./AddressInput";

afterEach(() => {
  vi.useRealTimers();
});

describe("AddressInput", () => {
  it("debounces searches until the minimum characters are reached", async () => {
    vi.useFakeTimers();

    const onSearch = vi.fn().mockResolvedValue([]);

    render(<AddressInput onSearch={onSearch} minChars={3} debounceMs={300} />);

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "ab" } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(onSearch).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "abc" } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(299);
    });
    expect(onSearch).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
      await Promise.resolve();
    });

    expect(onSearch).toHaveBeenCalledWith("abc");
  });

  it("shows loading and empty states in the dropdown", async () => {
    vi.useFakeTimers();

    let resolveSearch: (value: AddressSuggestion[]) => void = () => {};
    const onSearch = vi.fn(
      () =>
        new Promise<AddressSuggestion[]>((resolve) => {
          resolveSearch = resolve;
        })
    );

    render(<AddressInput onSearch={onSearch} minChars={1} debounceMs={200} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "main" } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
      await Promise.resolve();
    });

    expect(screen.getByText(/searching/i)).toBeInTheDocument();

    await act(async () => {
      resolveSearch([]);
      await Promise.resolve();
    });

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it("supports keyboard navigation and selection", async () => {
    const suggestions: AddressSuggestion[] = [
      { id: "1", label: "1 Main Street, Stockholm", value: "1 Main Street, Stockholm" },
      { id: "2", label: "2 Main Street, Stockholm", value: "2 Main Street, Stockholm" },
    ];
    const onSuggestionSelect = vi.fn();

    render(
      <AddressInput
        onSearch={vi.fn().mockResolvedValue(suggestions)}
        onSuggestionSelect={onSuggestionSelect}
        minChars={1}
        debounceMs={0}
      />
    );

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "main" } });

    await waitFor(() => {
      expect(screen.getByText("1 Main Street, Stockholm")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSuggestionSelect).toHaveBeenCalledWith(suggestions[1]);
    expect(input).toHaveValue("2 Main Street, Stockholm");
  });
});
