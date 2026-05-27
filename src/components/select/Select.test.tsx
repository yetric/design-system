import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./Select";

function SimpleSelect({ onValueChange }: { onValueChange?: (v: string) => void }) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders the trigger with placeholder", () => {
    render(<SimpleSelect />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("opens the listbox when trigger is clicked", async () => {
    render(<SimpleSelect />);
    await userEvent.click(screen.getByRole("combobox", { name: "Fruit" }));
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
  });

  it("calls onValueChange with the selected value", async () => {
    const handler = vi.fn();
    render(<SimpleSelect onValueChange={handler} />);
    await userEvent.click(screen.getByRole("combobox", { name: "Fruit" }));
    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(handler).toHaveBeenCalledWith("banana");
  });

  it("shows the selected value in the trigger after selection", async () => {
    render(<SimpleSelect />);
    await userEvent.click(screen.getByRole("combobox", { name: "Fruit" }));
    await userEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });
});
