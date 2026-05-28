import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { Card, CardContent } from "../card/Card";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: "overview", label: "Overview", content: "Overview content goes here." },
  { value: "analytics", label: "Analytics", content: "Analytics dashboards and charts." },
  { value: "settings", label: "Settings", content: "Configure your preferences." },
  { value: "disabled", label: "Disabled", content: "You should not see this.", disabled: true },
];

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        {items.map((i) => <TabsTrigger key={i.value} value={i.value} disabled={i.disabled}>{i.label}</TabsTrigger>)}
      </TabsList>
      {items.map((i) => <TabsContent key={i.value} value={i.value}><Card><CardContent className="pt-4">{i.content}</CardContent></Card></TabsContent>)}
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList variant="underline">
        {items.filter(i => !i.disabled).map((i) => <TabsTrigger key={i.value} value={i.value} variant="underline">{i.label}</TabsTrigger>)}
      </TabsList>
      {items.filter(i => !i.disabled).map((i) => <TabsContent key={i.value} value={i.value}><p className="pt-4 text-sm">{i.content}</p></TabsContent>)}
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList variant="pills">
        {items.filter(i => !i.disabled).map((i) => <TabsTrigger key={i.value} value={i.value} variant="pills">{i.label}</TabsTrigger>)}
      </TabsList>
      {items.filter(i => !i.disabled).map((i) => <TabsContent key={i.value} value={i.value}><p className="pt-4 text-sm">{i.content}</p></TabsContent>)}
    </Tabs>
  ),
};
