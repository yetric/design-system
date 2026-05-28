import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const faqs = [
  { q: "Is it accessible?", a: "Yes. It adheres to the WAI-ARIA design pattern." },
  { q: "Is it styled?", a: "Yes. It comes with default styles that match your theme." },
  { q: "Is it animated?", a: "Yes. It's animated by default, with CSS keyframes." },
];

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
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
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
