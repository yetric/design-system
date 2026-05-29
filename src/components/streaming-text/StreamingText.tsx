"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

const StreamingText = ({
  text,
  speed = 30,
  onComplete,
  className,
  cursor = true,
}: StreamingTextProps) => {
  const [state, setState] = React.useState({ prevText: text, visibleLength: 0 });
  const onCompleteRef = React.useRef(onComplete);
  const isCompleteRef = React.useRef(false);

  // Keep ref in sync with latest prop without triggering effects
  React.useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Reset visibleLength during render when text changes (derived state pattern)
  if (state.prevText !== text) {
    setState({ prevText: text, visibleLength: 0 });
  }

  const visibleLength = state.prevText !== text ? 0 : state.visibleLength;
  const isComplete = visibleLength >= text.length;

  React.useEffect(() => {
    isCompleteRef.current = false;

    if (text.length === 0) {
      isCompleteRef.current = true;
      onCompleteRef.current?.();
      return;
    }

    const intervalId = window.setInterval(() => {
      setState((s) => {
        const nextLength = s.visibleLength + 1;
        if (nextLength >= text.length) {
          window.clearInterval(intervalId);
          if (!isCompleteRef.current) {
            isCompleteRef.current = true;
            onCompleteRef.current?.();
          }
          return { ...s, visibleLength: text.length };
        }
        return { ...s, visibleLength: nextLength };
      });
    }, speed);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [text, speed]);

  return (
    <span className={cn("inline whitespace-pre-wrap", className)}>
      {text.slice(0, visibleLength)}
      {cursor && (visibleLength < text.length || isComplete) && (
        <span data-testid="streaming-text-cursor" aria-hidden="true" className="animate-pulse">
          |
        </span>
      )}
    </span>
  );
};

StreamingText.displayName = "StreamingText";

export { StreamingText };
