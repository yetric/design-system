import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button/Button";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("renders trigger and opens dialog on click", () => {
    render(
      <ConfirmDialog
        trigger={<Button>Open</Button>}
        title="Are you sure?"
        description="This cannot be undone."
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("renders confirm and cancel buttons with default labels", () => {
    render(<ConfirmDialog trigger={<Button>Open</Button>} title="Confirm?" open={true} />);
    expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("renders custom confirm and cancel labels", () => {
    render(
      <ConfirmDialog
        trigger={<Button>Open</Button>}
        title="Delete?"
        confirmLabel="Yes, delete"
        cancelLabel="No, keep it"
        open={true}
      />
    );
    expect(screen.getByRole("button", { name: /yes, delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no, keep it/i })).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        trigger={<Button>Open</Button>}
        title="Confirm?"
        onConfirm={onConfirm}
        open={true}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        trigger={<Button>Open</Button>}
        title="Confirm?"
        onCancel={onCancel}
        open={true}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("disables confirm button when confirmDisabled is true", () => {
    render(<ConfirmDialog title="Confirm?" confirmDisabled={true} open={true} />);
    expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
  });

  it("renders children inside dialog", () => {
    render(
      <ConfirmDialog title="Confirm?" open={true}>
        <p>Extra content</p>
      </ConfirmDialog>
    );
    expect(screen.getByText("Extra content")).toBeInTheDocument();
  });
});
