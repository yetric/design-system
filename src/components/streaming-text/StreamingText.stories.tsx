import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StreamingText } from "./StreamingText";

async function* tokenize(text: string, delayMs = 40): AsyncIterable<string> {
  const words = text.split(" ");
  for (const word of words) {
    await new Promise((r) => setTimeout(r, delayMs));
    yield word + " ";
  }
}

const meta = {
  component: StreamingText,
  title: "Components/AI/StreamingText",
  tags: ["autodocs"],
  args: {
    text: "Hello! I'm an AI assistant. How can I help you today?",
    speed: 30,
    cursor: true,
  },
  argTypes: {
    speed: { control: { type: "range", min: 5, max: 200, step: 5 } },
    cursor: { control: "boolean" },
    text: { control: "text" },
  },
} satisfies Meta<typeof StreamingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fast: Story = {
  args: { speed: 10, text: "This text streams in very quickly." },
};

export const Slow: Story = {
  args: { speed: 100, text: "This text streams in slowly, one character at a time." },
};

export const NoCursor: Story = {
  args: { cursor: false, text: "No blinking cursor at the end." },
};

export const LiveStream: Story = {
  render: () => {
    const [stream, setStream] = useState<AsyncIterable<string> | undefined>(undefined);
    const [done, setDone] = useState(false);

    const start = () => {
      setDone(false);
      setStream(
        tokenize(
          "This token stream simulates a real AI response arriving word by word from the server.",
          80
        )
      );
    };

    return (
      <div className="space-y-4">
        <div className="bg-muted min-h-[3rem] rounded-lg p-4 text-sm">
          {stream ? (
            <StreamingText stream={stream} onComplete={() => setDone(true)} />
          ) : (
            <span className="text-muted-foreground">Press start to stream</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={start}
            className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
          >
            {stream ? "Restart" : "Start stream"}
          </button>
          {done && <span className="text-muted-foreground text-sm">Complete ✓</span>}
        </div>
      </div>
    );
  },
};

export const Replay: Story = {
  render: () => {
    const sentences = [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "How vexingly quick daft zebras jump!",
    ];
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0);

    return (
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4 text-sm">
          <StreamingText key={key} text={sentences[index]} speed={40} />
        </div>
        <button
          type="button"
          onClick={() => { setIndex((i) => (i + 1) % sentences.length); setKey((k) => k + 1); }}
          className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
        >
          Next
        </button>
      </div>
    );
  },
};
