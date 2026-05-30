"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface StreamingTextProps {
  /** Pre-baked string: animates character-by-character at the given speed. */
  text?: string;
  /** Live token stream: appends each chunk as it arrives. */
  stream?: AsyncIterable<string>;
  /** Characters per second when using the `text` prop. Default 30ms/char. */
  speed?: number;
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

const StreamingText = ({
  text,
  stream,
  speed = 30,
  onComplete,
  className,
  cursor = true,
}: StreamingTextProps) => {
  const [displayed, setDisplayed] = React.useState("");
  const [done, setDone] = React.useState(false);
  const onCompleteRef = React.useRef(onComplete);

  React.useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // ── Stream mode ────────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!stream) return;

    let cancelled = false;
    setDisplayed("");
    setDone(false);

    (async () => {
      for await (const token of stream) {
        if (cancelled) break;
        setDisplayed((prev) => prev + token);
      }
      if (!cancelled) {
        setDone(true);
        onCompleteRef.current?.();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stream]);

  // ── Text mode ──────────────────────────────────────────────────────────────
  const [textState, setTextState] = React.useState({ prevText: text ?? "", visibleLength: 0 });

  if (!stream) {
    const t = text ?? "";
    if (textState.prevText !== t) {
      setTextState({ prevText: t, visibleLength: 0 });
    }
  }

  React.useEffect(() => {
    if (stream || !text) return;

    setDone(false);
    if (text.length === 0) {
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    const id = window.setInterval(() => {
      setTextState((s) => {
        const next = s.visibleLength + 1;
        if (next >= text.length) {
          window.clearInterval(id);
          setDone(true);
          onCompleteRef.current?.();
          return { ...s, visibleLength: text.length };
        }
        return { ...s, visibleLength: next };
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed, stream]);

  const content = stream ? displayed : (text ?? "").slice(0, textState.visibleLength);
  const isComplete = stream ? done : textState.visibleLength >= (text ?? "").length;

  return (
    <span className={cn("inline whitespace-pre-wrap", className)}>
      {content}
      {cursor && !isComplete && (
        <span data-testid="streaming-text-cursor" aria-hidden="true" className="animate-pulse">
          |
        </span>
      )}
    </span>
  );
};

StreamingText.displayName = "StreamingText";

export { StreamingText };
