import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../stack/Stack";
import { Text } from "../text/Text";
import { Image } from "./Image";

const src =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop";

const meta = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    src,
    alt: "Mountain landscape",
    className: "w-80",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFallback: Story = {
  args: {
    src: "https://example.com/broken-image.png",
    fallback: "ML",
  },
};

export const AspectRatios: Story = {
  render: () => (
    <Stack direction="row" gap={4} wrap="wrap">
      <Stack gap={2}>
        <Text size="body-sm">Square</Text>
        <Image src={src} alt="Square crop" aspectRatio="square" className="w-48" />
      </Stack>
      <Stack gap={2}>
        <Text size="body-sm">Video</Text>
        <Image src={src} alt="Video crop" aspectRatio="video" className="w-64" />
      </Stack>
      <Stack gap={2}>
        <Text size="body-sm">Auto</Text>
        <Image src={src} alt="Auto crop" aspectRatio="auto" className="w-48" />
      </Stack>
    </Stack>
  ),
};

export const Rounded: Story = {
  args: {
    radius: "xl",
  },
};

export const ObjectFit: Story = {
  render: () => (
    <Stack direction="row" gap={4} wrap="wrap">
      <Image src={src} alt="Cover fit" fit="cover" aspectRatio="square" className="w-48" />
      <Image
        src={src}
        alt="Contain fit"
        fit="contain"
        aspectRatio="square"
        className="bg-card w-48"
      />
      <Image src={src} alt="Fill fit" fit="fill" aspectRatio="square" className="w-48" />
    </Stack>
  ),
};
