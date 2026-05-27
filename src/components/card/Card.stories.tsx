import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./Card";
import { Button } from "../button";

const meta = {
  component: Card,
  tags: ["ai-generated"]
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Project setup</CardTitle>
        <CardDescription>Build a reusable UI foundation.</CardDescription>
      </CardHeader>
      <CardContent>Use this card to group related UI content.</CardContent>
      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Project setup" })).toBeVisible();
  }
};

export const WithActions: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Billing plan</CardTitle>
        <CardDescription>Review usage before changing tiers.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Current tier: Team</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {(["none", "xs", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <Card key={r} radius={r} className="px-4 py-3">
          <CardTitle className="text-sm">{r}</CardTitle>
        </Card>
      ))}
    </div>
  )
};

export const Compact: Story = {
  render: () => (
    <Card className="max-w-sm p-4">
      <CardTitle className="text-lg">Status</CardTitle>
      <CardDescription>All systems operational.</CardDescription>
    </Card>
  )
};
