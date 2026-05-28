import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

const TestDialog = ({ onConfirm = () => {}, onCancel = () => {} }) => (
  <AlertDialog>
    <AlertDialogTrigger>Delete</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

describe("AlertDialog", () => {
  it("renders trigger button", () => {
    render(<TestDialog />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("calls onConfirm when action is clicked", async () => {
    const onConfirm = vi.fn();
    render(<TestDialog onConfirm={onConfirm} />);
    await userEvent.click(screen.getByText("Delete"));
    await userEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("closes when cancel is clicked", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });

  it("title has correct role", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
