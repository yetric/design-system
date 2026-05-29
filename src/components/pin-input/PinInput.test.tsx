import { useState, type ComponentProps } from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PinInput } from "./PinInput";

function StatefulPinInput({
  initialValue = "",
  onChange = vi.fn(),
  ...props
}: Partial<ComponentProps<typeof PinInput>> & {
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <PinInput
      length={4}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
      {...props}
    />
  );
}

describe("PinInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correct number of inputs", () => {
    render(<PinInput length={4} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("renders custom length", () => {
    render(<PinInput length={6} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("calls onChange when digit entered", () => {
    const onChange = vi.fn();
    render(<PinInput length={4} value="" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("moves focus to the next input when typing digits", async () => {
    const user = userEvent.setup();
    render(<StatefulPinInput />);

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "1");

    await waitFor(() => {
      expect(inputs[0]).toHaveValue("1");
      expect(document.activeElement).toBe(inputs[1]);
    });
  });

  it("moves focus to the previous input when backspacing an empty field", () => {
    render(<StatefulPinInput initialValue="12" />);

    const inputs = screen.getAllByRole("textbox");
    inputs[2].focus();
    fireEvent.keyDown(inputs[2], { key: "Backspace" });

    expect(document.activeElement).toBe(inputs[1]);
  });

  it("handles pasting a full pin", async () => {
    render(<StatefulPinInput />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.paste(inputs[0], {
      clipboardData: {
        getData: () => "1234",
      },
    });

    await waitFor(() => {
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");
      expect(inputs[3]).toHaveValue("4");
    });
  });

  it("fires onComplete when all digits are filled", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<StatefulPinInput onComplete={onComplete} />);

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");
    await user.type(inputs[2], "3");
    await user.type(inputs[3], "4");

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith("1234");
    });
  });

  it("applies error class when error=true", () => {
    render(<PinInput length={4} error />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toHaveClass("border-destructive"));
  });

  it("disables all inputs when disabled", () => {
    render(<PinInput length={4} disabled />);
    screen.getAllByRole("textbox").forEach((input) => expect(input).toBeDisabled());
  });

  it("limits each input to a single character", () => {
    render(<PinInput length={4} />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toHaveAttribute("maxLength", "1");
    });
  });

  it("uses password type when mask=true", () => {
    const { container } = render(<PinInput length={4} mask />);

    container.querySelectorAll("input").forEach((input) => {
      expect(input).toHaveAttribute("type", "password");
    });
  });
});
