import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    p: 4,
    children: "A simple box with p-4 padding.",
  },
};

export const WithBackground: Story = {
  args: {
    p: 6,
    className: "bg-muted rounded-lg",
    children: "Box with background, rounded corners, and p-6.",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    p: 4,
    className: "bg-card border rounded-lg",
    children: "Rendered as a <section> element.",
  },
};

export const FlexContainer: Story = {
  args: {
    display: "flex",
    px: 4,
    py: 2,
    className: "gap-4 items-center bg-muted rounded",
    children: (
      <>
        <Box p={2} className="bg-primary text-primary-foreground rounded text-sm">Item 1</Box>
        <Box p={2} className="bg-primary text-primary-foreground rounded text-sm">Item 2</Box>
        <Box p={2} className="bg-primary text-primary-foreground rounded text-sm">Item 3</Box>
      </>
    ),
  },
};

export const SpacingShowcase: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-col">
      <Box p={2} className="bg-muted rounded text-sm">p=2</Box>
      <Box p={4} className="bg-muted rounded text-sm">p=4</Box>
      <Box p={6} className="bg-muted rounded text-sm">p=6</Box>
      <Box px={8} py={2} className="bg-muted rounded text-sm">px=8, py=2</Box>
      <Box pt={4} pr={8} pb={2} pl={6} className="bg-muted rounded text-sm">pt=4 pr=8 pb=2 pl=6</Box>
    </Box>
  ),
};

export const NestedBoxes: Story = {
  render: () => (
    <Box p={6} className="bg-muted rounded-lg">
      <Box mb={4} className="text-lg font-semibold">Outer Box</Box>
      <Box display="flex" className="gap-4">
        <Box p={4} className="flex-1 bg-background border rounded">Inner 1</Box>
        <Box p={4} className="flex-1 bg-background border rounded">Inner 2</Box>
      </Box>
    </Box>
  ),
};

export const AsArticle: Story = {
  args: {
    as: "article",
    p: 6,
    className: "prose max-w-none bg-card border rounded-lg",
    children: (
      <Box>
        <Box as="h2" mb={2} className="text-xl font-bold">Article Title</Box>
        <Box as="p" className="text-muted-foreground">
          Box renders as semantic HTML by default. Use the <code>as</code> prop to change
          the underlying element without losing styling utilities.
        </Box>
      </Box>
    ),
  },
};
