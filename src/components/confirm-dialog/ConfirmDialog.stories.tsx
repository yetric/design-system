import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Label } from "../label/Label";
import { Stack } from "../stack/Stack";
import { Heading, Text } from "../text/Text";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    title: "Confirm action",
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="destructive">Delete item</Button>}
      title="Delete item"
      description="Are you sure you want to delete this item? This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  ),
};

export const Destructive: Story = {
  name: "Destructive with icon",
  render: () => (
    <ConfirmDialog
      trigger={
        <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>
          Delete project
        </Button>
      }
      title="Delete project"
      description={
        <Stack gap={3} as="div">
          <Text as="span" size="body-sm" color="muted">
            This will permanently delete{" "}
            <Text as="strong" size="body-sm" weight="bold">
              design-system
            </Text>{" "}
            and all of its data. This action cannot be undone.
          </Text>
        </Stack>
      }
      confirmLabel="Delete project"
    />
  ),
};

export const WithCustomTitle: Story = {
  name: "Custom title with icon",
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="outline">Archive record</Button>}
      title={
        <Stack direction="row" align="center" gap={2}>
          <AlertTriangle style={{ width: 20, height: 20, color: "hsl(var(--warning))" }} />
          <Heading as="span" size="h5">
            Archive record
          </Heading>
        </Stack>
      }
      description="This record will be archived and hidden from active views. You can restore it later."
      confirmLabel="Archive"
    />
  ),
};

export const TypeToConfirm: Story = {
  name: "Type to confirm",
  render: function Render() {
    const [value, setValue] = useState("");
    const resourceName = "my-production-db";
    const confirmed = value === resourceName;

    return (
      <ConfirmDialog
        trigger={
          <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>
            Delete database
          </Button>
        }
        title="Delete database"
        description={
          <Stack gap={4} as="div">
            <Text as="span" size="body-sm" color="muted">
              All data in{" "}
              <Text as="strong" size="body-sm" weight="bold">
                {resourceName}
              </Text>{" "}
              will be permanently deleted.
            </Text>
            <Stack gap={2} style={{ gap: "0.375rem" }}>
              <Label htmlFor="confirm-name">
                Type{" "}
                <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{resourceName}</span> to
                confirm:
              </Label>
              <Input
                id="confirm-name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={resourceName}
                error={value.length > 0 && !confirmed}
              />
            </Stack>
          </Stack>
        }
        confirmLabel="Delete database"
        confirmDisabled={!confirmed}
        onCancel={() => setValue("")}
      />
    );
  },
};

export const Controlled: Story = {
  name: "Controlled (loading state)",
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = (e: React.MouseEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>
            Delete account
          </Button>
        }
        title="Delete your account?"
        description="All your data will be permanently removed. This cannot be undone."
        confirmLabel={loading ? "Deleting…" : "Delete account"}
        confirmDisabled={loading}
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
      />
    );
  },
};
