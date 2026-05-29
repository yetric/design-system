"use client";

import * as React from "react";
import { Bot } from "lucide-react";

import { cn } from "../../lib/cn";

export type MessageRole = "user" | "assistant" | "system";

export interface AIMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
  avatar?: string;
  isStreaming?: boolean;
  className?: string;
  actions?: React.ReactNode;
}

const timestampFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const AIMessage = ({
  role,
  content,
  timestamp,
  avatar,
  isStreaming = false,
  className,
  actions,
}: AIMessageProps) => {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const isSystem = role === "system";

  if (isSystem) {
    return (
      <div data-testid="ai-message" className={cn("flex justify-center", className)}>
        <div className="max-w-2xl rounded-full bg-muted px-4 py-2 text-center text-sm italic text-muted-foreground">
          <span className="whitespace-pre-wrap">{content}</span>
          {isStreaming && (
            <span data-testid="ai-message-cursor" aria-hidden="true" className="animate-pulse">
              |
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="ai-message"
      className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start", className)}
    >
      {isAssistant && (
        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {avatar ? (
            <img
              src={avatar}
              alt="Assistant avatar"
              className="size-full rounded-full object-cover"
            />
          ) : (
            <Bot className="size-4" aria-hidden="true" />
          )}
        </div>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm shadow-sm",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          )}
        >
          <span className="whitespace-pre-wrap">{content}</span>
          {isStreaming && (
            <span data-testid="ai-message-cursor" aria-hidden="true" className="animate-pulse">
              |
            </span>
          )}
        </div>
        {(timestamp || actions) && (
          <div
            className={cn(
              "flex items-center gap-2 text-xs text-muted-foreground",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            {timestamp && <span>{timestampFormatter.format(timestamp)}</span>}
            {actions}
          </div>
        )}
      </div>
      {isUser && avatar && (
        <img
          src={avatar}
          alt="User avatar"
          className="mt-1 size-8 shrink-0 rounded-full object-cover"
        />
      )}
    </div>
  );
};

AIMessage.displayName = "AIMessage";

export { AIMessage };
