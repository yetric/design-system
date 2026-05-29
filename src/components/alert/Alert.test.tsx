import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders with role=alert", () => {
    render(<Alert>msg</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="Heads up">Details here.</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("renders dismiss button when onClose is provided", () => {
    render(<Alert onClose={() => {}}>msg</Alert>);
    expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
  });

  it("does not render dismiss button without onClose", () => {
    render(<Alert>msg</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onClose when dismiss button is clicked", async () => {
    const onClose = vi.fn();
    render(<Alert onClose={onClose}>msg</Alert>);
    await userEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each(["default", "info", "success", "warning", "destructive"] as const)(
    "renders variant %s without crashing",
    (variant) => {
      render(<Alert variant={variant}>{variant}</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    }
  );

  it("renders without icon when icon=false", () => {
    const { container } = render(
      <Alert icon={false} title="No icon">
        msg
      </Alert>
    );
    expect(container.querySelector("[aria-hidden=true]")).not.toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<Alert className="my-custom">msg</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("my-custom");
  });
});
