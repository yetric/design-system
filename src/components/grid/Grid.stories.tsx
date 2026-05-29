import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";
import { Box } from "../box/Box";
import { Text } from "../text/Text";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    cols: { control: { type: "number", min: 1, max: 12 } },
    gap: { control: { type: "number", min: 0, max: 16 } },
    align: { control: "select", options: ["start", "center", "end", "stretch"] },
    justify: { control: "select", options: ["start", "center", "end", "stretch"] },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({ label }: { label: string }) => (
  <Box p="sm" radius="md" style={{ background: "hsl(var(--muted))", textAlign: "center" }}>
    <Text size="body-sm" color="muted">
      {label}
    </Text>
  </Box>
);

export const Responsive: Story = {
  name: "Responsive (1 → 2 → 4 cols)",
  render: () => (
    <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const TwoColumns: Story = {
  args: { cols: 2, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 4 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  args: { cols: 3, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const FourColumns: Story = {
  args: { cols: 4, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const AsymmetricGap: Story = {
  name: "Asymmetric gap (gapX / gapY)",
  render: () => (
    <Grid cols={3} gapX={8} gapY={2}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const AlignStart: Story = {
  name: "Align items — start",
  render: () => (
    <Grid cols={3} gap={4} align="start">
      <Box p="sm" radius="md" style={{ background: "hsl(var(--muted))", height: 80 }}>
        <Text size="body-sm" color="muted">
          Tall
        </Text>
      </Box>
      <Cell label="Short" />
      <Cell label="Short" />
    </Grid>
  ),
};

export const Playground: Story = {
  args: { cols: 3, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: typeof args.cols === "number" ? args.cols : 3 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};
