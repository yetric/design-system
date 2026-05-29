import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/Button";
import { Stack } from "./Stack";

const meta = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["row", "column", "row-reverse", "column-reverse"] },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack>
      <Button>First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="outline">Third</Button>
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={2}>
      <Button size="sm">Save</Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </Stack>
  ),
};

export const Nested: Story = {
  render: () => (
    <Stack gap={6}>
      <Stack direction="row" justify="between" align="center">
        <span className="font-semibold">Title</span>
        <Button size="sm">Action</Button>
      </Stack>
      <Stack gap={2}>
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </Stack>
    </Stack>
  ),
};
