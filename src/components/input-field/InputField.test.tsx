import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputField } from "./InputField";

describe("InputField — input", () => {
  it("renders without a label", () => {
    render(<InputField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders a label associated with the input", () => {
    render(<InputField label="Email" placeholder="you@example.com" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows a required indicator on the label", () => {
    render(<InputField label="Password" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows helpText when provided", () => {
    render(<InputField label="Username" helpText="Used for login" />);
    expect(screen.getByText("Used for login")).toBeInTheDocument();
  });

  it("hides helpText when error is shown", () => {
    render(
      <InputField label="Email" helpText="We respect your privacy" error="Invalid email" />
    );
    expect(screen.queryByText("We respect your privacy")).not.toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows error message with role=alert", () => {
    render(<InputField label="Email" error="Enter a valid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");
  });

  it("sets aria-invalid when error is truthy", () => {
    render(<InputField label="Email" error="Bad input" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("accepts typed input", async () => {
    render(<InputField label="Name" placeholder="Your name" />);
    await userEvent.type(screen.getByLabelText("Name"), "Mattias");
    expect(screen.getByLabelText("Name")).toHaveValue("Mattias");
  });

  it("is disabled when disabled prop is set", () => {
    render(<InputField label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });
});

describe("InputField — multiline", () => {
  it("renders a textarea element", () => {
    render(<InputField multiline label="Bio" placeholder="Tell us about yourself" />);
    expect(screen.getByLabelText("Bio").tagName).toBe("TEXTAREA");
  });

  it("accepts typed input", async () => {
    render(<InputField multiline label="Notes" />);
    await userEvent.type(screen.getByLabelText("Notes"), "Hello world");
    expect(screen.getByLabelText("Notes")).toHaveValue("Hello world");
  });

  it("sets aria-invalid when error is truthy", () => {
    render(<InputField multiline label="Bio" error="Too short" />);
    expect(screen.getByLabelText("Bio")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows error message with role=alert", () => {
    render(<InputField multiline label="Bio" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("is disabled when disabled prop is set", () => {
    render(<InputField multiline label="Notes" disabled />);
    expect(screen.getByLabelText("Notes")).toBeDisabled();
  });
});
