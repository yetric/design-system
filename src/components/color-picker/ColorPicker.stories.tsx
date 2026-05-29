import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../stack/Stack";
import { Text } from "../text/Text";
import { ColorPicker } from "./ColorPicker";

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    value: "#3b82f6",
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: function Render() {
    const [color, setColor] = useState("#3b82f6");
    return (
      <Stack gap={4} align="center">
        <ColorPicker value={color} onChange={setColor} />
        <Text size="body-sm" color="muted">
          Selected: <code>{color}</code>
        </Text>
      </Stack>
    );
  },
};

export const CustomSwatches: Story = {
  args: {
    value: "#6366f1",
    swatches: ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#f43f5e", "#fb7185"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const NoSwatches: Story = {
  args: {
    swatches: [],
  },
};
