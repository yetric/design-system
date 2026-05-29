"use client";

import * as React from "react";
import { Bot, SendHorizontal, Sparkles } from "lucide-react";

import { cn } from "../../lib/cn";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
}

export interface AIChatProps {
  messages?: ChatMessage[];
  onSend?: (message: string) => void | Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  title?: string;
  emptyState?: React.ReactNode;
  className?: string;
  height?: string | number;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

interface ThinkingIndicatorProps {
  className?: string;
}

interface PromptComposerProps {
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
}

const formatTimestamp = (timestamp?: Date) => {
  if (!timestamp) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.role === "system") {
    return (
      <div className="flex justify-center px-4">
        <div className="text-muted-foreground max-w-xl text-center text-sm italic">
          {message.content}
        </div>
      </div>
    );
  }

  const isUser = message.role === "user";
  const timestamp = formatTimestamp(message.timestamp);

  return (
    <div className={cn("flex px-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "border-border bg-muted text-foreground rounded-bl-md border",
          message.isStreaming && "animate-pulse"
        )}
      >
        <p className="break-words whitespace-pre-wrap">{message.content}</p>
        {timestamp && (
          <div
            className={cn(
              "mt-2 text-[11px]",
              isUser ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

const ThinkingIndicator = ({ className }: ThinkingIndicatorProps) => {
  return (
    <div className={cn("flex px-4", className)}>
      <div
        role="status"
        aria-label="Assistant is thinking"
        className="border-border bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-2xl rounded-bl-md border px-4 py-3 shadow-sm"
      >
        <span className="sr-only">Assistant is thinking</span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
      </div>
    </div>
  );
};

const PromptComposer = ({
  value,
  placeholder,
  disabled,
  onChange,
  onSubmit,
}: PromptComposerProps) => {
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    await onSubmit();
  };

  return (
    <div className="border-border bg-background rounded-2xl border p-3 shadow-sm">
      <div className="flex items-end gap-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "text-foreground max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none",
            "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        <button
          type="button"
          onClick={() => void onSubmit()}
          disabled={disabled || !value.trim()}
          className={cn(
            "bg-primary text-primary-foreground inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !disabled && value.trim() && "hover:bg-primary/90"
          )}
          aria-label="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const defaultEmptyState = (
  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
    <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
      <Sparkles className="h-6 w-6" />
    </div>
    <h3 className="text-foreground text-lg font-semibold">Start a conversation</h3>
    <p className="text-muted-foreground mt-2 max-w-sm text-sm">
      Ask a question, provide context, or use a suggestion to begin chatting with your AI.
    </p>
  </div>
);

const AIChat = React.forwardRef<HTMLDivElement, AIChatProps>(
  (
    {
      messages = [],
      onSend,
      isLoading = false,
      placeholder = "Ask anything…",
      title,
      emptyState,
      className,
      height = "600px",
      suggestions = [],
      onSuggestionSelect,
    },
    ref
  ) => {
    const [draft, setDraft] = React.useState("");
    const endRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, isLoading]);

    const handleSend = React.useCallback(async () => {
      const message = draft.trim();
      if (!message || isLoading) {
        return;
      }

      setDraft("");
      await onSend?.(message);
    }, [draft, isLoading, onSend]);

    return (
      <div
        ref={ref}
        className={cn(
          "border-border bg-background text-foreground flex w-full flex-col overflow-hidden rounded-2xl border shadow-sm",
          className
        )}
        style={{ height }}
      >
        {title && (
          <div className="border-border flex items-center gap-3 border-b px-4 py-3">
            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full">
              <Bot className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">{title}</h2>
            </div>
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto py-4">
            {messages.length === 0 ? (
              (emptyState ?? defaultEmptyState)
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && <ThinkingIndicator />}
                <div ref={endRef} aria-hidden="true" />
              </div>
            )}
            {messages.length === 0 && isLoading && (
              <div className="mt-4">
                <ThinkingIndicator />
                <div ref={endRef} aria-hidden="true" />
              </div>
            )}
            {messages.length === 0 && !isLoading && <div ref={endRef} aria-hidden="true" />}
          </div>

          <div className="border-border border-t px-4 py-4">
            {suggestions.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2" aria-label="Suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSuggestionSelect?.(suggestion)}
                    className={cn(
                      "border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <PromptComposer
              value={draft}
              placeholder={placeholder}
              disabled={isLoading}
              onChange={setDraft}
              onSubmit={handleSend}
            />
          </div>
        </div>
      </div>
    );
  }
);

AIChat.displayName = "AIChat";

export { AIChat };
