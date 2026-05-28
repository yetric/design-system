import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "contained", "separated", "filled"],
    },
    chevronPosition: {
      control: "select",
      options: ["left", "right"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const faqs = [
  { q: "Is it accessible?", a: "Yes. It adheres to the WAI-ARIA design pattern." },
  { q: "Is it styled?", a: "Yes. It comes with default styles that match your theme." },
  { q: "Is it animated?", a: "Yes. It's animated by default, with CSS keyframes." },
];

export const Single: Story = {
  render: (args) => (
    <Accordion type="single" collapsible className="w-[400px]" variant={args.variant} radius={args.radius} chevronPosition={args.chevronPosition}>
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: (args) => (
    <Accordion type="multiple" className="w-[400px]" variant={args.variant} radius={args.radius} chevronPosition={args.chevronPosition}>
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[400px]">
      {(["default", "contained", "separated", "filled"] as const).map((variant) => (
        <div key={variant}>
          <p className="text-xs text-muted-foreground mb-2 font-mono">variant="{variant}"</p>
          <Accordion type="single" collapsible variant={variant} radius="md">
            {faqs.slice(0, 2).map((f, i) => (
              <AccordionItem key={i} value={`${variant}-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

export const ChevronLeft: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]" chevronPosition="left">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const NoChevron: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger hideChevron>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

