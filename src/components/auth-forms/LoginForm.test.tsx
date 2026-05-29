import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("submits valid credentials", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(onSubmit).toHaveBeenCalledWith({ email: "user@example.com", password: "password123" });
  });

  it("shows inline validation errors and prevents invalid submission", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 8 characters.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders helper actions when provided", async () => {
    const user = userEvent.setup();
    const onForgotPassword = vi.fn();
    const onSignupClick = vi.fn();

    render(
      <LoginForm
        onSubmit={vi.fn()}
        onForgotPassword={onForgotPassword}
        onSignupClick={onSignupClick}
      />
    );

    await user.click(screen.getByRole("button", { name: /forgot password\?/i }));
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    expect(onSignupClick).toHaveBeenCalledTimes(1);
  });

  it("shows an external error and loading state", () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials." loading={true} />);

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials.");
    expect(screen.getByRole("button", { name: /log in/i })).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });
});
