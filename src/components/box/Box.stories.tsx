import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    p: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    px: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    py: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    m: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    shadow: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    display: {
      control: "select",
      options: [
        "block",
        "inline",
        "inline-block",
        "flex",
        "inline-flex",
        "grid",
        "inline-grid",
        "hidden",
        "contents",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    p: "md",
    children: "A simple box with md padding.",
  },
};

export const WithBackground: Story = {
  args: {
    p: "lg",
    className: "bg-muted rounded-lg",
    children: "Box with background, rounded corners, and lg padding.",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    p: "md",
    className: "bg-card border rounded-lg",
    children: "Rendered as a <section> element.",
  },
};

export const FlexContainer: Story = {
  args: {
    display: "flex",
    px: "md",
    py: "sm",
    className: "gap-4 items-center bg-muted rounded",
    children: (
      <>
        <Box p="sm" className="rounded bg-primary text-sm text-primary-foreground">
          Item 1
        </Box>
        <Box p="sm" className="rounded bg-primary text-sm text-primary-foreground">
          Item 2
        </Box>
        <Box p="sm" className="rounded bg-primary text-sm text-primary-foreground">
          Item 3
        </Box>
      </>
    ),
  },
};

export const ShadowTokens: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      {(["none", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Box key={s} p="md" shadow={s} className="rounded-lg border bg-card text-sm">
          shadow="{s}"
        </Box>
      ))}
    </Box>
  ),
};

export const SpacingTokens: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Box key={size} p={size} className="rounded bg-muted text-sm">
          p="{size}"
        </Box>
      ))}
    </Box>
  ),
};

export const NestedBoxes: Story = {
  render: () => (
    <Box p="lg" className="rounded-lg bg-muted">
      <Box mb="md" className="text-lg font-semibold">
        Outer Box
      </Box>
      <Box display="flex" className="gap-4">
        <Box p="md" className="flex-1 rounded border bg-background">
          Inner 1
        </Box>
        <Box p="md" className="flex-1 rounded border bg-background">
          Inner 2
        </Box>
      </Box>
    </Box>
  ),
};

export const AsArticle: Story = {
  args: {
    as: "article",
    p: "lg",
    className: "bg-card border rounded-lg",
    children: (
      <Box>
        <Box as="h2" mb="sm" className="text-xl font-bold">
          Article Title
        </Box>
        <Box as="p" className="text-muted-foreground">
          Use the <code>as</code> prop to render semantic HTML with design token spacing.
        </Box>
      </Box>
    ),
  },
};
