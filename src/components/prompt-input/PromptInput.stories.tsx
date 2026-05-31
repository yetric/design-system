import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Paperclip, Smile } from "lucide-react";

import { PromptInput } from "./PromptInput";

const meta = {
  component: PromptInput,
  title: "Components/AI/PromptInput",
  tags: ["autodocs"],
  args: {
    placeholder: "Ask anything…",
    disabled: false,
    loading: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    placeholder: { control: "text" },
    maxRows: { control: { type: "number", min: 1, max: 20 } },
  },
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
    value: "What is the capital of France?",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Chat is disabled",
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Attach file"
          className="text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Add emoji"
          className="text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
        >
          <Smile className="h-4 w-4" />
        </button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [submitted, setSubmitted] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (text: string) => {
      setLoading(true);
      setSubmitted((prev) => [text, ...prev]);
      setValue("");
      setTimeout(() => setLoading(false), 1500);
    };

    return (
      <div className="space-y-4">
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          loading={loading}
          placeholder="Type a message and press Enter…"
        />
        {submitted.length > 0 && (
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Submitted
            </p>
            {submitted.map((text, i) => (
              <div key={i} className="bg-muted rounded px-3 py-2 text-sm">
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
