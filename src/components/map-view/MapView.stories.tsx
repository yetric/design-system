import type { Meta, StoryObj } from "@storybook/react-vite";

import { MapView } from "./MapView";

const markers = [
  {
    id: "stockholm",
    lat: 59.3293,
    lng: 18.0686,
    title: "Stockholm",
    description: "Yetric headquarters",
  },
  {
    id: "uppsala",
    lat: 59.8586,
    lng: 17.6389,
    title: "Uppsala",
    description: "Customer location",
  },
];

const meta = {
  title: "Components/MapView",
  component: MapView,
  tags: ["autodocs"],
} satisfies Meta<typeof MapView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    center: [59.3293, 18.0686],
    zoom: 10,
    markers,
  },
};

export const CustomHeight: Story = {
  args: {
    center: [59.3293, 18.0686],
    zoom: 8,
    height: 500,
    markers,
  },
};
