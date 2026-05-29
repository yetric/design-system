import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/alert-dialog/AlertDialog";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Label } from "../components/label/Label";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Confirmation Dialog",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteResource: Story = {
  name: "Delete resource",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Stack direction="row" align="center" gap={2}>
              <AlertTriangle style={{ width: 20, height: 20, color: "hsl(var(--destructive))" }} />
              <Heading as="span" size="h5">Delete project</Heading>
            </Stack>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Stack gap={3} as="div">
              <Text as="span" size="body-sm" color="muted">
                This will permanently delete <Text as="strong" size="body-sm" weight="bold">design-system</Text> and all of its data,
                including repositories, issues, and members. This action cannot be undone.
              </Text>
              <Box
                radius="md"
                p="sm"
                style={{
                  border: "1px solid hsl(var(--destructive) / 0.3)",
                  backgroundColor: "hsl(var(--destructive) / 0.05)",
                  color: "hsl(var(--destructive))",
                }}
              >
                <Text as="span" size="body-sm" color="destructive"><strong>Warning:</strong> 3 active collaborators will lose access immediately.</Text>
              </Box>
            </Stack>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const TypeToConfirm: Story = {
  name: "Type to confirm",
  render: function Render() {
    const [value, setValue] = useState("");
    const resourceName = "my-production-db";
    const confirmed = value === resourceName;

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>Delete database</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Heading as="span" size="h5">Delete database</Heading>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Stack gap={4} as="div">
                <Text as="span" size="body-sm" color="muted">
                  This action is <Text as="strong" size="body-sm" weight="bold">irreversible</Text>. All data in {" "}
                  <Badge variant="secondary" size="sm" style={{ fontFamily: "monospace" }}>{resourceName}</Badge>{" "}
                  will be permanently deleted.
                </Text>
                <Stack gap={2} style={{ gap: "0.375rem" }}>
                  <Label htmlFor="confirm-name">
                    Type <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{resourceName}</span> to confirm:
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
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setValue("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!confirmed}>Delete database</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const LoadingState: Story = {
  name: "Submitting (loading)",
  render: function Render() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" leftIcon={<Trash2 style={{ width: 14, height: 14 }} />}>Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Heading as="span" size="h5">Delete your account?</Heading>
            </AlertDialogTitle>
            <AlertDialogDescription>
              All your data will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={loading}
            >
              {loading ? "Deleting…" : "Delete account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
