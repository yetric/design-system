import type { Meta, StoryObj } from "@storybook/react";
import { toast as sonnerToast } from "sonner";
import { Button } from "../button/Button";
import { Toaster } from "./Toast";
import { toast } from "./toast";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  parameters: { layout: "centered" },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  name: "Default",
  render: () => <Button onClick={() => sonnerToast("This is a notification")}>Show toast</Button>,
};

export const Success: Story = {
  name: "Success",
  render: () => (
    <Button onClick={() => toast.success("Changes saved successfully")}>Success</Button>
  ),
};

export const ErrorVariant: Story = {
  name: "Error",
  render: () => (
    <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>
      Error
    </Button>
  ),
};

export const Warning: Story = {
  name: "Warning",
  render: () => (
    <Button variant="outline" onClick={() => toast.warning("Disk space is low")}>
      Warning
    </Button>
  ),
};

export const Info: Story = {
  name: "Info",
  render: () => (
    <Button variant="secondary" onClick={() => toast.info("New version available")}>
      Info
    </Button>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => sonnerToast("Default")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Success!")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Error!")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Warning!")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Info!")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.loading("Loading…")}>
        Loading
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <Button
      onClick={() =>
        toast.success("File uploaded", {
          description: "profile-photo.jpg has been uploaded to your storage.",
        })
      }
    >
      Upload file
    </Button>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  render: () => (
    <Button
      onClick={() =>
        sonnerToast("Message sent", {
          action: { label: "Undo", onClick: () => toast.info("Undone") },
        })
      }
    >
      Send message
    </Button>
  ),
};

export const WithPromise: Story = {
  name: "Promise",
  render: () => (
    <Button
      onClick={() =>
        toast.promise(new globalThis.Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: "Saving…",
          success: "Saved!",
          error: "Failed to save",
        })
      }
    >
      Save (with promise)
    </Button>
  ),
};

export const Programmatic: Story = {
  name: "Programmatic",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success("Order synced")}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error("Sync failed")}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => toast.info("New data available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Review pending changes")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.loading("Publishing release…")}>
        Loading
      </Button>
      <Button variant="ghost" onClick={() => toast.dismiss()}>
        Dismiss
      </Button>
    </div>
  ),
};

export const PositionTopRight: Story = {
  name: "Position: Top Right",
  render: () => (
    <>
      <Toaster position="top-right" />
      <Button onClick={() => sonnerToast("Top right!")}>Top right</Button>
    </>
  ),
};

export const CloseButton: Story = {
  name: "With Close Button",
  render: () => (
    <>
      <Toaster closeButton duration={999999} />
      <Button onClick={() => sonnerToast("Dismiss me with the X")}>Show persistent</Button>
    </>
  ),
};
