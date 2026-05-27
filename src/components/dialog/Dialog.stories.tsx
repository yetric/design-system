import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./Dialog";

const meta = {
  component: Dialog,
  tags: ["ai-generated", "needs-work"]
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>This validates Radix-based dialog composition.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open" }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole("dialog")).toBeVisible();
    await expect(body.getByText("Confirm action")).toBeVisible();
  }
};

export const InitiallyOpen: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Release notes</DialogTitle>
          <DialogDescription>Version details are ready for review.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export const WithCustomFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive project</DialogTitle>
          <DialogDescription>This action moves the project out of active lists.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Keep project</Button>
          <Button variant="danger">Archive</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
