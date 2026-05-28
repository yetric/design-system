import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rocket, ShieldCheck } from "lucide-react";

import { Alert } from "./Alert";

const meta = {
  component: Alert,
  args: {
    title: "Heads up",
    children: "This is an informational alert with some helpful context.",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="default" title="Default">Something you should know.</Alert>
      <Alert variant="info" title="Info">Your session will expire in 10 minutes.</Alert>
      <Alert variant="success" title="Success">Your changes have been saved.</Alert>
      <Alert variant="warning" title="Warning">This action cannot be undone.</Alert>
      <Alert variant="destructive" title="Error">Failed to save — please try again.</Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="success" title="Email verified successfully." />
      <Alert variant="warning" title="Storage is almost full." />
    </div>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info">Your account is pending review. We'll notify you within 24 hours.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info" title="New features available" onClose={() => {}}>
        Check out the latest updates in the changelog.
      </Alert>
      <Alert variant="warning" title="Subscription expiring" onClose={() => {}}>
        Your plan renews on June 15. Update your billing info to avoid interruption.
      </Alert>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info" title="Mission control" icon={<Rocket className="h-4 w-4" />}>
        All systems nominal. Awaiting launch window.
      </Alert>
      <Alert variant="success" title="Verified" icon={<ShieldCheck className="h-4 w-4" />}>
        Your identity has been confirmed.
      </Alert>
      <Alert variant="default" title="No icon" icon={false}>
        This alert has no icon at all.
      </Alert>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info" size="sm" title="Small">Compact alert for tight layouts.</Alert>
      <Alert variant="info" size="md" title="Medium">Default alert size.</Alert>
      <Alert variant="info" size="lg" title="Large">More spacious alert for prominent messages.</Alert>
    </div>
  ),
};

export const RadiusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="success" radius="none" title="No radius">Sharp corners.</Alert>
      <Alert variant="success" radius="sm" title="Small radius">Subtle rounding.</Alert>
      <Alert variant="success" radius="md" title="Medium radius (default)">Standard rounding.</Alert>
      <Alert variant="success" radius="lg" title="Large radius">More rounded.</Alert>
      <Alert variant="success" radius="xl" title="XL radius">Very rounded.</Alert>
    </div>
  ),
};
