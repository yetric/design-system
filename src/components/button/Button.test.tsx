import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("supports variants", () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("supports asChild", () => {
    render(
      <Button asChild>
        <a href="/">Go</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Go" })).toBeInTheDocument();
  });
});
