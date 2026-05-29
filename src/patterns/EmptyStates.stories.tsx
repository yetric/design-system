import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderOpen, PackageSearch, Plus, ShieldOff, WifiOff } from "lucide-react";

import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Grid } from "../components/grid/Grid";
import { Paper } from "../components/paper/Paper";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Empty States",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; variant?: "primary" | "outline" | "ghost" };
}) {
  return (
    <Paper
      radius="xl"
      p={0}
      style={{
        maxWidth: "24rem",
        padding: "4rem 2rem",
        textAlign: "center",
        borderStyle: "dashed",
      }}
    >
      <Stack align="center" justify="center" gap={4}>
        <Box
          radius="full"
          style={{
            display: "flex",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsl(var(--muted))",
          }}
        >
          <Icon style={{ width: 24, height: 24, color: "hsl(var(--muted-foreground))" }} />
        </Box>
        <Stack gap={2} style={{ gap: "0.375rem" }}>
          <Heading as="h3" size="h6">{title}</Heading>
          <Text size="body-sm" color="muted" style={{ lineHeight: 1.625 }}>{description}</Text>
        </Stack>
        {action && (
          <Button variant={action.variant ?? "primary"} size="sm" leftIcon={<Plus style={{ width: 14, height: 14 }} />}>
            {action.label}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export const NoData: Story = {
  name: "No data",
  render: () => (
    <EmptyState
      icon={PackageSearch}
      title="No items yet"
      description="You haven&apos;t created any items. Get started by adding your first one."
      action={{ label: "New item" }}
    />
  ),
};

export const NoResults: Story = {
  name: "No search results",
  render: () => (
    <EmptyState
      icon={FolderOpen}
      title="No results found"
      description={"We couldn't find anything matching \"design tokens\". Try a different search term."}
      action={{ label: "Clear search", variant: "outline" }}
    />
  ),
};

export const NoAccess: Story = {
  name: "No access",
  render: () => (
    <EmptyState
      icon={ShieldOff}
      title="Access restricted"
      description="You don&apos;t have permission to view this page. Contact your admin to request access."
      action={{ label: "Request access", variant: "outline" }}
    />
  ),
};

export const Offline: Story = {
  name: "Offline / error",
  render: () => (
    <EmptyState
      icon={WifiOff}
      title="Unable to load"
      description="Something went wrong while fetching your data. Check your connection and try again."
      action={{ label: "Try again", variant: "outline" }}
    />
  ),
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <Grid cols={{ base: 1, md: 2 }} gap={6}>
      <EmptyState icon={PackageSearch} title="No items yet" description="Create your first item to get started." action={{ label: "New item" }} />
      <EmptyState icon={FolderOpen} title="No results found" description="Try adjusting your search or filters." action={{ label: "Clear filters", variant: "outline" }} />
      <EmptyState icon={ShieldOff} title="Access restricted" description="Contact your admin to request access." action={{ label: "Request access", variant: "outline" }} />
      <EmptyState icon={WifiOff} title="Something went wrong" description="Check your connection and try again." action={{ label: "Retry", variant: "ghost" }} />
    </Grid>
  ),
};
