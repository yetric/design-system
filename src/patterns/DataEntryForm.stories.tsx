import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe, Mail, User } from "lucide-react";

import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../components/card/Card";
import { Checkbox } from "../components/checkbox/Checkbox";
import { Fieldset } from "../components/fieldset/Fieldset";
import { Input } from "../components/input/Input";
import { Label } from "../components/label/Label";
import { RadioGroup, RadioGroupItem } from "../components/radio-group/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select/Select";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Switch } from "../components/switch/Switch";
import { Heading, Text } from "../components/text/Text";
import { Textarea } from "../components/textarea/Textarea";

const meta = {
  title: "Patterns/Data Entry Form",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const fieldGapStyle = { gap: "0.375rem" };
const iconStyle = { width: 16, height: 16 };

function RequiredMark() {
  return <span style={{ color: "hsl(var(--destructive))" }}>*</span>;
}

export const CreateProject: Story = {
  name: "Create project",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 540 }}>
      <CardHeader>
        <Heading as="h2" size="h5">New project</Heading>
        <CardDescription>Set up a new project workspace for your team.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={6}>
          <Fieldset legend="Basic information">
            <Stack gap={4}>
              <Stack gap={2} style={fieldGapStyle}>
                <Label htmlFor="proj-name">Project name <RequiredMark /></Label>
                <Input id="proj-name" placeholder="My awesome project" leftIcon={<User style={iconStyle} />} />
              </Stack>
              <Stack gap={2} style={fieldGapStyle}>
                <Label htmlFor="proj-url">Slug / URL</Label>
                <Input id="proj-url" placeholder="my-awesome-project" leftIcon={<Globe style={iconStyle} />} />
                <Text as="p" size="caption" color="muted">app.example.com/<strong>my-awesome-project</strong></Text>
              </Stack>
              <Stack gap={2} style={fieldGapStyle}>
                <Label htmlFor="proj-desc">Description</Label>
                <Textarea id="proj-desc" placeholder="What is this project about?" rows={3} />
              </Stack>
            </Stack>
          </Fieldset>

          <Separator />

          <Fieldset legend="Team & visibility">
            <Stack gap={4}>
              <Stack gap={2} style={fieldGapStyle}>
                <Label htmlFor="proj-team">Team</Label>
                <Select>
                  <SelectTrigger id="proj-team">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </Stack>

              <Stack gap={2}>
                <Label>Visibility</Label>
                <RadioGroup defaultValue="private">
                  <Stack gap={2}>
                    <RadioGroupItem value="private" label="Private — only team members can access" />
                    <RadioGroupItem value="internal" label="Internal — all employees can view" />
                    <RadioGroupItem value="public" label="Public — anyone with the link" />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Stack>
          </Fieldset>

          <Separator />

          <Fieldset legend="Notifications">
            <Stack gap={3}>
              <Switch label="Notify me on new comments" defaultChecked />
              <Switch label="Notify me on status changes" defaultChecked />
              <Switch label="Weekly digest email" />
              <Stack gap={2} style={{ ...fieldGapStyle, paddingTop: "0.25rem" }}>
                <Label htmlFor="notify-email">Send notifications to</Label>
                <Input id="notify-email" type="email" placeholder="you@example.com" leftIcon={<Mail style={iconStyle} />} />
              </Stack>
            </Stack>
          </Fieldset>

          <Separator />

          <Stack direction="row" align="start" gap={2}>
            <Box shrink={false} style={{ marginTop: "0.125rem" }}>
              <Checkbox id="proj-terms" />
            </Box>
            <Label htmlFor="proj-terms">
              <Text as="span" size="body-sm" style={{ fontWeight: 400, lineHeight: 1.625 }}>
                I agree that this project complies with our {" "}
                <a href="#" style={{ textDecoration: "underline" }}>acceptable use policy</a>.
              </Text>
            </Label>
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter justify="between">
        <Button variant="ghost">Cancel</Button>
        <Stack direction="row" gap={2}>
          <Button variant="outline">Save as draft</Button>
          <Button>Create project</Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

export const WithValidationErrors: Story = {
  name: "With validation errors",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 540 }}>
      <CardHeader>
        <Heading as="h2" size="h5">New project</Heading>
        <CardDescription>Fix the errors below to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={4}>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="ve-name">Project name <RequiredMark /></Label>
            <Input id="ve-name" error defaultValue="" placeholder="Required" />
            <Text as="p" size="caption" color="destructive">Project name is required.</Text>
          </Stack>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="ve-url">Slug / URL</Label>
            <Input id="ve-url" error defaultValue="My Project!!" leftIcon={<Globe style={iconStyle} />} />
            <Text as="p" size="caption" color="destructive">Only lowercase letters, numbers, and hyphens are allowed.</Text>
          </Stack>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="ve-desc">Description</Label>
            <Textarea id="ve-desc" error placeholder="Too short" defaultValue="ok" rows={3} />
            <Text as="p" size="caption" color="destructive">Description must be at least 20 characters.</Text>
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter justify="end">
        <Button>Create project</Button>
      </CardFooter>
    </Card>
  ),
};
