import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Bot } from "lucide-react";

import { AIChat } from "./AIChat";
import type { ChatMessage } from "./AIChat";

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "What can you help me with?",
    timestamp: new Date(Date.now() - 120_000),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "I can help with a wide range of tasks:\n\n• Writing and editing\n• Answering questions\n• Code review and debugging\n• Summarising documents\n• Brainstorming ideas\n\nWhat would you like to work on?",
    timestamp: new Date(Date.now() - 90_000),
  },
  {
    id: "3",
    role: "user",
    content: "Can you help me write a commit message?",
    timestamp: new Date(Date.now() - 60_000),
  },
  {
    id: "4",
    role: "assistant",
    content: "Of course! Share the diff or describe the changes and I'll suggest a message.",
    timestamp: new Date(Date.now() - 30_000),
  },
];

const meta = {
  component: AIChat,
  title: "Components/AI/AIChat",
  tags: ["autodocs"],
  args: {
    title: "AI Assistant",
    placeholder: "Ask anything…",
    isLoading: false,
    height: 500,
  },
  argTypes: {
    isLoading: { control: "boolean" },
    placeholder: { control: "text" },
    title: { control: "text" },
    height: { control: { type: "number", min: 300, max: 900, step: 50 } },
  },
} satisfies Meta<typeof AIChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithMessages: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const Loading: Story = {
  args: {
    messages: sampleMessages.slice(0, 3),
    isLoading: true,
  },
};

export const WithSuggestions: Story = {
  args: {
    suggestions: [
      "Summarise this page",
      "Write a commit message",
      "Explain this error",
      "Improve my writing",
    ],
  },
};

export const WithSystemMessage: Story = {
  args: {
    messages: [
      { id: "sys", role: "system", content: "Connected to GPT-4o" },
      ...sampleMessages,
    ],
  },
};

export const NoTitle: Story = {
  args: {
    messages: sampleMessages,
    title: undefined,
  },
};

export const CustomEmptyState: Story = {
  args: {
    emptyState: (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-6">
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
          <Bot className="text-muted-foreground h-5 w-5" />
        </div>
        <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (text: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1200));

      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `You said: "${text}"\n\nThis is a simulated response. In a real app, this would come from your AI backend.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    };

    return (
      <AIChat
        title="Demo Chat"
        messages={messages}
        isLoading={loading}
        onSend={handleSend}
        suggestions={["Hello!", "What can you do?", "Tell me a fun fact"]}
        onSuggestionSelect={handleSend}
        height={520}
      />
    );
  },
};
