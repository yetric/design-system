import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DateRangePicker, type DateRange } from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("renders with placeholder", () => {
    render(<DateRangePicker />);

    expect(screen.getByRole("button", { name: "Pick a date range" })).toBeInTheDocument();
  });

  it("opens popover on click", async () => {
    const user = userEvent.setup();

    render(<DateRangePicker />);

    await user.click(screen.getByRole("button", { name: "Pick a date range" }));

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("displays range when value provided", () => {
    render(<DateRangePicker value={{ from: new Date(2026, 4, 29), to: new Date(2026, 5, 2) }} />);

    expect(screen.getByRole("button", { name: "May 29, 2026 – Jun 2, 2026" })).toBeInTheDocument();
  });

  it("calls onChange when range selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    function TestDateRangePicker() {
      const [value, setValue] = useState<DateRange | undefined>({ from: new Date(2026, 4, 20) });

      return (
        <DateRangePicker
          value={value}
          onChange={(nextValue) => {
            handleChange(nextValue);
            setValue(nextValue);
          }}
        />
      );
    }

    render(<TestDateRangePicker />);

    await user.click(screen.getByRole("button", { name: "May 20, 2026 –" }));
    await user.click(screen.getByRole("button", { name: /May 23rd, 2026/i }));

    expect(handleChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 4, 20),
      to: new Date(2026, 4, 23),
    });
  });
});
