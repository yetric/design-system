import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/Button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

const meta = {
  component: Drawer,
  tags: ["autodocs"],
  title: "Components/Drawer",
  argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open right drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="md">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Adjust your preferences below.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">Drawer body content goes here.</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
          <Button className="w-full">Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open left drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left" size="md">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-sm hover:underline">Dashboard</a>
            <a href="#" className="text-sm hover:underline">Projects</a>
            <a href="#" className="text-sm hover:underline">Settings</a>
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open bottom sheet</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom" size="md">
        <DrawerHeader>
          <DrawerTitle>Share post</DrawerTitle>
          <DrawerDescription>Choose where to share this post.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex gap-4 justify-center py-4">
            <Button variant="outline" size="sm">Twitter</Button>
            <Button variant="outline" size="sm">LinkedIn</Button>
            <Button variant="outline" size="sm">Copy link</Button>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Drawer key={size}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">{size}</Button>
          </DrawerTrigger>
          <DrawerContent side="right" size={size}>
            <DrawerHeader>
              <DrawerTitle>Size: {size}</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground">Width controlled by size=&quot;{size}&quot;.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};
