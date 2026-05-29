import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as sonner from "sonner";
import { Toaster } from "./Toast";
import { toast } from "./toast";

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

  it("calls toast.success", () => {
    toast.success("Saved!");
    expect(vi.mocked(sonner.toast.success)).toHaveBeenCalled();
    expect(vi.mocked(sonner.toast.success).mock.calls[0]?.[0]).toBe("Saved!");
  });

  it("calls toast.error", () => {
    toast.error("Failed");
    expect(vi.mocked(sonner.toast.error)).toHaveBeenCalled();
    expect(vi.mocked(sonner.toast.error).mock.calls[0]?.[0]).toBe("Failed");
  });

  it("calls toast.warning", () => {
    toast.warning("Watch out");
    expect(vi.mocked(sonner.toast.warning)).toHaveBeenCalled();
    expect(vi.mocked(sonner.toast.warning).mock.calls[0]?.[0]).toBe("Watch out");
  });

  it("calls toast.info", () => {
    toast.info("FYI");
    expect(vi.mocked(sonner.toast.info)).toHaveBeenCalled();
    expect(vi.mocked(sonner.toast.info).mock.calls[0]?.[0]).toBe("FYI");
  });

  it("calls toast.dismiss", () => {
    toast.dismiss("toast-id");
    expect(vi.mocked(sonner.toast.dismiss)).toHaveBeenCalledWith("toast-id");
  });
});
