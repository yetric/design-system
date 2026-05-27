import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "../label/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "./Select";

const meta = {
  title: "Components/Select",
  component: SelectTrigger
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  )
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-48">
      <Label htmlFor="country">Country</Label>
      <Select>
        <SelectTrigger id="country">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="se">Sweden</SelectItem>
          <SelectItem value="no">Norway</SelectItem>
          <SelectItem value="dk">Denmark</SelectItem>
          <SelectItem value="fi">Finland</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="cet">CET — Central European</SelectItem>
          <SelectItem value="eet">EET — Eastern European</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Americas</SelectLabel>
          <SelectItem value="est">EST — Eastern</SelectItem>
          <SelectItem value="pst">PST — Pacific</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-56">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Select key={s}>
          <SelectTrigger size={s}>
            <SelectValue placeholder={s} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Not available" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">X</SelectItem>
      </SelectContent>
    </Select>
  )
};

export const WithDisabledItem: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>Enterprise (contact us)</SelectItem>
      </SelectContent>
    </Select>
  )
};
