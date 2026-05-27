import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders an unchecked checkbox", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox", { name: "Accept" })).not.toBeChecked();
  });

  it("renders a checked checkbox with defaultChecked", () => {
    render(<Checkbox aria-label="Accept" defaultChecked />);
    expect(screen.getByRole("checkbox", { name: "Accept" })).toBeChecked();
  });

  it("can be toggled by the user", async () => {
    render(<Checkbox aria-label="Subscribe" />);
    const cb = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(cb).not.toBeChecked();
    await userEvent.click(cb);
    expect(cb).toBeChecked();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox aria-label="Locked" disabled />);
    expect(screen.getByRole("checkbox", { name: "Locked" })).toBeDisabled();
  });

  it("calls onCheckedChange when clicked", async () => {
    const handler = vi.fn();
    render(<Checkbox aria-label="Terms" onCheckedChange={handler} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Terms" }));
    expect(handler).toHaveBeenCalledWith(true);
  });
});
