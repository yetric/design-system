import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  it("submits valid signup values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SignupForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });
  });

  it("shows inline validation errors and prevents invalid signup", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SignupForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/full name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/^password/i), "short");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 8 characters.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders a login action when provided", async () => {
    const user = userEvent.setup();
    const onLoginClick = vi.fn();

    render(<SignupForm onSubmit={vi.fn()} onLoginClick={onLoginClick} />);

    await user.click(screen.getByRole("button", { name: /already have an account\? log in/i }));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it("shows an external error and loading state", () => {
    render(<SignupForm onSubmit={vi.fn()} error="Unable to create account." loading={true} />);

    expect(screen.getByRole("alert")).toHaveTextContent("Unable to create account.");
    expect(screen.getByRole("button", { name: /create account/i })).toBeDisabled();
    expect(screen.getByLabelText(/full name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/^password/i)).toBeDisabled();
  });
});
