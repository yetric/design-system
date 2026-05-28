import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as sonner from "sonner";
import { Toaster, toast } from "./Toast";

// Mock sonner so tests don't depend on DOM internals
vi.mock("sonner", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockToast = vi.fn() as any;
  mockToast.success = vi.fn();
  mockToast.error = vi.fn();
  mockToast.warning = vi.fn();
  mockToast.info = vi.fn();
  mockToast.loading = vi.fn();
  mockToast.promise = vi.fn();
  mockToast.dismiss = vi.fn();
  mockToast.custom = vi.fn();

  const Toaster = ({ "data-testid": testId }: { "data-testid"?: string }) => (
    <div data-testid={testId ?? "toaster"} />
  );
  Toaster.displayName = "Toaster";

  return { toast: mockToast, Toaster };
});

describe("Toaster", () => {
  it("renders without crashing", () => {
    render(<Toaster />);
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });
});

describe("toast API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls sonner toast for default", () => {
    toast("Hello");
    expect(vi.mocked(sonner.toast)).toHaveBeenCalledWith("Hello");
  });

  it("calls toast.success", () => {
    toast.success("Saved!");
    expect(vi.mocked(sonner.toast.success)).toHaveBeenCalledWith("Saved!");
  });

  it("calls toast.error", () => {
    toast.error("Failed");
    expect(vi.mocked(sonner.toast.error)).toHaveBeenCalledWith("Failed");
  });

  it("calls toast.warning", () => {
    toast.warning("Watch out");
    expect(vi.mocked(sonner.toast.warning)).toHaveBeenCalledWith("Watch out");
  });

  it("calls toast.info", () => {
    toast.info("FYI");
    expect(vi.mocked(sonner.toast.info)).toHaveBeenCalledWith("FYI");
  });
});
