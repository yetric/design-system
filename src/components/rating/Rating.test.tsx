import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renders the correct number of stars", () => {
    render(<Rating count={5} />);
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("renders custom count", () => {
    render(<Rating count={3} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("calls onChange when a star is clicked", () => {
    const onChange = vi.fn();
    render(<Rating count={5} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole("radio")[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("does not call onChange when readOnly", () => {
    const onChange = vi.fn();
    render(<Rating count={5} readOnly onChange={onChange} />);
    screen.getAllByRole("radio").forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("marks checked star", () => {
    render(<Rating value={3} count={5} />);
    expect(screen.getAllByRole("radio")[2]).toHaveAttribute("aria-checked", "true");
  });
});
