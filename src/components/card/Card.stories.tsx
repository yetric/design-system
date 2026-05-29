import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontal, ArrowRight, Star, Bell } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "./Card";
import { Button } from "../button";
import { Badge } from "../badge";

const meta = {
  component: Card,
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outlined", "filled", "ghost"] },
    interactive: { control: "boolean" },
    shadow: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl", "full"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
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
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-4">
      {(["default", "outlined", "ghost", "elevated"] as const).map((v) => (
        <Card key={v} variant={v}>
          <CardHeader>
            <CardTitle>{v}</CardTitle>
            <CardDescription>variant="{v}"</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Card body content.</CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-4">
      <Card interactive tabIndex={0}>
        <CardHeader>
          <CardTitle>Hover me</CardTitle>
          <CardDescription>interactive card lifts on hover</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Click or tab to focus.</CardContent>
      </Card>
      <Card interactive variant="outlined" tabIndex={0}>
        <CardHeader>
          <CardTitle>Outlined + interactive</CardTitle>
          <CardDescription>Two variants combined</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Hover to see lift effect.
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="max-w-sm overflow-hidden">
      <CardImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        alt="Mountain landscape"
      />
      <CardHeader>
        <CardTitle>Mountain escape</CardTitle>
        <CardDescription>A tranquil retreat above the clouds.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Discover remote trails and breathtaking vistas perfect for the weekend adventurer.
      </CardContent>
      <CardFooter>
        <Button rightIcon={<ArrowRight />}>Explore</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithHeaderActions: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader
        actions={
          <Button size="icon" variant="ghost" aria-label="More options">
            <MoreHorizontal />
          </Button>
        }
      >
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Recent activity on your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>🔔 New comment on your post</p>
        <p>⭐ Someone starred your repo</p>
        <p>🚀 Deployment succeeded</p>
      </CardContent>
    </Card>
  ),
};

export const FooterJustify: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>justify="start"</CardTitle>
        </CardHeader>
        <CardFooter justify="start">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>justify="end"</CardTitle>
        </CardHeader>
        <CardFooter justify="end">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>justify="between"</CardTitle>
        </CardHeader>
        <CardFooter justify="between">
          <Button variant="ghost">Skip</Button>
          <Button>Next</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const ProfileCard: Story = {
  name: "Real-world — profile",
  render: () => (
    <Card className="max-w-xs" interactive tabIndex={0}>
      <CardImage
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
        alt="User avatar"
        aspectClass="aspect-square"
      />
      <CardHeader actions={<Badge variant="success">Pro</Badge>}>
        <CardTitle as="h2">Sofia Hernandez</CardTitle>
        <CardDescription>Product Designer · Berlin</CardDescription>
      </CardHeader>
      <CardFooter justify="between">
        <Button size="sm" variant="outline" leftIcon={<Bell />}>
          Follow
        </Button>
        <Button size="sm" leftIcon={<Star />}>
          Sponsor
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  name: "Real-world — stat",
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {[
        { label: "Total revenue", value: "$45,231", delta: "+20.1%" },
        { label: "Active users", value: "2,350", delta: "+180.1%" },
        { label: "New signups", value: "+12,234", delta: "+19%" },
      ].map(({ label, value, delta }) => (
        <Card key={label} variant="outlined">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle as="h4" className="text-2xl">
              {value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success" size="xs">
              {delta} from last month
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-6 rounded-xl bg-muted/30 p-4">
      {(["none", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Card key={s} shadow={s} className="p-4">
          <CardTitle className="text-sm">shadow="{s}"</CardTitle>
        </Card>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      {(["none", "xs", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <Card key={r} radius={r} className="px-4 py-3">
          <CardTitle className="text-sm">radius="{r}"</CardTitle>
        </Card>
      ))}
    </div>
  ),
};

export const HeadingLevels: Story = {
  name: "CardTitle — heading levels",
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle as="h1">h1 — Page title</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle as="h2">h2 — Section title</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle as="h3">h3 — Default</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle as="h4">h4 — Subsection</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        All same visual style, different semantic levels via the <code>as</code> prop.
      </CardContent>
    </Card>
  ),
};
