"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface StreamingTextProps {
  /** Pre-baked string: animates character-by-character at the given speed. */
  text?: string;
  /** Live token stream: appends each chunk as it arrives. */
  stream?: AsyncIterable<string>;
  /** Milliseconds per character when using the `text` prop. Default 30ms. */
  speed?: number;
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

// ── Stream mode ──────────────────────────────────────────────────────────────

interface StreamState {
  prevStream: AsyncIterable<string> | undefined;
  displayed: string;
  done: boolean;
}

// ── Text mode ────────────────────────────────────────────────────────────────

interface TextState {
  prevText: string;
  visibleLength: number;
}

const StreamingText = ({
  text,
  stream,
  speed = 30,
  onComplete,
  className,
  cursor = true,
}: StreamingTextProps) => {
  const onCompleteRef = React.useRef(onComplete);
  const speedRef = React.useRef(speed);
  React.useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
    speedRef.current = speed;
  });

  // ── Stream mode ────────────────────────────────────────────────────────────
  const [streamState, setStreamState] = React.useState<StreamState>({
    prevStream: stream,
    displayed: "",
    done: false,
  });

  // Derived state reset when stream identity changes (avoids setState-in-effect)
  const resolvedStreamState: StreamState =
    streamState.prevStream !== stream
      ? { prevStream: stream, displayed: "", done: false }
      : streamState;

  if (resolvedStreamState !== streamState) {
    setStreamState(resolvedStreamState);
  }

  React.useEffect(() => {
    if (!stream) return;
    let cancelled = false;

    (async () => {
      for await (const token of stream) {
        if (cancelled) break;
        setStreamState((s) => ({ ...s, displayed: s.displayed + token }));
      }
      if (!cancelled) {
        setStreamState((s) => ({ ...s, done: true }));
        onCompleteRef.current?.();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stream]);

  // ── Text mode ──────────────────────────────────────────────────────────────
  const [textState, setTextState] = React.useState<TextState>({
    prevText: text ?? "",
    visibleLength: 0,
  });

  const resolvedText = text ?? "";
  const resolvedTextState: TextState =
    textState.prevText !== resolvedText ? { prevText: resolvedText, visibleLength: 0 } : textState;

  if (resolvedTextState !== textState) {
    setTextState(resolvedTextState);
  }

  React.useEffect(() => {
    if (stream) return;

    const t = text ?? "";
    if (t.length === 0) {
      onCompleteRef.current?.();
      return;
    }

    const id = window.setInterval(() => {
      setTextState((s) => {
        if (s.visibleLength >= t.length) {
          window.clearInterval(id);
          return s;
        }
        const next = s.visibleLength + 1;
        if (next >= t.length) {
          window.clearInterval(id);
          onCompleteRef.current?.();
          return { ...s, visibleLength: t.length };
        }
        return { ...s, visibleLength: next };
      });
    }, speedRef.current);

    return () => window.clearInterval(id);
  }, [text, stream]); // speed intentionally omitted — changing speed mid-stream should not restart the interval

  // ── Render ─────────────────────────────────────────────────────────────────
  const content = stream
    ? resolvedStreamState.displayed
    : resolvedText.slice(0, resolvedTextState.visibleLength);

  return (
    <span className={cn("inline whitespace-pre-wrap", className)}>
      {content}
      {cursor && (
        <span data-testid="streaming-text-cursor" aria-hidden="true" className="animate-pulse">
          |
        </span>
      )}
    </span>
  );
};

StreamingText.displayName = "StreamingText";

export { StreamingText };
