import { render, screen } from "@testing-library/react";

import { Label } from "./Label";

describe("Label", () => {
  it("renders text", () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("associates with a form element via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows a required indicator when required is true", () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required indicator by default", () => {
    render(<Label>Username</Label>);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });
});
