import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./Card";
import { Button } from "../button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card
};

export default meta;
type Story = StoryObj<typeof Card>;

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
  )
};
