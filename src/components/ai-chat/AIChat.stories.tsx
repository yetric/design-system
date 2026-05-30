import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bot } from "lucide-react";

import { AIChat } from "./AIChat";
import type { ChatMessage } from "./AIChat";
import { useChat } from "../../hooks/useChat";

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
  args: { messages: sampleMessages },
};

export const Loading: Story = {
  args: { messages: sampleMessages.slice(0, 3), isLoading: true },
};

export const WithSuggestions: Story = {
  args: {
    suggestions: ["Summarise this page", "Write a commit message", "Explain this error", "Improve my writing"],
  },
};

export const WithSystemMessage: Story = {
  args: {
    messages: [{ id: "sys", role: "system", content: "Connected to GPT-4o" }, ...sampleMessages],
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

// ── useChat demo ────────────────────────────────────────────────────────────

async function* fakeStream(prompt: string): AsyncIterable<string> {
  const reply = `Here's a response to: **"${prompt}"**\n\nThis simulates a real streaming response arriving token by token. In production you'd replace this with your AI provider's stream.\n\n\`\`\`ts\nconst { send, messages, isLoading } = useChat({ onRequest });\n\`\`\``;
  for (const word of reply.split(" ")) {
    await new Promise((r) => setTimeout(r, 60));
    yield word + " ";
  }
}

export const WithUseChat: Story = {
  name: "Interactive (useChat + streaming)",
  render: () => {
    const { messages, send, isLoading } = useChat({
      onRequest: async (msgs) => fakeStream(msgs[msgs.length - 1]?.content ?? ""),
    });

    return (
      <AIChat
        title="Demo — useChat hook"
        messages={messages}
        isLoading={isLoading}
        onSend={send}
        suggestions={["Hello!", "Write me a haiku", "Explain async/await"]}
        onSuggestionSelect={send}
        height={520}
      />
    );
  },
};
