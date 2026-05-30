import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { AIMessage } from "./AIMessage";

const meta = {
  component: AIMessage,
  title: "Components/AI/AIMessage",
  tags: ["autodocs"],
  args: {
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you today?",
  },
  argTypes: {
    role: { control: "select", options: ["user", "assistant", "system"] },
    isStreaming: { control: "boolean" },
    content: { control: "text" },
  },
} satisfies Meta<typeof AIMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Can you help me write a short bio for my portfolio?",
  },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content:
      "Sure! To write a great bio, I'll need a few details:\n\n1. Your name and current role\n2. Key skills or areas of expertise\n3. A notable achievement\n4. What you're working on or passionate about\n\nShare those and I'll put something together for you.",
  },
};

export const SystemMessage: Story = {
  args: {
    role: "system",
    content: "You joined the conversation.",
  },
};

export const Streaming: Story = {
  args: {
    role: "assistant",
    content: "Let me think about that",
    isStreaming: true,
  },
};

export const WithTimestamp: Story = {
  args: {
    role: "assistant",
    content: "Here's the summary you requested.",
    timestamp: new Date(),
  },
};

export const WithActions: Story = {
  args: {
    role: "assistant",
    content: "Here is my response. Was this helpful?",
    timestamp: new Date(),
    actions: (
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Thumbs up" className="text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors">
          <ThumbsUp className="h-3.5 w-3.5" />
        </button>
        <button type="button" aria-label="Thumbs down" className="text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors">
          <ThumbsDown className="h-3.5 w-3.5" />
        </button>
      </div>
    ),
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <AIMessage role="user" content="What's the difference between TypeScript and JavaScript?" />
      <AIMessage
        role="assistant"
        content="TypeScript is a superset of JavaScript that adds static type checking. The key differences are:\n\n• **Types**: TypeScript lets you annotate variables, parameters, and return values with types.\n• **Compilation**: TypeScript compiles to JavaScript — browsers run JS, not TS.\n• **Tooling**: Better IDE support with autocomplete and error detection before runtime.\n• **Learning curve**: Slightly steeper, but the type safety pays off in larger projects."
        timestamp={new Date(Date.now() - 60_000)}
      />
      <AIMessage
        role="user"
        content="Should I use TypeScript for a small project?"
        timestamp={new Date()}
      />
    </div>
  ),
};
