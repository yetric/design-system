import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading, Text } from "./Text";

const meta = {
  title: "Components/Typography",
  component: Heading,
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading size="display">Display — The quick brown fox</Heading>
      <Heading size="h1">Heading 1 — The quick brown fox</Heading>
      <Heading size="h2">Heading 2 — The quick brown fox</Heading>
      <Heading size="h3">Heading 3 — The quick brown fox</Heading>
      <Heading size="h4">Heading 4 — The quick brown fox</Heading>
    </div>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text size="body-lg">body-lg — The quick brown fox jumps over the lazy dog.</Text>
      <Text size="body">body — The quick brown fox jumps over the lazy dog.</Text>
      <Text size="body-sm">body-sm — The quick brown fox jumps over the lazy dog.</Text>
      <Text size="caption" color="muted">caption — The quick brown fox jumps over the lazy dog.</Text>
      <Text size="label">label — Form field label</Text>
    </div>
  ),
};

export const TextWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="primary">Primary color</Text>
      <Text color="destructive">Destructive color</Text>
    </div>
  ),
};
