import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../stack/Stack";
import { VideoPlayer } from "./VideoPlayer";

const demoSources = [
  {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    type: "video/webm",
  },
  {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    type: "video/mp4",
  },
];

const meta = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
  args: {
    src: demoSources,
    title: "Flower field demo",
    poster: "https://interactive-examples.mdn.mozilla.net/media/examples/friday.jpg",
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ratios: Story = {
  render: (args) => (
    <Stack gap={4} style={{ width: 360 }}>
      <VideoPlayer {...args} aspectRatio="16/9" />
      <VideoPlayer {...args} aspectRatio="1/1" />
      <VideoPlayer {...args} aspectRatio="9/16" />
    </Stack>
  ),
};
