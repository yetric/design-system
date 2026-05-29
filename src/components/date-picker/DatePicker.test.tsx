import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders with placeholder text", () => {
    render(<DatePicker />);

    expect(screen.getByRole("button", { name: "Pick a date" })).toBeInTheDocument();
  });

  it("opens popover when trigger clicked", async () => {
    const user = userEvent.setup();

    render(<DatePicker />);

    await user.click(screen.getByRole("button", { name: "Pick a date" }));

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("displays formatted date when value provided", () => {
    render(<DatePicker value={new Date(2026, 4, 29)} />);

    expect(screen.getByRole("button", { name: "May 29th, 2026" })).toBeInTheDocument();
  });

  it("calls onChange when date selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    function TestDatePicker() {
      const [value, setValue] = useState<Date | undefined>(new Date(2026, 4, 20));

      return (
        <DatePicker
          value={value}
          onChange={(nextValue) => {
            handleChange(nextValue);
            setValue(nextValue);
          }}
        />
      );
    }

    render(<TestDatePicker />);

    await user.click(screen.getByRole("button", { name: "May 20th, 2026" }));
    await user.click(screen.getByRole("button", { name: /May 23rd, 2026/i }));

    expect(handleChange).toHaveBeenCalledWith(new Date(2026, 4, 23));
  });

  it("disabled state prevents interaction", async () => {
    const user = userEvent.setup();

    render(<DatePicker disabled />);

    const trigger = screen.getByRole("button", { name: "Pick a date" });

    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});
