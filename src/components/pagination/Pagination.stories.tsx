import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "./Pagination";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/Pagination",
  parameters: { layout: "centered" },
  argTypes: {
    total:    { control: "number" },
    page:     { control: "number" },
    siblings: { control: "number" },
    size:     { control: "select", options: ["xs","sm","md","lg","xl"] },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>5</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">6</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const Sizes: Story = {
  name: "Size variants",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="space-y-1">
          <p className="text-xs text-muted-foreground">size: {s}</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" size={s} /></PaginationItem>
              <PaginationItem><PaginationLink href="#" size={s}>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" size={s} isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" size={s}>3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis size={s} /></PaginationItem>
              <PaginationItem><PaginationNext href="#" size={s} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ))}
    </div>
  ),
};
