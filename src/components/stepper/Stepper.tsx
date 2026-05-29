"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

export type StepStatus = "upcoming" | "current" | "completed";

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const stepperSizeClass: Record<
  Size,
  { circle: string; line: string; title: string; desc: string }
> = {
  xs: { circle: "h-5 w-5 text-xs", line: "h-px w-6", title: "text-xs", desc: "text-[10px]" },
  sm: { circle: "h-6 w-6 text-xs", line: "h-px w-8", title: "text-xs", desc: "text-xs" },
  md: { circle: "h-8 w-8 text-sm", line: "h-px w-12", title: "text-sm", desc: "text-xs" },
  lg: { circle: "h-9 w-9 text-sm", line: "h-px w-14", title: "text-sm", desc: "text-sm" },
  xl: { circle: "h-10 w-10 text-base", line: "h-px w-16", title: "text-base", desc: "text-sm" },
};

export interface StepperProps {
  steps: StepItem[];
  /** Zero-based index of the current active step */
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  size?: Size;
  className?: string;
}

function getStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return "completed";
  if (index === activeStep) return "current";
  return "upcoming";
}

function Stepper({
  steps,
  activeStep = 0,
  orientation = "horizontal",
  size = "md",
  className,
}: StepperProps) {
  const sz = stepperSizeClass[size];
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      aria-label="Progress"
      className={cn(isHorizontal ? "flex items-start gap-0" : "flex flex-col gap-0", className)}
    >
      {steps.map((step, index) => {
        const status = getStatus(index, activeStep);
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div
              className={cn(
                "flex",
                isHorizontal ? "flex-col items-center" : "flex-row items-start gap-3"
              )}
            >
              {/* Circle */}
              <div
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                  sz.circle,
                  status === "completed" && "border-primary bg-primary text-primary-foreground",
                  status === "current" && "border-primary bg-background text-primary",
                  status === "upcoming" && "border-border bg-background text-muted-foreground"
                )}
              >
                {status === "completed" ? (
                  <Check className="h-[55%] w-[55%]" aria-hidden="true" />
                ) : (
                  (step.icon ?? <span>{index + 1}</span>)
                )}
              </div>

              {/* Label — below circle (horizontal) or beside (vertical) */}
              <div className={cn(isHorizontal ? "mt-2 max-w-[6rem] text-center" : "pb-6")}>
                <p
                  className={cn(
                    "leading-none font-medium",
                    sz.title,
                    status === "current" && "text-foreground",
                    status === "completed" && "text-foreground",
                    status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className={cn("text-muted-foreground mt-0.5", sz.desc)}>{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  isHorizontal
                    ? cn("bg-border mt-4 flex-1 self-start", "h-0.5 min-w-4")
                    : cn("bg-border ml-4 min-h-4 w-0.5 self-start", sz.line),
                  status === "completed" && "bg-primary"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export { Stepper };
