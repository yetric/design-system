import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StreamingText } from "./StreamingText";

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
  args: {
    speed: 10,
    text: "This text streams in very quickly.",
  },
};

export const Slow: Story = {
  args: {
    speed: 100,
    text: "This text streams in slowly, one character at a time.",
  },
};

export const NoCursor: Story = {
  args: {
    cursor: false,
    text: "No blinking cursor at the end.",
  },
};

export const LongResponse: Story = {
  args: {
    speed: 15,
    text: "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. Instead of opinionated prebuilt components, Tailwind provides low-level utility classes that let you build completely custom designs.",
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

    const next = () => {
      setIndex((i) => (i + 1) % sentences.length);
      setKey((k) => k + 1);
    };

    return (
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4 text-sm">
          <StreamingText key={key} text={sentences[index]} speed={40} onComplete={() => {}} />
        </div>
        <button
          type="button"
          onClick={next}
          className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
        >
          Next sentence
        </button>
      </div>
    );
  },
};
