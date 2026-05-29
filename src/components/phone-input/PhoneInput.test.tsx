import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PhoneInput } from "./PhoneInput";

describe("PhoneInput", () => {
  it("renders the country select and phone input", () => {
    render(<PhoneInput defaultCountry="SE" placeholder="Enter phone number" />);

    expect(screen.getByRole("combobox", { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /phone number/i })).toHaveAttribute(
      "placeholder",
      "Enter phone number"
    );
  });

  it("calls onChange with an E.164 value", async () => {
    const onChange = vi.fn();

    render(<PhoneInput defaultCountry="SE" onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox", { name: /phone number/i }), {
      target: { value: "701234567" },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("+46701234567");
    });
  });

  it("disables the select and input when disabled", () => {
    render(<PhoneInput defaultCountry="US" disabled />);

    expect(screen.getByRole("combobox", { name: /country/i })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /phone number/i })).toBeDisabled();
  });
});
