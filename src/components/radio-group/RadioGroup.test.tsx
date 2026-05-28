import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

describe("RadioGroup", () => {
  it("renders items with labels", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("renders items without labels", () => {
    render(
      <RadioGroup aria-label="choices">
        <RadioGroupItem value="x" />
        <RadioGroupItem value="y" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
  });

  it("label is associated with the radio via htmlFor", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Pick A" />
      </RadioGroup>
    );
    expect(screen.getByLabelText("Pick A")).toBeInTheDocument();
  });

  it("calls onValueChange when selection changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup onValueChange={onChange}>
        <RadioGroupItem value="x" label="X" />
        <RadioGroupItem value="y" label="Y" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText("Y"));
    expect(onChange).toHaveBeenCalledWith("y");
  });

  it("respects defaultValue", () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" label="A" />
        <RadioGroupItem value="b" label="B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText("B")).toBeChecked();
    expect(screen.getByLabelText("A")).not.toBeChecked();
  });

  it("disables individual items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="A" disabled />
      </RadioGroup>
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
  });
});
