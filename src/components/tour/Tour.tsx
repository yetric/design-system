"use client";

import * as React from "react";
import { driver, type DriveStep, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

export interface TourStep {
  element?: string;
  title: string;
  description: string;
  side?: "top" | "right" | "bottom" | "left";
}

export interface TourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  autoStart?: boolean;
}

type TourAction = "complete" | "skip" | "stop" | null;

interface UseTourOptions {
  onComplete?: () => void;
  onSkip?: () => void;
}

const buildDriverSteps = (
  steps: TourStep[],
  driverRef: React.MutableRefObject<Driver | null>,
  actionRef: React.MutableRefObject<TourAction>
): DriveStep[] =>
  steps.map((step, index) => ({
    element: step.element,
    popover: {
      title: step.title,
      description: step.description,
      side: step.side,
      showButtons: ["previous", "next", "close"],
      onPrevClick: () => {
        driverRef.current?.movePrevious();
      },
      onNextClick: () => {
        const instance = driverRef.current;

        if (!instance) {
          return;
        }

        if (index === steps.length - 1 || instance.isLastStep()) {
          actionRef.current = "complete";
          instance.destroy();
          return;
        }

        instance.moveNext();
      },
      onCloseClick: () => {
        actionRef.current = "skip";
        driverRef.current?.destroy();
      },
    },
  }));

export function useTour(steps: TourStep[], options: UseTourOptions = {}) {
  const { onComplete, onSkip } = options;
  const driverRef = React.useRef<Driver | null>(null);
  const actionRef = React.useRef<TourAction>(null);
  const [isActive, setIsActive] = React.useState(false);

  const configureDriver = React.useCallback(() => {
    if (steps.length === 0) {
      return null;
    }

    const driverSteps = buildDriverSteps(steps, driverRef, actionRef);
    const config = {
      allowClose: true,
      showProgress: true,
      doneBtnText: "Done",
      steps: driverSteps,
      onDestroyed: () => {
        const action = actionRef.current;
        actionRef.current = null;
        setIsActive(false);

        if (action === "complete") {
          onComplete?.();
        }

        if (action === "skip") {
          onSkip?.();
        }
      },
    };

    if (!driverRef.current) {
      driverRef.current = driver(config);
      return driverRef.current;
    }

    driverRef.current.setConfig(config);
    driverRef.current.setSteps(driverSteps);
    return driverRef.current;
  }, [onComplete, onSkip, steps]);

  const start = React.useCallback(() => {
    const instance = configureDriver();

    if (!instance) {
      return;
    }

    actionRef.current = null;
    instance.drive();
    setIsActive(true);
  }, [configureDriver]);

  const stop = React.useCallback(() => {
    const instance = driverRef.current;

    if (!instance) {
      setIsActive(false);
      return;
    }

    actionRef.current = "stop";
    instance.destroy();
    setIsActive(false);
  }, []);

  React.useEffect(() => {
    if (driverRef.current) {
      configureDriver();
    }
  }, [configureDriver]);

  React.useEffect(() => {
    return () => {
      actionRef.current = "stop";
      driverRef.current?.destroy();
      driverRef.current = null;
    };
  }, []);

  return { start, stop, isActive };
}

const Tour = ({ autoStart = false, onComplete, onSkip, steps }: TourProps) => {
  const { start } = useTour(steps, { onComplete, onSkip });
  const hasAutoStartedRef = React.useRef(false);

  React.useEffect(() => {
    if (!autoStart) {
      hasAutoStartedRef.current = false;
      return;
    }

    if (hasAutoStartedRef.current) {
      return;
    }

    hasAutoStartedRef.current = true;
    start();
  }, [autoStart, start]);

  return null;
};

Tour.displayName = "Tour";

export { Tour };
