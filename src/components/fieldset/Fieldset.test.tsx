import { render, screen } from "@testing-library/react";
import { Fieldset } from "./Fieldset";
import { Input } from "../input/Input";

describe("Fieldset", () => {
  it("renders children", () => {
    render(
      <Fieldset>
        <Input placeholder="Test input" />
      </Fieldset>
    );
    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });

  it("renders legend when provided", () => {
    render(<Fieldset legend="Personal info"><span>content</span></Fieldset>);
    expect(screen.getByText("Personal info")).toBeInTheDocument();
  });

  it("disables children when disabled", () => {
    render(
      <Fieldset disabled>
        <Input placeholder="disabled-input" />
      </Fieldset>
    );
    expect(screen.getByPlaceholderText("disabled-input")).toBeDisabled();
  });

  it("renders as a fieldset element", () => {
    const { container } = render(<Fieldset><span>x</span></Fieldset>);
    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });
});
