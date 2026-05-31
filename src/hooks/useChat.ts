import * as React from "react";
import type { ChatMessage } from "../components/ai-chat/AIChat";

export type ChatResponseStream = AsyncIterable<string>;
export type ChatResponse = string | ChatResponseStream;

export interface UseChatOptions {
  /** Called with the current message history; return a string or an AsyncIterable of tokens. */
  onRequest: (messages: ChatMessage[]) => Promise<ChatResponse>;
  initialMessages?: ChatMessage[];
}

export interface UseChatReturn {
  messages: ChatMessage[];
  send: (text: string) => Promise<void>;
  clear: () => void;
  isLoading: boolean;
  error: Error | null;
  stop: () => void;
}

export function useChat({ onRequest, initialMessages = [] }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const abortRef = React.useRef(false);

  const stop = React.useCallback(() => {
    abortRef.current = true;
  }, []);

  const clear = React.useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const send = React.useCallback(
    async (text: string) => {
      if (isLoading) return;

      abortRef.current = false;
      setError(null);

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      const nextMessages = [...messages, userMsg];
      setMessages([...nextMessages, assistantMsg]);
      setIsLoading(true);

      try {
        const response = await onRequest(nextMessages);

        if (typeof response === "string") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: response, isStreaming: false } : m
            )
          );
        } else {
          // AsyncIterable — consume tokens one by one
          for await (const token of response) {
            if (abortRef.current) break;
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + token } : m))
            );
          }
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, isStreaming: false } : m))
          );
        }
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, onRequest]
  );

  return { messages, send, clear, isLoading, error, stop };
}
