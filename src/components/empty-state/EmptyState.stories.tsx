import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderOpen, PackageSearch, Plus, ShieldOff, WifiOff } from "lucide-react";

import { Grid } from "../grid/Grid";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoData: Story = {
  name: "No data",
  render: () => (
    <EmptyState
      icon={PackageSearch}
      title="No items yet"
      description="You haven't created any items. Get started by adding your first one."
      action={{ label: "New item", icon: <Plus style={{ width: 14, height: 14 }} /> }}
    />
  ),
};

export const NoResults: Story = {
  name: "No search results",
  render: () => (
    <EmptyState
      icon={FolderOpen}
      title="No results found"
      description='We couldn&apos;t find anything matching "design tokens". Try a different search term.'
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
      description="You don't have permission to view this page. Contact your admin to request access."
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
      <EmptyState
        icon={PackageSearch}
        title="No items yet"
        description="Create your first item to get started."
        action={{ label: "New item", icon: <Plus style={{ width: 14, height: 14 }} /> }}
      />
      <EmptyState
        icon={FolderOpen}
        title="No results found"
        description="Try adjusting your search or filters."
        action={{ label: "Clear filters", variant: "outline" }}
      />
      <EmptyState
        icon={ShieldOff}
        title="Access restricted"
        description="Contact your admin to request access."
        action={{ label: "Request access", variant: "outline" }}
      />
      <EmptyState
        icon={WifiOff}
        title="Something went wrong"
        description="Check your connection and try again."
        action={{ label: "Retry", variant: "ghost" }}
      />
    </Grid>
  ),
};
