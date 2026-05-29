import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const driverMocks = vi.hoisted(() => {
  const mockDrive = vi.fn();
  const mockDestroy = vi.fn();
  const mockMoveNext = vi.fn();
  const mockMovePrevious = vi.fn();
  const mockSetConfig = vi.fn();
  const mockSetSteps = vi.fn();
  const mockIsLastStep = vi.fn(() => false);
  const latest = {
    config: undefined as Record<string, any> | undefined,
  };
  const mockDriver = {
    isActive: vi.fn(() => true),
    refresh: vi.fn(),
    drive: mockDrive,
    setConfig: mockSetConfig,
    setSteps: mockSetSteps,
    getConfig: vi.fn(),
    getState: vi.fn(),
    getActiveIndex: vi.fn(),
    isFirstStep: vi.fn(),
    isLastStep: mockIsLastStep,
    getActiveStep: vi.fn(),
    getActiveElement: vi.fn(),
    getPreviousElement: vi.fn(),
    getPreviousStep: vi.fn(),
    moveNext: mockMoveNext,
    movePrevious: mockMovePrevious,
    moveTo: vi.fn(),
    hasNextStep: vi.fn(),
    hasPreviousStep: vi.fn(),
    highlight: vi.fn(),
    destroy: mockDestroy,
  };
  const mockDriverFactory = vi.fn((config) => {
    latest.config = config;
    return mockDriver;
  });

  return {
    latest,
    mockDestroy,
    mockDrive,
    mockDriver,
    mockDriverFactory,
    mockIsLastStep,
    mockMoveNext,
    mockMovePrevious,
    mockSetConfig,
    mockSetSteps,
  };
});

vi.mock("driver.js", () => ({
  driver: driverMocks.mockDriverFactory,
}));

import { Tour, type TourStep, useTour } from "./Tour";

const STEPS: TourStep[] = [{ element: ".hero", title: "Welcome", description: "Start here" }];

function TourHarness(props: { steps?: TourStep[]; onComplete?: () => void; onSkip?: () => void }) {
  const { isActive, start, stop } = useTour(props.steps ?? STEPS, {
    onComplete: props.onComplete,
    onSkip: props.onSkip,
  });

  return (
    <div>
      <button type="button" onClick={start}>
        Start tour
      </button>
      <button type="button" onClick={stop}>
        Stop tour
      </button>
      <span>{isActive ? "active" : "inactive"}</span>
    </div>
  );
}

describe("Tour", () => {
  beforeEach(() => {
    driverMocks.latest.config = undefined;
    driverMocks.mockDrive.mockClear();
    driverMocks.mockDestroy.mockClear();
    driverMocks.mockMoveNext.mockClear();
    driverMocks.mockMovePrevious.mockClear();
    driverMocks.mockSetConfig.mockClear();
    driverMocks.mockSetSteps.mockClear();
    driverMocks.mockIsLastStep.mockReset();
    driverMocks.mockIsLastStep.mockReturnValue(false);
    driverMocks.mockDriverFactory.mockClear();
  });

  it("auto starts the driver when requested", () => {
    render(
      <>
        <div className="hero">Hero</div>
        <Tour autoStart steps={STEPS} />
      </>
    );

    expect(driverMocks.mockDriverFactory).toHaveBeenCalledTimes(1);
    expect(driverMocks.mockDrive).toHaveBeenCalledTimes(1);
  });

  it("exposes imperative start and stop controls via useTour", () => {
    render(<TourHarness />);

    fireEvent.click(screen.getByRole("button", { name: /start tour/i }));
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(driverMocks.mockDrive).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /stop tour/i }));
    expect(screen.getByText("inactive")).toBeInTheDocument();
    expect(driverMocks.mockDestroy).toHaveBeenCalledTimes(1);
  });

  it("calls onComplete when the tour finishes", () => {
    const onComplete = vi.fn();

    render(<TourHarness onComplete={onComplete} />);

    fireEvent.click(screen.getByRole("button", { name: /start tour/i }));
    driverMocks.mockIsLastStep.mockReturnValue(true);

    act(() => {
      driverMocks.latest.config?.steps?.[0]?.popover?.onNextClick?.();
    });
    expect(driverMocks.mockDestroy).toHaveBeenCalledTimes(1);

    act(() => {
      driverMocks.latest.config?.onDestroyed?.();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("calls onSkip when the tour is closed", () => {
    const onSkip = vi.fn();

    render(<TourHarness onSkip={onSkip} />);

    fireEvent.click(screen.getByRole("button", { name: /start tour/i }));

    act(() => {
      driverMocks.latest.config?.steps?.[0]?.popover?.onCloseClick?.();
    });
    expect(driverMocks.mockDestroy).toHaveBeenCalledTimes(1);

    act(() => {
      driverMocks.latest.config?.onDestroyed?.();
    });
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
