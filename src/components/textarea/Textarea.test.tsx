import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<Textarea helpText="Up to 500 characters" />);
    expect(screen.getByText("Up to 500 characters")).toBeInTheDocument();
  });

  it("renders error message and sets aria-invalid", () => {
    render(<Textarea error="Required field" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("hides helper text when error is shown", () => {
    render(<Textarea helpText="Help" error="Bad" />);
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    render(<Textarea />);
    const ta = screen.getByRole("textbox");
    await userEvent.type(ta, "hello");
    expect(ta).toHaveValue("hello");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts custom className", () => {
    render(<Textarea className="custom" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom");
  });
});
